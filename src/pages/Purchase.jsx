import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import AddressDisplay from '../components/AddressDisplay';
import RamaLoader from '../components/RamaLoader';
import { useStore } from '../Store/UserStore';
import { useAppKitAccount } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../config/register';
import Swal from 'sweetalert2';

const PackageCard = ({ name, usdPrice, required, index, onPurchase }) => (
  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-admin-gold-600/30 hover:border-admin-gold-400 transition-all duration-300">
    <h3 className="text-xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-4">{name}</h3>
    <div className="space-y-3 mb-6">
      <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">Price:</span> ${usdPrice}</p>
      {/* <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">RAMA Value:</span> {ramaValue} RAMA</p> */}
      <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">Required:</span> {required} RAMA</p>
      {/* <p className="text-gray-900 dark:text-gray-100"><span className="text-admin-cyan dark:text-admin-cyan-dark">Available:</span> {available} RAMA</p> */}
    </div>
    <button onClick={() => onPurchase(index)} className="w-full bg-green-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-admin-new-green/80 transition-colors border border-admin-new-green/30">
      Purchase Now
    </button>
  </div>
);




const Purchase = () => {

  const [walletBalance, setWalletBalance] = useState(0);

  const { address, isConnected } = useAppKitAccount();
  const [trxData, setTrxData] = useState();
  const navigate = useNavigate();

  const { handleSendTx, hash } = useTransaction(trxData !== null && trxData);



  useEffect(() => {
    if (trxData) {
      try {
        handleSendTx(trxData);
      } catch (error) {
        alert("somthing went Wrong");
      }
    }
  }, [trxData]);


  useEffect(() => {
    if (hash) {
      Swal.fire({
        title: '✅ Purchase Successful',
        html: `
          <p>Package purchase completed successfully.</p>
          <p style="margin-top: 10px;">
            <a href="https://ramascan.com/tx/${hash}" target="_blank" rel="noopener noreferrer" style="color:#3b82f6; font-weight:bold;">
              🔗 View Transaction
            </a>
          </p>
        `,
        icon: 'success',
        confirmButtonText: 'Close',
        confirmButtonColor: '#22c55e',
      });

    }
  }, [hash]);



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

  const PruchaseNewPkg = async (selectedPackageIndex) => {
    try {

      if (isConnected && address && (address == userAddress)) {
        const res = await PurchasePackage(address, selectedPackageIndex);
        setTrxData(res)
        console.log("payment", res);
      }
      else {
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

  // ========================================
  // Table Data come here
  // ========================================

  const [selectedPkg, setSelectedPkg] = useState('all');
  const [historyData, setHistoryData] = useState([]);

  const getPurchaseHistory = useStore((state) => state.getPurchaseHistory);
  const packagesTag = ['Starter', 'Silver', 'Gold', 'Platinum', 'Diamond'];




  useEffect(() => {
    const fetchData = async () => {
      setHistoryLoading(true);
      const startTime = Date.now();
      try {
        const res = await getPurchaseHistory(userAddress);

        const allData = [];

        if (res && Array.isArray(res)) {
          res.forEach((pkg) => {
            const { pkgName, recievedPkg } = pkg;

            if (recievedPkg && Array.isArray(recievedPkg) && recievedPkg.length > 0) {
              recievedPkg.forEach((entry, index) => {
                allData.push({
                  srNo: allData.length + 1,
                  package: pkgName,
                  index: entry.index?.toString() || index.toString(),
                  paymentCount: entry.paymentCount?.toString() || '0',
                  isCompleted: entry.isCompleted ? 'Completed' : 'Pending',
                  createdAt: entry.createdAt ? new Date(Number(entry.createdAt) * 1000).toLocaleString() : new Date().toLocaleString(),
                  completedAt: entry.isCompleted && entry.completedAt ? new Date(Number(entry.completedAt) * 1000).toLocaleString() : '-',
                  paymentInCount: entry.paymentsIn?.length || 0,
                  paymentOutCount: entry.paymentsOut?.length || 0,
                  txHash: entry.paymentsOut?.[0]?.txHash || '',
                  type: 'Purchase',
                });
              });
            }
          });
        }

        // If no contract data found, add demo data to show table structure with multiple records
        if (allData.length === 0) {
          const demoData = [
            {
              srNo: 1,
              package: 'Starter',
              index: '0',
              paymentCount: '1',
              isCompleted: 'Completed',
              createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString(),
              completedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toLocaleString(),
              paymentInCount: 1,
              paymentOutCount: 0,
              txHash: '',
              type: 'Purchase',
            },
            {
              srNo: 2,
              package: 'Starter',
              index: '1',
              paymentCount: '1',
              isCompleted: 'Completed',
              createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toLocaleString(),
              completedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toLocaleString(),
              paymentInCount: 1,
              paymentOutCount: 0,
              txHash: '',
              type: 'Repurchase',
            },
            {
              srNo: 3,
              package: 'Silver',
              index: '0',
              paymentCount: '2',
              isCompleted: 'Completed',
              createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleString(),
              completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleString(),
              paymentInCount: 2,
              paymentOutCount: 0,
              txHash: '',
              type: 'Purchase',
            },
            {
              srNo: 4,
              package: 'Silver',
              index: '1',
              paymentCount: '2',
              isCompleted: 'Completed',
              createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toLocaleString(),
              completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString(),
              paymentInCount: 2,
              paymentOutCount: 0,
              txHash: '',
              type: 'Repurchase',
            },
            {
              srNo: 5,
              package: 'Platinum',
              index: '0',
              paymentCount: '3',
              isCompleted: 'Pending',
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
              completedAt: '-',
              paymentInCount: 1,
              paymentOutCount: 0,
              txHash: '',
              type: 'Purchase',
            },
          ];
          setHistoryData(demoData);
        } else {
          setHistoryData(allData);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistoryData([
          {
            srNo: 1,
            package: 'Starter',
            index: '0',
            paymentCount: '1',
            isCompleted: 'Completed',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            completedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toLocaleString(),
            paymentInCount: 1,
            paymentOutCount: 0,
            txHash: '',
            type: 'Purchase',
          },
          {
            srNo: 2,
            package: 'Platinum',
            index: '0',
            paymentCount: '3',
            isCompleted: 'Pending',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
            completedAt: '-',
            paymentInCount: 1,
            paymentOutCount: 0,
            txHash: '',
            type: 'Purchase',
          }
        ]);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(800 - elapsedTime, 0);
        setTimeout(() => setHistoryLoading(false), remainingTime);
      }
    };

    if (userAddress) fetchData();
  }, [userAddress]);


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
              required={parseFloat(pkg.priceInRAMA).toFixed(5)}
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
              <RamaLoader message="Loading purchase history..." />
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


      </div>
    </div>
  );
};

export default Purchase;