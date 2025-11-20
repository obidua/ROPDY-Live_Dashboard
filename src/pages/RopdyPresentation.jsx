import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, TrendingUp, Users, Award, Trophy, Gift, Shield, Zap, DollarSign, Target, CheckCircle, BarChart3, PieChart, Wallet, Lock, Globe, ArrowRight, AlertCircle, Maximize, Minimize, Play, Pause, Coins, Building2, CreditCard, Smartphone, Blocks, Code, FileText, Network, Layers, Repeat, CircleDollarSign } from 'lucide-react';
import TokenomicsComparison from '../components/TokenomicsComparison';
import LogoCircleImage from '../components/LogoCircleImage';

function RopdyPresentation() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Welcome to ROPDY",
      subtitle: "Ramestta On-Chain Passive Dynamic Yield",
      content: (
        <div className="space-y-2 md:space-y-6 text-center">
          {/* Logo Image */}
          <div className="flex justify-center mb-4 md:mb-8">
            <img 
              src="/ropdyfull.png" 
              alt="ROPDY Logo" 
              className="w-40 sm:w-56 h-auto object-contain"
            />
          </div>
          
          <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 animate-slide-in-top" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            ROPDY Circle
          </h2>
          <p className="text-xs md:text-lg lg:text-2xl text-cyan-300 max-w-3xl mx-auto leading-snug md:leading-relaxed px-1 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            100% smart-contract powered, fully decentralized earning system on Ramestta blockchain. Direct wallet-to-wallet payouts in RAMA Coin.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mt-2 md:mt-8">
            <div className="cyber-glass border-2 border-cyan-500 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <p className="text-2xl md:text-4xl font-bold text-green-400 mb-0.5 md:mb-2">5</p>
              <p className="text-[9px] md:text-sm text-cyan-300 leading-tight">Package Levels</p>
            </div>
            <div className="cyber-glass border-2 border-green-400 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 animate-fade-in-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <p className="text-2xl md:text-4xl font-bold text-green-400 mb-0.5 md:mb-2">6</p>
              <p className="text-[9px] md:text-sm text-cyan-300 leading-tight">Payments/Circle</p>
            </div>
            <div className="cyber-glass border-2 border-purple-500 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 animate-fade-in-up" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
              <p className="text-2xl md:text-4xl font-bold text-purple-400 mb-0.5 md:mb-2">Auto</p>
              <p className="text-[9px] md:text-sm text-cyan-300 leading-tight">Reactivation</p>
            </div>
            <div className="cyber-glass border-2 border-orange-500 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
              <p className="text-2xl md:text-4xl font-bold text-orange-400 mb-0.5 md:mb-2">$20</p>
              <p className="text-[9px] md:text-sm text-cyan-300 leading-tight">Min Entry</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Evolution of Money",
      subtitle: "From Barter to Blockchain",
      content: (
        <div className="space-y-4">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-6 animate-fade-in">
            Understanding how money evolved helps us appreciate why blockchain represents the next revolution
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="cyber-glass border border-orange-400/30 rounded-xl p-4 animate-slide-fade-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-orange-400 mb-2">1</div>
              <h4 className="text-lg font-bold text-cyan-300 mb-2">Barter System</h4>
              <p className="text-sm text-cyan-300/80">Direct exchange of goods</p>
              <p className="text-xs text-red-400 mt-2">Limited by double coincidence</p>
            </div>
            <div className="cyber-glass border border-yellow-400/30 rounded-xl p-4 animate-slide-fade-left" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-yellow-400 mb-2">2-3</div>
              <h4 className="text-lg font-bold text-cyan-300 mb-2">Commodity & Coins</h4>
              <p className="text-sm text-cyan-300/80">Precious metals, minted coins</p>
              <p className="text-xs text-yellow-400 mt-2">Heavy, hard to divide</p>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-4 animate-slide-fade-left" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-green-400 mb-2">4</div>
              <h4 className="text-lg font-bold text-cyan-300 mb-2">Paper Money</h4>
              <p className="text-sm text-cyan-300/80">Banknotes backed by gold</p>
              <p className="text-xs text-green-400 mt-2">Portable, divisible</p>
            </div>
            <div className="cyber-glass border border-purple-500/30 rounded-xl p-4 animate-slide-fade-left" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
              <h4 className="text-lg font-bold text-cyan-300 mb-2">Digital Banking</h4>
              <p className="text-sm text-cyan-300/80">Credit cards, online transfers</p>
              <p className="text-xs text-red-400 mt-2">Banks control everything</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-4 animate-slide-fade-left" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-cyan-400 mb-2">6</div>
              <h4 className="text-lg font-bold text-cyan-300 mb-2">Cryptocurrency</h4>
              <p className="text-sm text-cyan-300/80">Blockchain, decentralized</p>
              <p className="text-xs text-green-400 mt-2">You control your assets</p>
            </div>
            <div className="cyber-glass border-2 border-green-400 rounded-xl p-4 bg-gradient-to-br from-green-400/10 to-cyan-500/10 animate-slide-fade-left" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
              <div className="text-3xl font-bold text-green-400 mb-2">7</div>
              <h4 className="text-lg font-bold text-green-400 mb-2">DeFi</h4>
              <p className="text-sm text-cyan-300/80">Automated finance, no banks</p>
              <p className="text-xs text-green-400 font-semibold mt-2">The Future is Here!</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What is Blockchain?",
      subtitle: "The Foundation of ROPDY",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 leading-relaxed animate-fade-in">
            A <strong className="text-green-400">blockchain</strong> is a distributed digital ledger that records transactions across many computers. Think of it as a digital chain of blocks where each block contains transaction records.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-5 animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <Lock className="text-cyan-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Immutable</h3>
              <p className="text-sm text-cyan-300/80">Once recorded, data cannot be altered or deleted</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-5 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Network className="text-green-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-green-400 mb-2">Decentralized</h3>
              <p className="text-sm text-cyan-300/80">No single entity controls the network</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-5 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <Shield className="text-purple-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-purple-400 mb-2">Transparent</h3>
              <p className="text-sm text-cyan-300/80">All transactions are visible and verifiable</p>
            </div>
          </div>
          <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 bg-gradient-to-br from-green-400/5 to-cyan-500/5 animate-slide-in-bottom" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <p className="text-base text-cyan-300 leading-relaxed">
              <strong className="text-green-400">ROPDY</strong> leverages Ramestta blockchain to provide fast (2-second blocks), secure (validator-backed), and affordable transactions for all your DeFi activities.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Smart Contracts",
      subtitle: "Automated Agreements on Blockchain",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 leading-relaxed animate-fade-in">
            <strong className="text-green-400">Smart contracts</strong> are self-executing programs on blockchain that automatically enforce agreements when conditions are met. No intermediaries needed!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border border-red-400/30 rounded-xl p-5 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <FileText className="text-red-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-red-400 mb-3">Traditional Contracts</h3>
              <ul className="space-y-2 text-sm text-cyan-300/80">
                <li>✗ Need lawyers & intermediaries</li>
                <li>✗ Slow (weeks/months)</li>
                <li>✗ Expensive fees</li>
                <li>✗ Can be disputed</li>
                <li>✗ Manual enforcement</li>
              </ul>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-5 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Code className="text-green-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-green-400 mb-3">Smart Contracts</h3>
              <ul className="space-y-2 text-sm text-cyan-300/80">
                <li>✓ No intermediaries</li>
                <li>✓ Instant execution</li>
                <li>✓ Minimal fees</li>
                <li>✓ Cannot be broken</li>
                <li>✓ Automatic enforcement</li>
              </ul>
            </div>
          </div>
          <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-5 animate-slide-in-bottom" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <p className="text-sm text-cyan-300/90 leading-relaxed">
              <strong className="text-cyan-300">ROPDY uses smart contracts</strong> to automate circle management, calculate payments, distribute earnings, and handle auto-reactivation. Everything happens automatically and transparently!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What is DeFi?",
      subtitle: "Decentralized Finance Explained",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 leading-relaxed animate-fade-in">
            <strong className="text-green-400">DeFi (Decentralized Finance)</strong> recreates traditional financial services using blockchain and smart contracts, eliminating banks and intermediaries.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border border-red-400/30 rounded-xl p-5 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <Building2 className="text-red-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-red-400 mb-3">Traditional Finance</h3>
              <ul className="space-y-2 text-sm text-cyan-300/80">
                <li>✗ Banks control your money</li>
                <li>✗ Limited hours (9-5, M-F)</li>
                <li>✗ High fees, slow transfers</li>
                <li>✗ Geographic restrictions</li>
                <li>✗ Requires KYC/documentation</li>
                <li>✗ Opaque operations</li>
              </ul>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-5 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Blocks className="text-green-400 mb-3" size={32} />
              <h3 className="text-xl font-bold text-green-400 mb-3">Decentralized Finance</h3>
              <ul className="space-y-2 text-sm text-cyan-300/80">
                <li>✓ You control your assets</li>
                <li>✓ 24/7 worldwide access</li>
                <li>✓ Low fees, instant transfers</li>
                <li>✓ Accessible from anywhere</li>
                <li>✓ Pseudonymous participation</li>
                <li>✓ Fully transparent on-chain</li>
              </ul>
            </div>
          </div>
          <div className="cyber-glass border-2 border-purple-500 rounded-xl p-5 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-slide-in-bottom" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <p className="text-base text-cyan-300 leading-relaxed">
              <strong className="text-purple-400">ROPDY</strong> is a pure DeFi platform - circle-based earnings with direct wallet payouts, all powered by smart contracts!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Ramestta Blockchain",
      subtitle: "Layer 3 Built on Polygon",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 leading-relaxed animate-fade-in">
            <strong className="text-green-400">Ramestta</strong> is an open-source public blockchain built by a global community of developers since 2021. It's a Layer 3 blockchain optimized for DeFi applications, offering the best combination of speed, security, and low costs.
          </p>
          <div className="cyber-glass border border-green-400/50 rounded-xl p-4 mb-4 animate-slide-in-left" style={{animationDelay: '0.15s', animationFillMode: 'both'}}>
            <h4 className="text-lg font-bold text-green-400 mb-3">Community-Built Innovation</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                <span className="text-xs text-cyan-300/90">Global developers contributing knowledge & infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                <span className="text-xs text-cyan-300/90">No ICO or private sales - purely organic growth</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                <span className="text-xs text-cyan-300/90">Controlled supply: Only 4M RAMA in circulation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                <span className="text-xs text-cyan-300/90">Listed: Koinpark, BitMart Exchange + more by 2026</span>
              </div>
            </div>
          </div>
          <div className="cyber-glass border border-purple-500/50 rounded-xl p-5 mb-4 animate-slide-in-top" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            <h3 className="text-xl font-bold text-purple-400 mb-4">The Layer Hierarchy</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.15s', animationFillMode: 'both'}}>
                <div className="w-20 bg-blue-500 text-white text-center py-2 rounded-lg font-bold text-sm">Layer 1</div>
                <p className="text-cyan-300 text-sm"><strong>Ethereum</strong> - Base security layer</p>
              </div>
              <div className="ml-4 border-l-2 border-cyan-500/30 h-6 animate-fade-in" style={{animationDelay: '0.25s', animationFillMode: 'both'}}></div>
              <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.35s', animationFillMode: 'both'}}>
                <div className="w-20 bg-purple-500 text-white text-center py-2 rounded-lg font-bold text-sm">Layer 2</div>
                <p className="text-cyan-300 text-sm"><strong>Polygon</strong> - Scalability layer</p>
              </div>
              <div className="ml-4 border-l-2 border-cyan-500/30 h-6 animate-fade-in" style={{animationDelay: '0.45s', animationFillMode: 'both'}}></div>
              <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.55s', animationFillMode: 'both'}}>
                <div className="w-20 bg-gradient-to-r from-cyan-500 to-green-400 text-dark-950 text-center py-2 rounded-lg font-bold text-sm">Layer 3</div>
                <p className="text-green-400 text-sm font-semibold"><strong>Ramestta</strong> - DeFi optimization</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-3 text-center animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Zap className="text-cyan-400 mx-auto mb-2" size={24} />
              <p className="text-lg font-bold text-green-400 mb-1">70,000+</p>
              <p className="text-[10px] text-cyan-300/80">TPS Capacity</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-3 text-center animate-fade-in-up" style={{animationDelay: '0.25s', animationFillMode: 'both'}}>
              <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
              <p className="text-lg font-bold text-green-400 mb-1">$0.001</p>
              <p className="text-[10px] text-cyan-300/80">Gas Fee</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-3 text-center animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <Globe className="text-purple-400 mx-auto mb-2" size={24} />
              <p className="text-lg font-bold text-green-400 mb-1">4M</p>
              <p className="text-[10px] text-cyan-300/80">Circulation</p>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-3 text-center animate-fade-in-up" style={{animationDelay: '0.35s', animationFillMode: 'both'}}>
              <TrendingUp className="text-orange-400 mx-auto mb-2" size={24} />
              <p className="text-lg font-bold text-green-400 mb-1">$50K</p>
              <p className="text-[10px] text-cyan-300/80">Price Target</p>
            </div>
          </div>
          <div className="cyber-glass border border-cyan-500/30 rounded-xl p-4 animate-fade-in-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <h4 className="text-base font-bold text-cyan-300 mb-2">RAMA vs ETH, Polygon, BSC, Tron</h4>
            <p className="text-xs text-cyan-300/80 mb-3">Lower supply + high demand from gas fees & platforms like ROPDY = potential $50,000 RAMA price in the future</p>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={12} />
                <span className="text-[11px] text-cyan-300/80">Layer 3 advantage: Speed + Security</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={12} />
                <span className="text-[11px] text-cyan-300/80">Controlled supply vs unlimited chains</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "RAMA Tokenomics",
      subtitle: "1 Billion Total Supply",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 leading-relaxed">
            RAMA has a <strong className="text-green-400">fixed supply of 1 billion (1000 million)</strong> coins, ensuring scarcity and deflationary value over time.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border-2 border-purple-500 rounded-xl p-6 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <Lock className="text-purple-400 mb-3" size={32} />
              <h3 className="text-2xl font-bold text-purple-400 mb-2">80% Locked</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-3">800 Million</p>
              <p className="text-sm text-cyan-300/80">Allocated to validator nodes for network security and sustainable rewards generation</p>
            </div>
            <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Globe className="text-green-400 mb-3" size={32} />
              <h3 className="text-2xl font-bold text-green-400 mb-2">20% Ecosystem</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-3">200 Million</p>
              <p className="text-sm text-cyan-300/80">Development, marketing, liquidity, and community growth initiatives</p>
            </div>
          </div>
          <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-5 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <h3 className="text-lg font-bold text-cyan-300 mb-3">Key Benefits</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-cyan-300/90">Fixed supply prevents inflation</span>
              </div>
              <div className="flex items-start gap-2 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-cyan-300/90">Deflationary over time</span>
              </div>
              <div className="flex items-start gap-2 animate-fade-in" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-cyan-300/90">Validator APY: 5-8.4% monthly</span>
              </div>
              <div className="flex items-start gap-2 animate-fade-in" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>
                <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-cyan-300/90">Trading on BitMart & Koinpark</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "RAMA vs Major Chains",
      subtitle: "Cross-Chain Tokenomics Comparison",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base text-cyan-300/90 leading-relaxed text-center mb-4 animate-fade-in">
            Compare RAMA's tokenomics against major blockchain networks to understand why <strong className="text-green-400">limited supply + growing demand = price appreciation</strong>
          </p>

          <div className="animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <TokenomicsComparison />
          </div>

          <div className="cyber-glass border-2 border-orange-500 rounded-xl p-4 md:p-6 mt-6 animate-slide-in-bottom" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <h4 className="text-lg md:text-xl font-bold text-orange-400 mb-3 text-center">The Scarcity Advantage</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-dark-950/50 rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-cyan-300/70 mb-1">RAMA Circulating</p>
                <p className="text-xl md:text-2xl font-bold text-green-400">4M</p>
                <p className="text-[10px] md:text-xs text-green-400/80 mt-1">0.4% of supply</p>
              </div>
              <div className="bg-dark-950/50 rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-cyan-300/70 mb-1">ETH Circulating</p>
                <p className="text-xl md:text-2xl font-bold text-cyan-400">120M+</p>
                <p className="text-[10px] md:text-xs text-red-400/80 mt-1">30x more supply</p>
              </div>
              <div className="bg-dark-950/50 rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-cyan-300/70 mb-1">Price Impact</p>
                <p className="text-xl md:text-2xl font-bold text-orange-400">30x</p>
                <p className="text-[10px] md:text-xs text-orange-400/80 mt-1">Potential multiplier</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-cyan-300/90 text-center mt-4 leading-relaxed">
              With 30x less circulating supply than Ethereum, RAMA has significant upside potential as ROPDY adoption grows and more exchanges list the token.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "How ROPDY Works",
      subtitle: "In 30 Seconds",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-6 animate-fade-in">
            A revolutionary circle-based earning system with automatic reactivation and direct wallet payouts
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-6 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 text-dark-950 font-bold text-xl">1</div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">Activate a Package</h3>
                  <p className="text-sm text-cyan-300/80">Use RAMA Coin from your Web3 wallet to activate any package ($20 to $320)</p>
                </div>
              </div>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-6 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 text-dark-950 font-bold text-xl">2</div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">Circle Opens</h3>
                  <p className="text-sm text-cyan-300/80">Your circle collects 6 payments from directs or global CP2 matching</p>
                </div>
              </div>
            </div>
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-6 animate-slide-in-left" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 text-dark-950 font-bold text-xl">3</div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">Instant Payouts</h3>
                  <p className="text-sm text-cyan-300/80">Payments #1-4 credit instantly to your wallet. Payments #5-6 held for auto-reactivation</p>
                </div>
              </div>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-6 bg-gradient-to-br from-green-400/10 to-cyan-500/10 animate-slide-in-right" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 text-dark-950 font-bold text-xl">4</div>
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">Auto Restart</h3>
                  <p className="text-sm text-cyan-300/80">Circle reopens automatically - earnings continue on loop, hands-free!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 text-center bg-gradient-to-br from-green-400/5 to-cyan-500/5 animate-slide-in-bottom" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <p className="text-base text-cyan-300 leading-relaxed">
              <strong className="text-green-400">No withdrawal button needed</strong> — earnings credit directly to your wallet!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "5 Package Levels",
      subtitle: "One-Time Entry per Package",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-4 animate-fade-in">
            All packages pay in RAMA Coin. Choose your level and start earning!
          </p>
          <div className="max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {[
              { name: 'Starter', price: '$20', payment: '$10', total: '$60', color: 'cyan' },
              { name: 'Silver', price: '$40', payment: '$20', total: '$120', color: 'gray' },
              { name: 'Gold', price: '$80', payment: '$40', total: '$240', color: 'yellow' },
              { name: 'Platinum', price: '$160', payment: '$80', total: '$480', color: 'purple' },
              { name: 'Diamond', price: '$320', payment: '$160', total: '$960', color: 'blue' }
            ].map((pkg, index) => (
              <div key={pkg.name} className={`cyber-glass border-2 rounded-xl p-5 ${index === 4 ? 'border-green-400 bg-gradient-to-br from-green-400/10 to-cyan-500/10' : 'border-cyan-500/30'} animate-slide-in-left`} style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${pkg.color}-500 to-${pkg.color}-400 flex items-center justify-center`}>
                      <CircleDollarSign className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${index === 4 ? 'text-green-400' : 'text-cyan-300'}`}>{pkg.name}</h3>
                      <p className="text-sm text-cyan-300/70">One-time activation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${index === 4 ? 'text-green-400' : 'text-cyan-400'}`}>{pkg.price}</p>
                    <p className="text-xs text-cyan-300/70">Package price</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="cyber-glass border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm text-cyan-300/70 mb-1">Per Payment</p>
                    <p className="text-lg font-bold text-green-400">{pkg.payment}</p>
                  </div>
                  <div className="cyber-glass border border-cyan-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm text-cyan-300/70 mb-1">Total (6 pays)</p>
                    <p className="text-lg font-bold text-green-400">{pkg.total}</p>
                  </div>
                  <div className="cyber-glass border border-green-400/30 rounded-lg p-3 text-center">
                    <p className="text-sm text-cyan-300/70 mb-1">Multiplier</p>
                    <p className="text-lg font-bold text-green-400">3x</p>
                  </div>
                </div>
                <p className="text-xs text-cyan-300/70 mt-3 text-center">
                  <Repeat className="inline mr-1" size={14} />
                  Payments #5 & #6 auto-reactivate this package
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Payment Split: CP1 & CP2",
      subtitle: "50/50 Distribution System",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-6 animate-fade-in">
            Every package activation splits 50/50 between direct sponsor and global distribution
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 bg-gradient-to-br from-green-400/10 to-cyan-500/10 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  50%
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400">CP1</h3>
                  <p className="text-sm text-cyan-300/80">Sponsor Bonus</p>
                </div>
              </div>
              <p className="text-sm text-cyan-300/90 mb-4">
                Goes directly to your sponsor/upline when you activate a package
              </p>
              <div className="cyber-glass border border-green-400/30 rounded-lg p-4">
                <p className="text-xs text-cyan-300/80 mb-2">Example: $20 Starter Package</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-cyan-300">Your sponsor gets:</span>
                  <span className="text-xl font-bold text-green-400">$10</span>
                </div>
              </div>
            </div>
            <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-6 animate-slide-in-right" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  50%
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">CP2</h3>
                  <p className="text-sm text-cyan-300/80">Global Bonus</p>
                </div>
              </div>
              <p className="text-sm text-cyan-300/90 mb-4">
                Distributed by the MOD algorithm to qualified members globally
              </p>
              <div className="space-y-2">
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-2 flex justify-between">
                  <span className="text-xs text-cyan-300">MOD1 (Every 3rd)</span>
                  <span className="text-xs text-green-400">→ 2nd upline</span>
                </div>
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-2 flex justify-between">
                  <span className="text-xs text-cyan-300">MOD2 (Every 5th)</span>
                  <span className="text-xs text-green-400">→ 3rd upline</span>
                </div>
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-2 flex justify-between">
                  <span className="text-xs text-cyan-300">MOD3 (Every 8th)</span>
                  <span className="text-xs text-green-400">→ Reward pool</span>
                </div>
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-2 flex justify-between">
                  <span className="text-xs text-cyan-300">MOD4 (Others)</span>
                  <span className="text-xs text-green-400">→ Fair queue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Circle Flow",
      subtitle: "6 Payments Per Circle",
      content: (
        <div className="space-y-6">
          <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-6 bg-gradient-to-br from-cyan-500/5 to-green-400/5">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">How Your Circle Completes</h3>
            <div className="space-y-4">
              <div className="cyber-glass border border-green-400/30 rounded-lg p-4 animate-slide-in-left" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-400 text-dark-950 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Circle Receives 6 Payments</h4>
                    <p className="text-sm text-cyan-300/80">From your directs or global CP2 distribution</p>
                  </div>
                </div>
              </div>
              <div className="cyber-glass border border-cyan-500/30 rounded-lg p-4 animate-slide-in-left" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-400 text-dark-950 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Payments #1-4 → Your Wallet</h4>
                    <p className="text-sm text-cyan-300/80">Credited instantly in RAMA Coin (no withdrawal needed!)</p>
                  </div>
                </div>
              </div>
              <div className="cyber-glass border border-purple-500/30 rounded-lg p-4 animate-slide-in-left" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-400 text-dark-950 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Payments #5-6 → Reserved</h4>
                    <p className="text-sm text-cyan-300/80">Held by contract for automatic package reactivation</p>
                  </div>
                </div>
              </div>
              <div className="cyber-glass border border-green-400/30 rounded-lg p-4 bg-gradient-to-br from-green-400/10 to-cyan-500/10 animate-slide-in-left" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-400 text-dark-950 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-green-400 mb-1">New Circle Opens Automatically</h4>
                    <p className="text-sm text-cyan-300/80">Earnings continue on loop — completely hands-free!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-4">
              <h4 className="text-base font-bold text-cyan-300 mb-3">Payment Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300/80">Payment 1-4:</span>
                  <span className="text-green-400 font-bold">→ Your Wallet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300/80">Payment 5-6:</span>
                  <span className="text-purple-400 font-bold">→ Reactivation</span>
                </div>
                <div className="border-t border-cyan-500/30 pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-semibold">Net per circle:</span>
                    <span className="text-green-400 font-bold">4 payments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-4">
              <h4 className="text-base font-bold text-green-400 mb-3">Example: Starter Package</h4>
              <div className="space-y-2 text-sm">
                <p className="text-cyan-300/90">Package: $20 ($10 per payment)</p>
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-3 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-cyan-300">4 payments:</span>
                    <span className="text-green-400 font-bold">$40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Auto-reactivation:</span>
                    <span className="text-purple-400 font-bold">$20</span>
                  </div>
                  <div className="flex justify-between border-t border-cyan-500/30 pt-1">
                    <span className="text-green-400 font-semibold">Profit per cycle:</span>
                    <span className="text-green-400 font-bold text-lg">$20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Power of 10 Directs",
      subtitle: "CP1 Sponsor Bonus Potential",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-6 animate-fade-in">
            If you activate all 5 packages and refer 10 users who do the same, your CP1 earnings are:
          </p>
          <div className="space-y-3 max-h-[45vh] overflow-y-auto custom-scrollbar pr-2">
            {[
              { name: 'Starter', amount: '$100', desc: 'from 10 directs', color: 'cyan' },
              { name: 'Silver', amount: '$200', desc: 'from 10 directs', color: 'gray' },
              { name: 'Gold', amount: '$400', desc: 'from 10 directs', color: 'yellow' },
              { name: 'Platinum', amount: '$800', desc: 'from 10 directs', color: 'purple' },
              { name: 'Diamond', amount: '$1,600', desc: 'from 10 directs', color: 'blue' }
            ].map((item, i) => (
              <div key={item.name} className="cyber-glass border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between animate-slide-in-left" style={{animationDelay: `${i * 0.1}s`, animationFillMode: 'both'}}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-400 flex items-center justify-center`}>
                    <DollarSign className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-cyan-300">{item.name}</p>
                    <p className="text-xs text-cyan-300/70">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 bg-gradient-to-br from-green-400/10 to-cyan-500/10 text-center animate-scale-in" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <p className="text-sm text-cyan-300/70 mb-2">Total CP1 from 10 directs</p>
            <p className="text-4xl md:text-5xl font-bold text-green-400 mb-3">$3,100</p>
            <p className="text-base text-cyan-300/90">
              <strong className="text-green-400">And it repeats on every re-activation!</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Total Earning Potential",
      subtitle: "All Packages Combined",
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg text-cyan-300/90 text-center mb-6 animate-fade-in">
            Activate all 5 packages and maximize your earning potential
          </p>
          <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Investment vs Returns (Per Circle)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-cyan-500/30 animate-fade-in" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <span className="text-cyan-300/90 text-sm">Total Investment (All 5):</span>
                <span className="text-cyan-300 font-bold">$620</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyan-500/30 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <span className="text-cyan-300/90 text-sm">Total Returns (6 pays each):</span>
                <span className="text-cyan-300 font-bold">$1,860</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyan-500/30 animate-fade-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <span className="text-cyan-300/90 text-sm">You Receive (4 pays each):</span>
                <span className="text-green-400 font-bold">$1,240</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyan-500/30 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                <span className="text-cyan-300/90 text-sm">Auto-Reactivation (2 pays each):</span>
                <span className="text-purple-400 font-bold">$620</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-400/20 to-cyan-500/20 rounded-lg px-3 mt-3">
                <span className="text-cyan-300 font-bold text-lg">Net Profit Per Cycle:</span>
                <span className="text-green-400 font-bold text-2xl">$620</span>
              </div>
            </div>
            <p className="text-center text-green-400 font-bold text-xl mt-4">100% ROI Every Circle!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="cyber-glass border border-cyan-500/30 rounded-xl p-4 text-center">
              <Shield className="text-cyan-400 mx-auto mb-2" size={32} />
              <p className="text-sm text-cyan-300/70 mb-1">Smart Contract</p>
              <p className="text-lg font-bold text-cyan-300">100% Secure</p>
            </div>
            <div className="cyber-glass border border-green-400/30 rounded-xl p-4 text-center">
              <Repeat className="text-green-400 mx-auto mb-2" size={32} />
              <p className="text-sm text-cyan-300/70 mb-1">Auto Restart</p>
              <p className="text-lg font-bold text-green-400">Infinite Cycles</p>
            </div>
            <div className="cyber-glass border border-purple-500/30 rounded-xl p-4 text-center">
              <Wallet className="text-purple-400 mx-auto mb-2" size={32} />
              <p className="text-sm text-cyan-300/70 mb-1">Direct Payouts</p>
              <p className="text-lg font-bold text-purple-400">No Withdrawal</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Why Choose ROPDY?",
      subtitle: "The Complete DeFi Solution",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-glass border-2 border-cyan-500 rounded-xl p-6 animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <Shield className="text-cyan-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">100% On-Chain</h3>
              <p className="text-sm text-cyan-300/90">Smart contract powered - no admin control, fully transparent on Ramascan</p>
            </div>
            <div className="cyber-glass border-2 border-green-400 rounded-xl p-6 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Wallet className="text-green-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-green-400 mb-4">Direct Payouts</h3>
              <p className="text-sm text-cyan-300/90">Wallet-to-wallet in RAMA Coin. No withdrawal button - instant transfer!</p>
            </div>
            <div className="cyber-glass border-2 border-purple-500 rounded-xl p-6 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <Repeat className="text-purple-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Auto-Reactivation</h3>
              <p className="text-sm text-cyan-300/90">Circles restart automatically - completely hands-free passive income!</p>
            </div>
            <div className="cyber-glass border-2 border-orange-500 rounded-xl p-6 animate-fade-in-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <Zap className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Fast & Affordable</h3>
              <p className="text-sm text-cyan-300/90">Built on Ramestta - 2-second blocks, ultra-low fees</p>
            </div>
          </div>
          <div className="cyber-glass border-2 border-green-400 rounded-xl p-8 text-center bg-gradient-to-br from-green-400/10 to-cyan-500/10 animate-scale-in" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <p className="text-xl md:text-2xl text-cyan-300 leading-relaxed">
              <strong className="text-green-400">Join the revolution</strong> of truly decentralized passive income!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Get Started in 2 Minutes",
      subtitle: "Begin Your ROPDY Journey",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: 1, title: "Connect Wallet", desc: "MetaMask or Trust Wallet", icon: Wallet },
              { num: 2, title: "Register", desc: "Use sponsor referral link", icon: Users },
              { num: 3, title: "Activate", desc: "Start with $20 minimum", icon: CircleDollarSign },
              { num: 4, title: "Earn RAMA", desc: "Direct to your wallet", icon: Coins }
            ].map((step, i) => (
              <div
                key={i}
                className="cyber-glass border-2 border-cyan-500 rounded-xl p-5 text-center hover:border-green-400 transition-all animate-scale-in"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <step.icon className="text-dark-950" size={24} />
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">{step.num}</div>
                <h3 className="text-base font-bold text-cyan-300 mb-2">{step.title}</h3>
                <p className="text-xs text-cyan-300/80">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="cyber-glass border-2 border-green-400 rounded-xl p-8 text-center animate-fade-in-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-4">
              Ready to Join ROPDY?
            </h3>
            <p className="text-lg text-cyan-300/90 mb-6">
              Start earning passive RAMA Coin income with automatic circles today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://dapp.ropdy.com/', '_blank')}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-green-400 text-dark-950 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-flex items-center justify-center gap-2"
              >
                Launch DApp <ArrowRight size={20} />
              </button>
              <button
                onClick={() => window.open('https://ropdy.com/', '_blank')}
                className="px-10 py-4 cyber-glass border-2 border-cyan-500 text-cyan-300 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  const toggleFullscreen = async () => {
    const elem = containerRef.current;
    if (!elem) return;

    try {
      const isCurrentlyFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (!isCurrentlyFullscreen) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen bg-dark-950 cyber-grid-bg relative overflow-hidden flex flex-col"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-green-400/5 pointer-events-none" />

      {/* Header */}
      <div className="h-16 cyber-glass border-b border-cyan-500/30 z-50 shadow-neon-blue flex-shrink-0">
        <div className="h-full px-4 flex items-center justify-between relative w-full mx-auto" style={{maxWidth: '1600px'}}>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="/ropdy circle.png" 
              alt="ROPDY Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              ROPDY
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-cyan-300">
              Slide {currentSlide + 1} of {slides.length}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>

            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400"
              title="Exit Presentation"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8 relative z-10 flex items-center overflow-hidden">
        <div className="mx-auto w-full h-full py-4" style={{maxWidth: '1600px'}}>
          <div className="flex items-center gap-1 md:gap-4 lg:gap-8 h-full">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex-shrink-0 p-1.5 md:p-3 lg:p-4 cyber-glass border-2 border-cyan-500/30 rounded-lg md:rounded-xl hover:border-cyan-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-cyan-300 hover:shadow-neon-cyan active:scale-95"
            >
              <ChevronLeft size={18} className="md:w-7 md:h-7" />
            </button>

            {/* Content Area */}
            <div
              className="flex-1 flex flex-col h-full min-w-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{touchAction: 'pan-y'}}
            >
              <div key={currentSlide} className="cyber-glass rounded-xl md:rounded-3xl p-3 md:p-8 lg:p-12 border-2 border-cyan-500/30 flex-1 flex flex-col overflow-hidden relative">
                {/* Corner Logo */}
                <div className="absolute top-3 right-3 md:top-6 md:right-6 z-10 opacity-80 hover:opacity-100 transition-opacity">
                  <LogoCircleImage size={40} />
                </div>

                <div className="mb-2 md:mb-6 text-center flex-shrink-0">
                  <h2 className="text-base md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-0.5 md:mb-2 leading-tight animate-slide-in-top">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-[10px] md:text-base lg:text-xl text-cyan-300/90 leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
                    {slides[currentSlide].subtitle}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
                  {slides[currentSlide].content}
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-4 flex-shrink-0">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 md:h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-green-400 w-4 md:w-8'
                        : 'bg-cyan-500/30 hover:bg-cyan-500/50 w-1 md:w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex-shrink-0 p-1.5 md:p-3 lg:p-4 cyber-glass border-2 border-cyan-500/30 rounded-lg md:rounded-xl hover:border-cyan-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-cyan-300 hover:shadow-neon-cyan active:scale-95"
            >
              <ChevronRight size={18} className="md:w-7 md:h-7" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(6, 182, 212, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
}

export default RopdyPresentation;
