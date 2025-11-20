import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function TokenomicsComparison() {
  const networks = [
    {
      name: 'Ethereum',
      token: 'ETH',
      totalSupply: 'No cap',
      circulating: '~120,707,000',
      circulatingPercent: 'N/A',
      dailyMint: '~1,600-2,000',
      dailyBurn: '~200-500',
      netDaily: '+1,100 to +1,800',
      trend: 'inflationary',
      trendIcon: TrendingUp,
      trendColor: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30'
    },
    {
      name: 'Polygon',
      token: 'MATIC/POL',
      totalSupply: '10,000,000,000',
      circulating: 'Varies',
      circulatingPercent: 'Unknown',
      dailyMint: 'Unknown',
      dailyBurn: 'Tracked but not daily',
      netDaily: 'Unknown',
      trend: 'neutral',
      trendIcon: Minus,
      trendColor: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      name: 'BNB Chain',
      token: 'BNB',
      totalSupply: 'Dynamic (burns reduce)',
      circulating: '~139,181,000',
      circulatingPercent: 'N/A',
      dailyMint: 'Unknown',
      dailyBurn: 'Periodic burns (~1.6M per event)',
      netDaily: 'Unknown',
      trend: 'deflationary',
      trendIcon: TrendingDown,
      trendColor: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30'
    },
    {
      name: 'TRON',
      token: 'TRX',
      totalSupply: 'No cap',
      circulating: '~94,700,000,000',
      circulatingPercent: 'N/A',
      dailyMint: '~5,050,000',
      dailyBurn: 'Unknown',
      netDaily: '+5,050,000',
      trend: 'inflationary',
      trendIcon: TrendingUp,
      trendColor: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30'
    },
    {
      name: 'Ramestta',
      token: 'RAMA',
      totalSupply: '1,000,000,000',
      circulating: '4,000,000',
      circulatingPercent: '0.4%',
      dailyMint: '0',
      dailyBurn: 'Variable',
      netDaily: 'Deflationary',
      trend: 'deflationary',
      trendIcon: TrendingDown,
      trendColor: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      featured: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="cyber-glass border border-cyan-500/30 rounded-xl p-4 mb-4">
        <h4 className="text-base font-bold text-cyan-300 mb-2">Understanding the Data</h4>
        <p className="text-xs text-cyan-300/80">
          This comparison shows key tokenomics metrics across major blockchain networks. RAMA's unique advantage is its extremely limited circulating supply (only 0.4% of total) compared to competitors, creating natural scarcity that drives price appreciation as demand grows.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-500/30">
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Network / Token</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Total Supply</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Circulating Supply</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Daily Mint</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Daily Burn</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Net Daily</th>
              <th className="text-left py-3 px-2 text-cyan-300 font-semibold">Trend</th>
            </tr>
          </thead>
          <tbody>
            {networks.map((network, index) => (
              <tr 
                key={network.name}
                className={`border-b border-cyan-500/20 ${network.featured ? 'bg-green-400/5' : ''}`}
                style={{animationDelay: `${index * 100}ms`, animationFillMode: 'both'}}
              >
                <td className="py-3 px-2">
                  <div>
                    <p className={`font-bold ${network.featured ? 'text-green-400' : 'text-cyan-300'}`}>
                      {network.name}
                    </p>
                    <p className="text-xs text-cyan-300/60">({network.token})</p>
                  </div>
                </td>
                <td className="py-3 px-2 text-cyan-300/90">{network.totalSupply}</td>
                <td className="py-3 px-2">
                  <div>
                    <p className="text-cyan-300/90">{network.circulating}</p>
                    {network.circulatingPercent !== 'N/A' && network.circulatingPercent !== 'Unknown' && (
                      <p className="text-xs text-cyan-300/60">({network.circulatingPercent})</p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 text-cyan-300/90">{network.dailyMint}</td>
                <td className="py-3 px-2 text-cyan-300/90">{network.dailyBurn}</td>
                <td className="py-3 px-2 text-cyan-300/90">{network.netDaily}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1">
                    <network.trendIcon className={network.trendColor} size={16} />
                    <span className={`text-xs ${network.trendColor}`}>{network.trend}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {networks.map((network, index) => (
          <div
            key={network.name}
            className={`cyber-glass border ${network.featured ? 'border-green-400/50 bg-green-400/5' : 'border-cyan-500/30'} rounded-xl p-4`}
            style={{animationDelay: `${index * 100}ms`, animationFillMode: 'both'}}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className={`text-base font-bold ${network.featured ? 'text-green-400' : 'text-cyan-300'}`}>
                  {network.name}
                </h4>
                <p className="text-xs text-cyan-300/60">{network.token}</p>
              </div>
              <div className="flex items-center gap-1">
                <network.trendIcon className={network.trendColor} size={16} />
                <span className={`text-xs ${network.trendColor}`}>{network.trend}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-cyan-300/60 mb-1">Total Supply</p>
                <p className="text-cyan-300/90">{network.totalSupply}</p>
              </div>
              <div>
                <p className="text-cyan-300/60 mb-1">Circulating</p>
                <p className="text-cyan-300/90">{network.circulating}</p>
                {network.circulatingPercent !== 'N/A' && network.circulatingPercent !== 'Unknown' && (
                  <p className="text-cyan-300/60">({network.circulatingPercent})</p>
                )}
              </div>
              <div>
                <p className="text-cyan-300/60 mb-1">Daily Mint</p>
                <p className="text-cyan-300/90">{network.dailyMint}</p>
              </div>
              <div>
                <p className="text-cyan-300/60 mb-1">Daily Burn</p>
                <p className="text-cyan-300/90">{network.dailyBurn}</p>
              </div>
              <div className="col-span-2">
                <p className="text-cyan-300/60 mb-1">Net Daily</p>
                <p className="text-cyan-300/90">{network.netDaily}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenomicsComparison;
