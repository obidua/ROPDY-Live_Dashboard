import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';
import RamaLoader from '../components/RamaLoader';
import NotificationModal from '../components/NotificationModal';
import PurchaseModal from '../components/PurchaseModal';
import TransactionStatusModal from '../components/TransactionStatusModal';
import { useNotification } from '../hooks/useNotification';
import { useStore } from '../Store/UserStore';
import { useAppKitAccount } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../config/register';
import Swal from 'sweetalert2';

const PackageCard = ({ name, usdPrice, required, totalRequired, estimatedGas, index, onPurchase }) => (
  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-admin-gold-600/30 hover:border-admin-gold-400 transition-all duration-300">
    <h3 className="text-xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-4">{name}</h3>
    <div className="space-y-3 mb-6">
      <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">Price:</span> ${usdPrice}</p>
      {/* <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">RAMA Value:</span> {ramaValue} RAMA</p> */}
      <div className="bg-cyan-500/10 rounded p-2 border border-cyan-500/30">
        <p className="text-sm text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark font-semibold">Package:</span> {parseFloat(required).toFixed(5)} RAMA</p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
          <span className="font-semibold">Est. Gas:</span> {estimatedGas ? parseFloat(estimatedGas).toFixed(6) : "0"} RAMA
        </p>
      </div>
      <div className="bg-green-500/20 rounded p-2 border border-green-500/30">
        <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark font-semibold">Total Required:</span> <span className="text-green-600 dark:text-green-400 font-bold">{totalRequired} RAMA</span></p>
      </div>
      {/* <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">Available:</span> {available} RAMA</p> */}
    </div>
    <button onClick={() => onPurchase(index)} className="w-full bg-green-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-admin-new-green/80 transition-colors border border-admin-new-green/30">
      Purchase Now
    </button>
  </div>
);




