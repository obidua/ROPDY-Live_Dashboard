import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import CircleDisplay from '../components/CircleDisplay';
import AddressDisplay from '../components/AddressDisplay';
import RamaLoader from '../components/RamaLoader';
import { generateFullHash, mockAddresses } from '../utils/mockData';
import { useStore } from '../Store/UserStore';
import Web3 from 'web3';

const web3 = new Web3();

const Circles = () => {


  const getActiveCircles = useStore((state) => state.getActiveCircles);
  const ViewDetailedPartner = useStore((state) => state.ViewDetailedPartner);




  const [circleNumbers, setCircleNumber] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [viewLoading, setViewLoading] = useState(false);

  const userAddress = JSON.parse(localStorage.getItem("UserData") || '{}')?.address;



  const [selectedPackage, setSelectedPackage] = useState(0);
  const [selectedCircle, setSelectedCircle] = useState(0);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [positionDetails, setPositionDetails] = useState([]);

  const packages = [
    { id: 0, name: 'Starter', value: 200, usdPrice: 20 },
    { id: 1, name: 'Silver', value: 400, usdPrice: 40 },
    { id: 2, name: 'Gold', value: 800, usdPrice: 80 },
    { id: 3, name: 'Platinum', value: 1600, usdPrice: 160 },
    { id: 4, name: 'Diamond', value: 3200, usdPrice: 320 },
  ];




  const [mockPositions, setMockPosition] = useState([])
  const [paymentDetails, setPaymentDetails] = useState([]);


  const getCircleDetails = () => {
    const details = mockPositions.map((pos, index) => ({
      srNo: index + 1,
      idNumber: pos.userId || 'N/A',
      address: pos.fromAddress || 'N/A',
      rama: pos.rama || 'N/A',
      usd: pos.usd ? `$${pos.usd}` : 'N/A',
      hashId: pos.userId ? generateFullHash() : 'N/A'
    }));

    return {
      id: selectedCircle,
      package: selectedPackage,
      centerUser: {
        userId: 'Me',
        isFilled: true
      },
      positions: mockPositions
    };
  };

  const handleViewCircle = async () => {
    if (typeof selectedPackage === 'number' && typeof selectedCircle === 'number') {
      setViewLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Min delay
        const details = getCircleDetails();
        setCurrentCircle(details);
        
        // Get the static USD value for this package (50% of USD price)
        const selectedPkg = packages.find(p => p.id === selectedPackage);
        const staticUsdValue = selectedPkg ? (selectedPkg.usdPrice * 50) / 100 : 0; // 50% of USD price
        
        // Map positions with payment details
        const positionsWithPayments = details.positions.map((pos, index) => {
          const payment = paymentDetails.find(p => p.from === pos.fromAddress);
          
          // Convert RAMA from Wei to Ether
          const ramaValue = payment ? parseFloat(web3.utils.fromWei(payment.netRama || '0', 'ether')) : 0;
          
          return {
            srNo: index + 1,
            idNumber: pos.userId || 'N/A',
            address: pos.fromAddress || 'N/A',
            type: pos.type || 'N/A',
            ramaAmount: ramaValue.toFixed(4),
            usdAmount: staticUsdValue.toFixed(2), // Static USD based on 50% of package USD price
          };
        });
        
        setPositionDetails(positionsWithPayments);
      } finally {
        setViewLoading(false);
      }
    }
  };




  useEffect(() => {
    // FIRST: Reset previous state immediately when package/circle changes
    setMockPosition([]);
    setPositionDetails([]);
    setCurrentCircle(null);
    setLoading(true);
    setLoadingPercentage(0);

    const getSelectedPkg = async () => {
      try {
        setLoadingPercentage(25);
        const res = await getActiveCircles(userAddress, selectedPackage);
        console.log('Circle Data:', res[0]);

        const rawData = res[0]; // [0n, 1n, 2n]
        const circleData = rawData.map(Number);

        console.log('Circle Data:', circleData);

        setLoadingPercentage(100);
        setCircleNumber(circleData || []);
      } catch (error) {
        console.error('Error fetching circles:', error);
        setCircleNumber([]);
      } finally {
        setLoading(false);
        setLoadingPercentage(0);
      }
    }

    console.log('Selected Package:', userAddress, selectedPackage);

    if (selectedPackage !== null && selectedPackage !== undefined && selectedCircle !== null && selectedCircle !== undefined) getSelectedPkg();
  }, [selectedPackage, selectedCircle])


  useEffect(() => {

    const ViewDetails = async () => {
      setLoading(true);
      setLoadingPercentage(50);
      try {
        const res = await ViewDetailedPartner(userAddress, selectedPackage, selectedCircle);
        console.log('Detailed Circle Data:', res);
        fetchPaymentDetails(userAddress, selectedPackage, selectedCircle)

        setLoadingPercentage(100);
        setMockPosition(res);
      } catch (error) {
        console.error('Error fetching details:', error);
        setMockPosition([]);
      } finally {
        setLoading(false);
        setLoadingPercentage(0);
      }
    }

    console.log("selectedPackage,selectedCircle", selectedPackage, selectedCircle)

    if (selectedPackage !== null && selectedCircle !== null) ViewDetails();
  }, [selectedCircle, selectedPackage]);


  // Fetching the CircleInfo

  const [circleData, setCircleData] = useState()


  const CircleInfo = useStore((state) => state.CircleInfo)

  useEffect(() => {
    const fetchCircleInfo = async () => {
      setLoading(true);
      setLoadingPercentage(0);
      try {
        // Simulate progressive percentage
        const percentageInterval = setInterval(() => {
          setLoadingPercentage(prev => {
            if (prev < 90) return prev + Math.random() * 40;
            return prev;
          });
        }, 200);

        const [res] = await Promise.all([
          CircleInfo(userAddress),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);

        clearInterval(percentageInterval);
        setLoadingPercentage(100);
        setCircleData(res)
      } catch (error) {
        console.error('Error fetching circle info:', error);
      } finally {
        setLoading(false);
        setLoadingPercentage(0);
      }
    }
    if (userAddress) fetchCircleInfo();
  }, [])

// =======================================================
  // Each position Payment With Modal 
// =======================================================


  const getCirclePosPayment = useStore((state)=>state.getCirclePosPayment);

  const fetchPaymentDetails = async (userAddress, selectedPackage, selectedCircle) => {
    try {
      console.log(userAddress, selectedPackage, selectedCircle)
      const res = await getCirclePosPayment(userAddress, selectedPackage, selectedCircle);
      console.log('Payment Details:', res);
      setPaymentDetails(res || []);
    } catch (error) {
      console.log(error)
      setPaymentDetails([]);
    }
  }

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-6">🔄 My Circles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading && !circleData ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <RamaLoader message="Loading circle data..." percentage={loadingPercentage} />
            </div>
          ) : (
            <>
              <StatCard label="Total Circles" value={circleData?.totalCircle} />
              {/* <StatCard label="Active Circles" value={circleData?.pendingCircle + circleData?.CompleteCircle} /> */}
              <StatCard label="Completed Circles" value={circleData?.completeCircle} />
              <StatCard label="Pending Circles" value={circleData?.pendingCircle} />
            </>
          )}
        </div>

        <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-green-800 mb-8">
          <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">View Circle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Package
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => {
                  setSelectedPackage(Number(e.target.value));
                  setSelectedCircle(0); // Reset circle selection when package changes
                  setCurrentCircle(null); // Reset current circle
                  setPositionDetails([]); // Reset position details
                }}
                disabled={loading}
                className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-green-800 rounded-md disabled:opacity-50"
              >
                <option value="" className='text-black'>Select a package</option>
                {packages.map(pkg => (
                  <option className='text-black' key={pkg.id} value={pkg.id}>{pkg.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Circle Number
              </label>
              <select
                value={selectedCircle}
                onChange={(e) => setSelectedCircle(Number(e.target.value))}
                disabled={loading || circleNumbers.length === 0}
                className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-green-800 rounded-md disabled:opacity-50"
              >
                <option value="" className='text-black'>Select a Circle</option>
                {loading ? (
                  <option disabled className='text-black'>Loading circles...</option>
                ) : (
                  circleNumbers.map(num => (
                    <option className='text-black' key={num} value={num}>Circle {num} - ID #{num}</option>
                  ))
                )}
              </select>
            </div>
          </div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-6">
              <RamaLoader message="Loading circle data..." percentage={loadingPercentage} />
            </div>
          )}
          <button
            onClick={handleViewCircle}
            disabled={loading || viewLoading || mockPositions.length === 0 || selectedPackage === null || selectedCircle === null}
            className={`px-6 py-2.5 rounded-lg font-semibold shadow-md transition-colors border border-green-800 flex items-center gap-2 ${
              loading || viewLoading || mockPositions.length === 0
                ? "bg-transparent text-green-800 opacity-50 cursor-wait"
                : "bg-green-800 text-white hover:bg-admin-new-green/10"
              }`}
          >
            {viewLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading Circle...
              </>
            ) : loading || mockPositions.length === 0 ? (
              "Loading..."
            ) : (
              "View Circle"
            )}
          </button>
        </div>

        {(currentCircle || (mockPositions.length > 0 && !loading)) && (
          <>
            {currentCircle && (
              <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30 mb-8">
                <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
                  Circle # - {packages.find(p => p.id === currentCircle.package)?.name}
                </h2>
                <CircleDisplay circleDetails={currentCircle} />
              </div>
            )}

            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30 overflow-x-auto">
              <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Position Details</h2>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-white/70 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sr. No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID Number</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Payment Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">RAMA Received</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">USD Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {positionDetails.map((position) => (
                    <tr key={position.srNo} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{position?.srNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{position?.idNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{position?.address}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {position?.address?.startsWith("0x0000000000000000000000000000000000000000")
                          ? "--"
                          : (position?.type === '1' ? "Direct Payment" : "Random Payment")}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {position?.address?.startsWith("0x0000000000000000000000000000000000000000")
                          ? "--"
                          : `${position?.ramaAmount} RAMA`}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {position?.address?.startsWith("0x0000000000000000000000000000000000000000")
                          ? "--"
                          : `$${position?.usdAmount}`}
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  {positionDetails.length > 0 && (
                    <tr className="bg-green-800/20 dark:bg-green-800/10 font-semibold border-t-2 border-green-800">
                      <td colSpan="4" className="px-4 py-3 text-right text-sm text-gray-900 dark:text-gray-100">
                        Total ({positionDetails.filter(pos => !pos?.address?.startsWith("0x0000000000000000000000000000000000000000")).length} positions):
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {positionDetails.reduce((sum, pos) => sum + parseFloat(pos?.ramaAmount || 0), 0).toFixed(4)} RAMA
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${(parseFloat(positionDetails[0]?.usdAmount || 0) * positionDetails.filter(pos => !pos?.address?.startsWith("0x0000000000000000000000000000000000000000")).length).toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Package Information Card */}
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30 mt-8">
              <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">
                {packages.find(p => p.id === selectedPackage)?.name} Package Details
              </h2>
              {packages.find(p => p.id === selectedPackage) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">One-time activation:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">${packages.find(p => p.id === selectedPackage)?.usdPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Package price:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">${packages.find(p => p.id === selectedPackage)?.usdPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Per Payment:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">${(packages.find(p => p.id === selectedPackage)?.usdPrice / 2).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Total (6 pays):</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">${(packages.find(p => p.id === selectedPackage)?.usdPrice * 3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Multiplier:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">3x</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                      ℹ️ Payments #5 & #6 auto-reactivate this package
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Circles;