import Web3 from "web3";

/**
 * RPC Manager: Handles multiple RPC URLs with automatic fallback
 * Uses primary RPC by default, switches to secondary on failure
 */

// RPC URLs from environment variables or fallback to defaults
const RPC_PRIMARY = import.meta.env.VITE_RPC_URL_PRIMARY || "https://blockchain.ramestta.com";
const RPC_SECONDARY = import.meta.env.VITE_RPC_URL_SECONDARY || "https://blockchain2.ramestta.com";

// Store Web3 instances for each RPC
let web3Primary = new Web3(RPC_PRIMARY);
let web3Secondary = new Web3(RPC_SECONDARY);
let currentWeb3 = web3Primary;
let currentRpcUrl = RPC_PRIMARY;
let isUsingSecondary = false;

/**
 * Test if an RPC URL is responsive
 * @param {string} rpcUrl - RPC URL to test
 * @returns {Promise<boolean>} - true if RPC is responsive
 */
const testRpcConnection = async (rpcUrl) => {
  try {
    const testWeb3 = new Web3(rpcUrl);
    const blockNumber = await testWeb3.eth.getBlockNumber();
    return blockNumber !== null && blockNumber !== undefined;
  } catch (error) {
    console.warn(`RPC connection failed for ${rpcUrl}:`, error.message);
    return false;
  }
};

/**
 * Get the current active Web3 instance
 * @returns {Web3} - Active Web3 instance
 */
export const getWeb3Instance = () => {
  return currentWeb3;
};

/**
 * Get the current active RPC URL
 * @returns {string} - Current RPC URL
 */
export const getCurrentRpcUrl = () => {
  return currentRpcUrl;
};

/**
 * Check if currently using secondary RPC
 * @returns {boolean}
 */
export const isUsingSecondaryRpc = () => {
  return isUsingSecondary;
};

/**
 * Switch to secondary RPC
 */
export const switchToSecondaryRpc = () => {
  if (!isUsingSecondary) {
    console.warn("⚠️ Switching to secondary RPC:", RPC_SECONDARY);
    currentWeb3 = web3Secondary;
    currentRpcUrl = RPC_SECONDARY;
    isUsingSecondary = true;
  }
};

/**
 * Switch back to primary RPC
 */
export const switchToPrimaryRpc = () => {
  if (isUsingSecondary) {
    console.warn("⚠️ Switching back to primary RPC:", RPC_PRIMARY);
    currentWeb3 = web3Primary;
    currentRpcUrl = RPC_PRIMARY;
    isUsingSecondary = false;
  }
};

/**
 * Execute a Web3 call with automatic fallback
 * @param {Function} callFn - Function that uses Web3 (receives web3 instance)
 * @param {string} callName - Name of the call for logging
 * @returns {Promise} - Result of the call
 */
export const executeWithFallback = async (callFn, callName = "RPC Call") => {
  try {
    // Try with current RPC
    const result = await callFn(currentWeb3);
    
    // If we were on secondary, try to switch back to primary
    if (isUsingSecondary) {
      const primaryWorks = await testRpcConnection(RPC_PRIMARY);
      if (primaryWorks) {
        switchToPrimaryRpc();
        console.log("✅ Primary RPC is back online, switched back");
      }
    }
    
    return result;
  } catch (error) {
    console.error(`❌ ${callName} failed on ${currentRpcUrl}:`, error.message);
    
    // If we're on primary, try secondary
    if (!isUsingSecondary) {
      console.log(`🔄 Attempting fallback to secondary RPC for ${callName}...`);
      switchToSecondaryRpc();
      
      try {
        return await callFn(currentWeb3);
      } catch (fallbackError) {
        console.error(`❌ ${callName} also failed on secondary RPC:`, fallbackError.message);
        throw new Error(
          `${callName} failed on both RPC URLs. Primary: ${error.message}, Secondary: ${fallbackError.message}`
        );
      }
    }
    
    // Already on secondary, throw error
    throw error;
  }
};

/**
 * Execute multiple RPC calls in parallel with fallback support
 * @param {Array<{fn: Function, name: string}>} calls - Array of calls to execute
 * @returns {Promise<Array>} - Results of all calls
 */
export const executeParallelWithFallback = async (calls) => {
  try {
    const promises = calls.map(({ fn, name }) =>
      executeWithFallback(fn, name)
    );
    return await Promise.all(promises);
  } catch (error) {
    console.error("Parallel execution with fallback failed:", error);
    throw error;
  }
};

/**
 * Initialize and test both RPC connections on app startup
 * @returns {Promise<Object>} - Status of both RPCs
 */
export const initializeRpcManager = async () => {
  const primaryStatus = await testRpcConnection(RPC_PRIMARY);
  const secondaryStatus = await testRpcConnection(RPC_SECONDARY);
  
  const status = {
    primary: { url: RPC_PRIMARY, online: primaryStatus },
    secondary: { url: RPC_SECONDARY, online: secondaryStatus },
  };
  
  if (!primaryStatus && secondaryStatus) {
    console.warn("🔄 Primary RPC offline, using secondary");
    switchToSecondaryRpc();
  } else if (!primaryStatus && !secondaryStatus) {
    console.error("🔴 Both RPCs are offline!");
  } else {
    console.log("✅ Primary RPC is online");
  }
  
  return status;
};

export default {
  getWeb3Instance,
  getCurrentRpcUrl,
  isUsingSecondaryRpc,
  switchToSecondaryRpc,
  switchToPrimaryRpc,
  executeWithFallback,
  executeParallelWithFallback,
  initializeRpcManager,
};