const Purchase = () => {

  const [walletBalance, setWalletBalance] = useState(0);
  const { notification, closeNotification, showError } = useNotification();

  const { address, isConnected } = useAppKitAccount();
  const [trxData, setTrxData] = useState();
  const navigate = useNavigate();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(-1);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [txError, setTxError] = useState(null);

  // Transaction Status Modal state
  const [txStatusModal, setTxStatusModal] = useState({
    isOpen: false,
    status: null, // 'success' | 'cancelled' | 'error'
    transactionHash: null,
  });

  const { handleSendTx, hash, error: txHashError, status } = useTransaction(trxData !== null && trxData);

  useEffect(() => {
    if (trxData) {
      try {
        handleSendTx(trxData);
      } catch (error) {
        const errorMessage = error?.message || 'Something went wrong during transaction';
        setTxError(errorMessage);
        setIsTxLoading(false);
        showError('Transaction Error', errorMessage);
      }
    }
  }, [trxData]);


  useEffect(() => {
    if (hash) {
      setIsTxLoading(false);
      setIsModalOpen(false);
      setTxStatusModal({
        isOpen: true,
        status: 'success',
        transactionHash: hash,
      });
      // Refetch history after successful transaction (delay to allow blockchain to update and finalize)
      setTimeout(() => {
        refetchHistory();
      }, 3000);
    }
  }, [hash]);

  useEffect(() => {
    if (txHashError) {
      setIsTxLoading(false);
      const errorMessage = txHashError?.message || 'Transaction was cancelled';
      
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



  const userAddress = JSON.parse(localStorage.getItem("UserData") || '{}')?.address;


  const [packages, setPackages] = useState([]);
  const [activePkg, setActivePkg] = useState();
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);


  // const packages = [
  //   {
  //     name: "Starter",
  //     usdPrice: 20,
  //     ramaValue: 200,
  //     required: 200,
  //     available: 500
  //   },
  //   {
  //     name: "Silver",
  //     usdPrice: 40,
  //     ramaValue: 400,
  //     required: 400,
  //     available: 500
  //   },
  //   {
  //     name: "Gold",
  //     usdPrice: 80,
  //     ramaValue: 800,
  //     required: 800,
  //     available: 500
  //   },
  //   {
  //     name: "Diamond",
  //     usdPrice: 160,
  //     ramaValue: 1600,
  //     required: 1600,
  //     available: 500
  //   },
  //   {
  //     name: "Platinum",
  //     usdPrice: 320,
  //     ramaValue: 3200,
  //     required: 3200,
  //     available: 500
  //   }
  // ];




  const purchaseInfo = useStore((state) => state.purchaseInfo);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      setLoading(true);
      const startTime = Date.now();
      try {
        const response = await purchaseInfo(userAddress);

        console.log("Purchase Data:", response);

        setPackages(response.packages || []);
        setWalletBalance(response.UserBalance)
        setActivePkg(response.userPackage)

      } catch (error) {
        console.log(error)
        console.error("Error fetching purchase data:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(800 - elapsedTime, 0);
        setTimeout(() => setLoading(false), remainingTime);
      }
    }

    fetchPurchaseData();
  }, []);



  const PurchasePackage = useStore((state) => state.PurchasePackage)

  const PruchaseNewPkg = async (pkgIndex) => {
    try {
      if (isConnected && address && (address == userAddress)) {
        // Open modal with selected package
        setSelectedPackageForModal({
          ...packages[pkgIndex],
          walletBalance: walletBalance,
        });
        setSelectedPackageIndex(pkgIndex);
        setIsModalOpen(true);
      } else {
        Swal.fire({
          title: 'Wallet not connected',
          text: 'Please connect your wallet before purchasing.',
          icon: 'warning',
          confirmButtonColor: '#f59e0b',
        });
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Purchase Failed',
        text: 'Something went wrong while processing your transaction.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  }

  const handleModalConfirm = async () => {
    try {
      setIsTxLoading(true);
      setTxError(null);
      if (selectedPackageIndex < 0) {
        throw new Error("Invalid package selection");
      }
      const res = await PurchasePackage(address, selectedPackageIndex);
      setTrxData(res)
      console.log("payment", res);
    } catch (error) {
      const errorMsg = error?.message || 'Something went wrong while processing your transaction.';
      console.log(error)
      setTxError(errorMsg);
      setIsTxLoading(false);
      Swal.fire({
        title: 'Purchase Failed',
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  }

  // ========================================
  // Table Data come here
  // ========================================

  const [selectedPkg, setSelectedPkg] = useState('all');
  const [historyData, setHistoryData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const getPurchaseHistory = useStore((state) => state.getPurchaseHistory);
  const packagesTag = ['Starter', 'Silver', 'Gold', 'Platinum', 'Diamond'];

  // Function to refetch history
  const refetchHistory = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setHistoryLoading(true);
      setLoadingPercentage(0);
      const startTime = Date.now();
      try {
        // Get circle counts and settlement data like Settlements page does
        const CircleCount = useStore.getState().CircleCount;
        const getUsrSettlement = useStore.getState().getUsrSettlement;
        
        const packagesTag = ['Starter', 'Silver', 'Gold', 'Platinum', 'Diamond'];
        const allData = [];
        let srNo = 1;

        // For each package
        for (let pkgIndex = 0; pkgIndex < 5; pkgIndex++) {
          try {
            // Get circle count for this package
            const circles = await CircleCount(userAddress, pkgIndex);
            
            // For each circle, get settlement details
            for (let circleIdx = 0; circleIdx < circles.length; circleIdx++) {
              try {
                const settlement = await getUsrSettlement(userAddress, pkgIndex, circleIdx);
                
                // Extract created date from cp1 settlement
                const createdAt = settlement.cp1?.timestamp 
                  ? new Date(Number(settlement.cp1.timestamp) * 1000).toLocaleString()
                  : new Date().toLocaleString();
                
                // Check if completed (cp2 has a timestamp)
                const isCompleted = settlement.cp2?.timestamp && Number(settlement.cp2.timestamp) > 0;
                const completedAt = isCompleted
                  ? new Date(Number(settlement.cp2.timestamp) * 1000).toLocaleString()
                  : '-';

                allData.push({
                  srNo: srNo++,
                  package: packagesTag[pkgIndex],
                  index: circleIdx.toString(),
                  paymentCount: '1',
                  isCompleted: isCompleted ? 'Completed' : 'Pending',
                  createdAt: createdAt,
                  completedAt: completedAt,
                  paymentInCount: isCompleted ? 1 : 0,
                  paymentOutCount: 0,
                  txHash: '',
                  type: 'Purchase',
                });
              } catch (circleErr) {
                console.log(`No settlement data for ${packagesTag[pkgIndex]} circle ${circleIdx}`);
              }
            }
            // Update percentage: (pkgIndex + 1) / 5 * 100
            const percentage = Math.round(((pkgIndex + 1) / 5) * 100);
            setLoadingPercentage(percentage);
          } catch (pkgErr) {
            console.log(`No circles found for package ${pkgIndex}`);
            const percentage = Math.round(((pkgIndex + 1) / 5) * 100);
            setLoadingPercentage(percentage);
          }
        }

        // Set the data (show actual data if available, empty if none)
        setHistoryData(allData);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistoryData([]);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(800 - elapsedTime, 0);
        setTimeout(() => {
          setHistoryLoading(false);
          setLoadingPercentage(0);
        }, remainingTime);
      }
    };

    if (userAddress) fetchData();
  }, [userAddress, refreshTrigger]);


  // Filtered version based on selected package
  const filteredHistory =
    selectedPkg === 'all'
      ? historyData
      : historyData.filter(item => item.package.toLowerCase() === selectedPkg.toLowerCase());


  // Global Stats to fetch rama price and wallet Balance

  const [GlobalData, setGlobalData] = useState();

  const globalStats = useStore((state) => state.globalStats)
  useEffect(() => {
    const fetchRamaprice = async () => {
      const response = await globalStats(userAddress);
      setGlobalData(response)

      console.log(response)
    }

    if (userAddress) fetchRamaprice();
  }, [])

  if (loading) {
    return <RamaLoader message="Loading purchase data..." />;
  }

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
      <div className="relative p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-6">🛒 Purchase Circle</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Wallet Balance" value={isConnected ? `${walletBalance} RAMA` : "Not Connected"} />
          <StatCard label="Current Package" value={activePkg || "N/A"} />
          <StatCard label="Current Rama Price (Dollar)" value={GlobalData ? ("$" + GlobalData?.globalRama?.toString()) : "Loading"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {packages?.map((pkg, index) => (
            <PackageCard
              key={pkg.packageName}
              name={pkg.packageName}
              usdPrice={pkg.priceInUSD}
              required={pkg.priceInRAMA}
              totalRequired={pkg.totalRequired}
              estimatedGas={pkg.estimatedGasRAMA}
              index={index}
              onPurchase={PruchaseNewPkg}
            />
          ))}
        </div>

        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark">Purchase & Repurchase History</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Package:</label>
              <select
                value={selectedPkg}
                onChange={(e) => setSelectedPkg(e.target.value)}
                className="px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-admin-new-green rounded-md"
              >
                <option value="all">All Packages</option>
                {packagesTag.map((name) => (
                  <option className='text-black' key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          {historyLoading ? (
            <div className="flex justify-center items-center py-12">
              <RamaLoader message="Loading purchase history..." percentage={loadingPercentage} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-white/70 dark:bg-gray-800/50">
                  <tr>
                    {['Sr. No', 'Package', 'Index', 'Type', 'Status', 'Created', 'Completed', 'IN', 'OUT'].map((heading, idx) => (
                      <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{heading}</th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => (
                    <tr key={`pkg-${index}`} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.srNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.package}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.index}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          item.type === 'Purchase'
                            ? 'bg-blue-400/20 text-blue-600 dark:text-blue-400'
                            : 'bg-purple-400/20 text-purple-600 dark:text-purple-400'
                        }`}>
                          {item.type}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          item.isCompleted === 'Completed'
                            ? 'bg-admin-new-green/20 text-admin-new-green'
                            : 'bg-yellow-400/20 text-yellow-700'
                        }`}>
                          {item.isCompleted}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.createdAt}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.completedAt}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.paymentInCount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.paymentOutCount}</td>
                      {/* <td className="px-4 py-3 text-sm">
                        <AddressDisplay value={item.txHash} type="tx" />
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">No history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          )}
        </div>

        {/* Purchase Modal */}
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPackageForModal(null);
            setTxError(null);
          }}
          selectedPackage={selectedPackageForModal}
          onConfirm={handleModalConfirm}
          isLoading={isTxLoading}
          errorMessage={txError}
        />

        {/* Transaction Status Modal */}
        <TransactionStatusModal
          isOpen={txStatusModal.isOpen}
          status={txStatusModal.status}
          transactionHash={txStatusModal.transactionHash}
          onClose={() => {
            setTxStatusModal({ isOpen: false, status: null, transactionHash: null });
            setTrxData(null);
            setIsModalOpen(false);
            setSelectedPackageForModal(null);
            setTxError(null);
            setSelectedPackageIndex(-1);
          }}
          onDashboard={() => {
            setTxStatusModal({ isOpen: false, status: null, transactionHash: null });
            setTrxData(null);
            setIsModalOpen(false);
            setSelectedPackageForModal(null);
            setTxError(null);
            setSelectedPackageIndex(-1);
            navigate('/dashboard');
          }}
          onViewScan={() => {
            window.open(`https://ramascan.com/tx/${txStatusModal.transactionHash}`, '_blank');
          }}
        />
      </div>
    </div>
  );
};

export default Purchase;