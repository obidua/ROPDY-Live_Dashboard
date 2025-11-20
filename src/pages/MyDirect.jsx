import React, { useEffect, useState } from 'react';
import { useStore } from '../Store/UserStore';
import RamaLoader from '../components/RamaLoader';
import BlockchainAnimation from '../components/BlockchainAnimation';

const MyDirect = () => {
    const MyRefferal = useStore((state) => state.MyRefferal);
    const userAddress = JSON.parse(localStorage.getItem("UserData") || '{}')?.address;

    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDirectReferral = async () => {
            if (!userAddress) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const [response] = await Promise.all([
                    MyRefferal(userAddress),
                    new Promise(resolve => setTimeout(resolve, 800))
                ]);
                setReferrals(response);
            } catch (err) {
                console.error("Failed to fetch referrals:", err);
                setReferrals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDirectReferral();
    }, [userAddress]);

    return (
        <div className="relative min-h-screen">
            <BlockchainAnimation />
            <div className="relative p-6">
                <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-6">👥 My Direct Referrals</h1>

                {!userAddress && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                            ⚠️ Please connect your wallet to view your direct referrals.
                        </p>
                    </div>
                )}

                <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30 overflow-x-auto">
                    <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">Referral Details</h2>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <RamaLoader />
                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">Loading referral data...</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-white/70 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sr. No</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">User ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Wallet Address</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sponsor Address</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Registered At</th>
                        </tr>
                    </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {referrals.length > 0 ? (
                                    referrals.map((ref, index) => (
                                        <tr key={index} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/30">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{ref.id.toString()}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{ref.wallet.toString()}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{ref.sponsor.toString()}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {new Date(Number(ref.registrationTime) * 1000).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-600 dark:text-gray-300 text-sm">
                                            No direct referrals found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyDirect;
