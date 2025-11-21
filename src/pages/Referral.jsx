import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import BlockchainAnimation from "../components/BlockchainAnimation";
import StatCard from "../components/StatCard";
import NotificationModal from "../components/NotificationModal";
import SignupModal from "../components/SignupModal";
import TransactionStatusModal from "../components/TransactionStatusModal";
import { useNotification } from "../hooks/useNotification";
import { useStore } from "../Store/UserStore";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useTransaction } from "../config/register";
import Swal from "sweetalert2";
import { Spinner } from "../utils/helpingAnimation";

const Referral = () => {
  const [countdown, setCountdown] = useState(10);
  const { notification, closeNotification, showError, showWarning } = useNotification();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [sponserAdd, setSponserAdd] = useState("");

  const [trxData, setTrxData] = useState();

  const [loading, setLoading] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [showAddId, setShowAddId] = useState();

  // Transaction Status Modal state
  const [txStatusModal, setTxStatusModal] = useState({
    isOpen: false,
    status: null, // 'success' | 'cancelled' | 'error'
    transactionHash: null,
  });

  const referralId = searchParams.get("ref") || "Direct";

  const RegisterUser = useStore((state) => state.RegisterUser);

  const { address, isConnected } = useAppKitAccount();

  const { open, disconnect } = useAppKit();

  const { handleSendTx, hash, error: txHashError, status } = useTransaction(trxData !== null && trxData);

  useEffect(() => {
    if (trxData) {
      try {
        handleSendTx(trxData);
      } catch (error) {
        setLoading(false);
        setIsTxLoading(false);
        setIsModalOpen(false);
        showError('Error', 'Something went wrong during registration. Please try again.');
      }
    }
  }, [trxData]);

  // Handle transaction errors (cancelled or failed)
  useEffect(() => {
    if (txHashError) {
      setIsTxLoading(false);
      setIsModalOpen(false);
      const errorMessage = txHashError?.message || 'Transaction failed';
      
      if (errorMessage.includes('cancelled') || errorMessage.includes('rejected')) {
        setTxStatusModal({
          isOpen: true,
          status: 'cancelled',
          transactionHash: null,
        });
      } else {
        setTxStatusModal({
          isOpen: true,
          status: 'error',
          transactionHash: null,
        });
      }
    }
  }, [txHashError]);

  useEffect(() => {
    if (hash) {
      setIsTxLoading(false);
      setIsModalOpen(false);
      const userData = {
        address: address,
        data: {},
      };

      localStorage.setItem("UserData", JSON.stringify(userData));

      setLoading(false);
      setIsRegistered(true);

      // Show transaction status modal with hash
      setTxStatusModal({
        isOpen: true,
        status: 'success',
        transactionHash: hash,
      });

      // Start countdown timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Navigate after 10 seconds
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 10000);

      // Clean up both timers on unmount
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [hash]);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      if (!isConnected) {
        await open();
        setLoading(false);
        return;
      }

      if (address && isConnected) {
        // Open modal instead of direct registration
        setIsModalOpen(true);
        setLoading(false);
      } else {
        setLoading(false);
        showWarning('Wallet Not Connected', 'Please connect your wallet first to proceed with registration.');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleModalConfirm = async () => {
    try {
      setIsTxLoading(true);
      const res = await RegisterUser(address, sponserAdd);
      console.log(res);
      setTrxData(res);
    } catch (error) {
      console.log(error);
      setIsTxLoading(false);
      showError('Registration Error', error?.message || 'Something went wrong while processing your registration. Please try again.');
      Swal.fire({
        title: 'Registration Failed',
        text: error?.message || 'Something went wrong while processing your registration.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Try Again',
      });
    }
  };

  // ====================================================
  //Check User ALready Registerd or not
  // ===================================================

  const [isAlreadyRegUser, setIsAlreadyRegUser] = useState();

  const isUserExist = useStore((state) => state.isUserExist);

  useEffect(() => {
    const fetchUserExist = async () => {
      const res = await isUserExist(address);

      if (res) {
        setIsAlreadyRegUser(res);
      }
    };

    if (isConnected && address) {
      fetchUserExist();
    }
  }, [address]);

  // ====================================================
  //Get the Referral to to Address of user
  // ===================================================

  const getUserAddress = useStore((state) => state.getUserAddress);

  useEffect(() => {
    const fetchSponserAddress = async () => {
      try {
        const number = referralId.replace("ROPDY", "");
        const res = await getUserAddress(number);

        if (res?.toLowerCase().startsWith("0x000000000000000000000000000")) {
          const result = await Swal.fire({
            icon: "error",
            title: "Invalid Referral ID",
            text: "The referral address does not exist or is not registered.",
            confirmButtonColor: "#d33",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showCloseButton: false,
          });

          if (result.isConfirmed) {
            navigate("/"); // Redirect to home on button click
          }

          return;
        }

        setSponserAdd(res);
      } catch (error) {
        console.error("Error fetching sponsor address:", error);
        const result = await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch referral information.",
          confirmButtonColor: "#d33",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showCloseButton: false,
        });

        if (result.isConfirmed) {
          navigate("/");
        }
      }
    };

    fetchSponserAddress();
  }, []);

  // ====================================================
  //Get the Required Rama For Registration
  // ===================================================
  const getReqRamaForReg = useStore((state) => state.getReqRamaForReg);

  const [requiredData, setRequiredData] = useState();
  const [estimatedGas, setEstimatedGas] = useState('0');
  const [ramaPrice, setRamaPrice] = useState(0); // RAMA to USD price

  // Function to estimate gas from network
  const estimateGasFee = async () => {
    try {
      const { getWeb3Instance } = await import("../utils/rpcManager");
      const web3 = getWeb3Instance();
      
      // Get current gas price
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceInRama = web3.utils.fromWei(gasPrice, 'ether');
      
      // Estimate gas limit for registration (typically 100,000 - 200,000 gas)
      const estimatedGasLimit = 150000;
      
      // Calculate total fee: gasPrice * gasLimit
      const totalFee = (parseFloat(gasPriceInRama) * estimatedGasLimit).toFixed(6);
      setEstimatedGas(totalFee);
    } catch (error) {
      console.log('Gas estimation failed, using default:', error);
      // Fallback: use 0.05 RAMA as default
      setEstimatedGas('0.05');
    }
  };

  // Function to fetch RAMA price in USD
  const fetchRamaPrice = async () => {
    try {
      const response = await fetch('https://latest-backendapi.ramascan.com/api/v2/stats');
      const data = await response.json();
      // Assuming the API returns price data
      if (data && data.coin_price) {
        setRamaPrice(parseFloat(data.coin_price));
      } else {
        // Fallback: calculate from starter package price ($20 = 200 RAMA as per static data)
        setRamaPrice(0.1); // $20 / 200 = $0.1 per RAMA
      }
    } catch (error) {
      console.log('Failed to fetch RAMA price, using fallback:', error);
      // Fallback: calculate from starter package price ($20 = 200 RAMA)
      setRamaPrice(0.1); // $20 / 200 = $0.1 per RAMA
    }
  };

  useEffect(() => {
    const fetchRequiredRama = async () => {
      const res = await getReqRamaForReg(address);
      setRequiredData(res);
      
      // Estimate gas fee when data is fetched
      if (res) {
        await estimateGasFee();
      }
    };
    if (address) {
      fetchRequiredRama();
      fetchRamaPrice();
    }
  }, [isConnected]);

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={closeNotification}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        autoClose={notification.autoClose}
        autoCloseDuration={notification.autoCloseDuration}
        actions={notification.actions}
      />
      <TransactionStatusModal
        isOpen={txStatusModal.isOpen}
        status={txStatusModal.status}
        transactionHash={txStatusModal.transactionHash}
        onClose={() => setTxStatusModal({ isOpen: false, status: null, transactionHash: null })}
        onDashboard={() => {
          setTxStatusModal({ isOpen: false, status: null, transactionHash: null });
          navigate("/dashboard");
        }}
        onViewScan={() => {
          if (txStatusModal.transactionHash) {
            window.open(`https://ramascan.com/tx/${txStatusModal.transactionHash}`, '_blank');
          }
        }}
      />
      <div className="relative p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-wrap justify-between items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark">
              {isRegistered
                ? "✅ Registration Successful!"
                : "👋 Welcome to ROPDY"}
            </h1>

            {address && (
              <button
                className="bg-gray-800 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md hover:bg-gray-700 transition duration-200 text-xs sm:text-base tracking-wide"
                title={address}
              >
                Connected: {address.slice(0, 6) + "..." + address.slice(-4)}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
              label="Required RAMA"
              value={requiredData?.packagePriceEth || "Loading..."}
            />
            <StatCard
              label="USD Equivalent (~$20)"
              value={requiredData?.packagePriceEth && ramaPrice ? `$${(parseFloat(requiredData.packagePriceEth) * ramaPrice).toFixed(2)}` : "Loading..."}
            />
            {address && (
              <StatCard
                label="Available RAMA"
                value={requiredData?.currentBalanceRama || "Loading..."}
              />
            )}
            <StatCard label="Referral ID" value={referralId} />
            <StatCard
              label="RAMA Price"
              value={ramaPrice ? `$${ramaPrice.toFixed(4)}` : "Loading..."}
            />
            {requiredData?.packagePriceEth && requiredData?.currentBalanceRama && (
              <StatCard
                label="Balance Status"
                value={parseFloat(requiredData.currentBalanceRama) >= parseFloat(requiredData.packagePriceEth) ? "✅ Sufficient" : "❌ Insufficient"}
              />
            )}
          </div>

          {isRegistered ? (
            <div className="flex flex-col bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                ✅ Registration successful! Redirecting to dashboard in{" "}
                <span className="font-semibold text-admin-new-green">
                  {countdown}
                </span>{" "}
                seconds...
              </p>

              <a
                href={`https://ramascan.com/tx/${hash}`}
                target="_blank"
                className="text-lg text-blue-700  mb-4"
              >
                View on RamaScan
              </a>
              <Link
                to="/dashboard"
                className="text-admin-new-green hover:text-admin-new-green/80 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : isAlreadyRegUser ? (
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-8 border border-yellow-400/30">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="text-6xl">⚠️</div>
                </div>
                
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                  Account Already Registered
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  This wallet address is already registered with ROPDY.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-600 my-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Wallet Address:</p>
                  <p className="font-mono text-gray-900 dark:text-gray-100 break-all">{address}</p>
                </div>

                <div className="space-y-3 pt-4">
                  <Link
                    to="/dashboard"
                    className="inline-block w-full bg-admin-new-green hover:bg-admin-new-green/80 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors border border-admin-new-green/30"
                  >
                    Go to Dashboard
                  </Link>
                  
                  <button
                    onClick={async () => {
                      try {
                        // Disconnect wallet using AppKit
                        await disconnect();
                        // Clear local storage
                        localStorage.removeItem("UserData");
                        localStorage.clear();
                        // Navigate to home after a short delay
                        setTimeout(() => {
                          window.location.href = "/";
                        }, 500);
                      } catch (error) {
                        console.error("Error disconnecting wallet:", error);
                        // Even if disconnect fails, clear storage and navigate
                        localStorage.clear();
                        window.location.href = "/";
                      }
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors border border-red-600/30"
                  >
                    Disconnect Wallet
                  </button>

                  <Link
                    to="/"
                    className="inline-block w-full text-center text-gray-700 dark:text-gray-300 hover:text-admin-new-green px-6 py-3 rounded-lg font-semibold transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          ) : isConnected && !isAlreadyRegUser ? (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-br from-cyan-900/30 via-slate-900/20 to-cyan-900/20 backdrop-blur-sm rounded-lg p-8 border border-cyan-400/30 shadow-xl">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="text-7xl animate-bounce">🚀</div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                    Welcome to ROPDY
                  </h2>
                  
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    You're not yet part of the ROPDY Ecosystem. Let's begin your journey to passive income with our automated circle system!
                  </p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/30 space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-300">What You'll Get:</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⭐</span>
                        <p className="text-gray-300">Automatic circle completion with 6 payments</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        <p className="text-gray-300">Direct payouts in RAMA Coin</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎁</span>
                        <p className="text-gray-300">Referral bonuses for your network</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔒</span>
                        <p className="text-gray-300">100% secure smart contract</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
                <h2 className="text-2xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-6 text-center">
                  Create Your Account
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sponsor Wallet Address
                    </label>
                    <input
                      type="text"
                      name="walletAddress"
                      value={sponserAdd || ""}
                      onChange={(e) => setSponserAdd(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
                      readOnly
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-green-600 text-white px-6 py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 border border-purple-400/30 hover:border-pink-400/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Spinner loading={loading} />
                        </>
                      ) : isConnected ? (
                        <>
                          <span>✨ Register Now</span>
                        </>
                      ) : (
                        "Connect Wallet"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </button>

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already registered? Your account is waiting for you!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-admin-new-green/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark">
                  Register Account
                </h2>
                <Link
                  to="/claim-ownership-newUser"
                  className="text-admin-new-green hover:text-admin-new-green/80 transition-colors"
                >
                  {/* Claim OwnerShip */}
                </Link>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sponser Wallet Address
                  </label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={sponserAdd || ""} // extra safe fallback
                    onChange={(e) => setSponserAdd(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                    readOnly
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border border-purple-400/30 hover:border-pink-400/50 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? (
                      <Spinner loading={loading} />
                    ) : isConnected ? (
                      "Register"
                    ) : (
                      "Connect Wallet"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Signup Modal */}
        <SignupModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          sponsorAddress={sponserAdd}
          sponsorId={showAddId?.data}
          referralId={referralId}
          onConfirm={handleModalConfirm}
          isLoading={isTxLoading}
          requiredRama={requiredData?.packagePriceEth}
          estimatedGas={estimatedGas}
          currentBalance={requiredData?.currentBalanceRama}
        />
      </div>
    </div>
  );
};

export default Referral;
