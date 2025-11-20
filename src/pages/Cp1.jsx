import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import BlockchainAnimation from '../components/BlockchainAnimation';
import RamaLoader from '../components/RamaLoader';
import { useStore } from '../Store/UserStore';

const Cp1 = () => {
  const [cp1Data, setCp1Data] = useState([]);
  const [loading, setLoading] = useState(true);

  const Cp1Earning = useStore((state) => state.Cp1Earning);
  const userAddress = JSON.parse(localStorage.getItem("UserData") || '{}')?.address;

  useEffect(() => {
    const fetchcp1Data = async () => {
      if (userAddress) {
        const startTime = Date.now();
        try {
          const res = await Cp1Earning(userAddress);
          setCp1Data(res);
        } catch (error) {
          console.error("Error fetching CP1 data:", error);
        } finally {
          // Ensure minimum 800ms loading time for better UX
          const elapsed = Date.now() - startTime;
          const delay = Math.max(0, 800 - elapsed);
          setTimeout(() => setLoading(false), delay);
        }
      }
    };
    if (userAddress) fetchcp1Data();
  }, [userAddress]);

  return (
    <div className="relative min-h-screen">
      <BlockchainAnimation />
      <div className="relative p-6">
        <h1 className="text-2xl font-bold text-admin-cyan dark:text-admin-cyan-dark mb-6">♻️ CP1 (Direct Payment)</h1>

        {loading ? (
          <RamaLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="🌱 Starter"
              value={`${parseFloat(cp1Data[0] || 0).toFixed(5)} RAMA`}
            />
            <StatCard
              label="🥈 Silver"
              value={`${parseFloat(cp1Data[1] || 0).toFixed(5)} RAMA`}
            />
            <StatCard
              label="🥇 Gold"
              value={`${parseFloat(cp1Data[2] || 0).toFixed(5)} RAMA`}
            />
            <StatCard
              label="💎 Diamond"
              value={`${parseFloat(cp1Data[3] || 0).toFixed(5)} RAMA`}
            />
            <StatCard
              label="⭐ Platinum"
              value={`${parseFloat(cp1Data[4] || 0).toFixed(5)} RAMA`}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Cp1;
