# ROPDY Live Dashboard

![ROPDY Banner](https://img.shields.io/badge/ROPDY-Circle-00d4ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Ramestta On-Chain Passive Dynamic Yield**

A revolutionary circle-based DeFi earning system built on Ramestta blockchain with automatic reactivation and direct wallet-to-wallet payouts in RAMA Coin.

---

## 🌊 About ROPDY

ROPDY is a 100% smart-contract powered, fully decentralized earning system on the Ramestta blockchain. It features:

- **5 Package Levels** - From $20 to $320
- **6 Payments Per Circle** - Automated distribution system
- **Auto-Reactivation** - Hands-free passive income
- **Direct Wallet Payouts** - No withdrawal button needed
- **CP1 & CP2 Distribution** - 50/50 split between sponsor and global pool
- **MOD Algorithm** - Fair global distribution system

---

## 🚀 Live Demo

- **DApp**: [https://dapp.ropdy.com](https://dapp.ropdy.com)
- **Website**: [https://ropdy.com](https://ropdy.com)
- **Blockchain**: Ramestta (Layer 3 on Polygon)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Blockchain Integration](#-blockchain-integration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features
- **Circle-Based Earnings**: Automated 6-payment circle system
- **Multi-Package Support**: 5 levels from Starter ($20) to Diamond ($320)
- **Smart Contract Powered**: 100% on-chain, fully transparent
- **Web3 Wallet Integration**: MetaMask, Trust Wallet, WalletConnect
- **Real-Time Dashboard**: Track circles, earnings, and team performance
- **Responsive Design**: Mobile-first, works on all devices
- **Educational Presentation**: Built-in blockchain education slides

### Payment System
- **CP1 (50%)**: Direct sponsor bonus
- **CP2 (50%)**: Global distribution via MOD algorithm
  - MOD1: Every 3rd → 2nd upline
  - MOD2: Every 5th → 3rd upline
  - MOD3: Every 8th → Reward pool
  - MOD4: Others → Fair queue

### Auto-Reactivation
- Payments #1-4 → Your wallet (instant)
- Payments #5-6 → Auto-reactivation (contract holds)
- Infinite earning cycles with zero manual intervention

---

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Vite** 5.4.21 - Build tool & dev server
- **React Router DOM** 6.14.0 - Navigation
- **TailwindCSS** 3.3.2 - Styling
- **Lucide React** 0.554.0 - Icons

### Blockchain
- **Ramestta Blockchain** - Layer 3 (built on Polygon)
- **RAMA Coin** - Native token
- **Web3 Libraries**:
  - `@reown/appkit` 1.7.3
  - `@reown/appkit-adapter-wagmi` 1.7.3
  - `wagmi` 2.15.1
  - `viem` 2.28.1
  - `web3` 4.16.0

### Additional Tools
- **Zustand** 5.0.2 - State management
- **Axios** 1.4.0 - HTTP client
- **React Hot Toast** 2.4.1 - Notifications

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MetaMask** or another Web3 wallet ([Install](https://metamask.io/))

### Check Your Versions
```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
git --version   # Any recent version
```

---

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/obidua/ROPDY-Live_Dashboard.git
cd ROPDY-Live_Dashboard
```

### Step 2: Install Dependencies

**⚠️ Important**: This project requires the `--legacy-peer-deps` flag due to Web3 library dependencies.

```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**
- The project uses multiple Web3 libraries (`wagmi`, `viem`, `web3`, `@reown/appkit`) that have overlapping peer dependencies
- Some packages require different versions of the same dependency
- The `--legacy-peer-deps` flag tells npm to ignore peer dependency conflicts and install anyway
- This is safe for this project as the libraries are compatible at runtime

### Alternative: Clean Install (if you encounter issues)

If you experience installation problems, try a clean install:

```bash
# Remove existing installations
rm -rf node_modules package-lock.json

# Fresh install with legacy peer deps
npm install --legacy-peer-deps
```

### Installation Time
- First install: ~2-5 minutes (depending on internet speed)
- Total packages: ~820 packages
- Disk space: ~350 MB

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# WalletConnect Project ID (Required)
VITE_PROJECT_ID=your_walletconnect_project_id_here

# Smart Contract Addresses (Ramestta Mainnet)
VITE_VIEW_CONTRACT_ADDRESS=0xYourViewContractAddress
VITE_ROOT_CONTRACT_ADDRESS=0xYourRootContractAddress
VITE_PRICECONV_CONTRACT_ADDRESS=0xYourPriceConvContractAddress

# Ramestta Network Configuration
VITE_CHAIN_ID=1370
VITE_CHAIN_NAME=Ramestta
VITE_RPC_URL=https://blockchain.ramestta.com
VITE_EXPLORER_URL=https://ramascan.com

# API Configuration
VITE_API_BASE_URL=https://api.ropdy.com
VITE_RAMASCAN_API=https://ramascan.com/api

# Application Metadata
VITE_APP_NAME=ROPDY
VITE_APP_DESCRIPTION=Ramestta On-Chain Passive Dynamic Yield
VITE_APP_URL=https://dapp.ropdy.com
VITE_APP_ICON=https://ropdy.com/logo.png
```

### Get WalletConnect Project ID

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in
3. Create a new project
4. Copy your Project ID
5. Paste it in your `.env` file

---

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173/
- **Network**: http://192.168.x.x:5173/ (for testing on mobile)

### Production Build

Build the optimized production bundle:

```bash
npm run build
```

Output directory: `dist/`

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## 📁 Project Structure

```
ROPDY-Live_Dashboard/
├── public/
│   └── manifest.webmanifest      # PWA manifest
├── src/
│   ├── assets/                   # Images, fonts, etc.
│   ├── components/               # React components
│   │   ├── AddressDisplay.jsx
│   │   ├── BlockchainAnimation.jsx
│   │   ├── CircleDisplay.jsx
│   │   ├── MobileHeader.jsx
│   │   ├── RamaCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── TokenomicsComparison.jsx
│   ├── config/                   # Configuration files
│   │   ├── index.js             # WalletConnect config
│   │   └── register.js          # Service worker
│   ├── contexts/                 # React contexts
│   │   └── ThemeContext.jsx
│   ├── pages/                    # Page components
│   │   ├── Circles.jsx
│   │   ├── ClaimOwnership.jsx
│   │   ├── Cp1.jsx
│   │   ├── Cp2.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Earnings.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Missed.jsx
│   │   ├── MyDirect.jsx
│   │   ├── Overview.jsx
│   │   ├── Profile.jsx
│   │   ├── Purchase.jsx
│   │   ├── Referral.jsx
│   │   ├── Register.jsx
│   │   ├── RopdyPresentation.jsx
│   │   ├── Settings.jsx
│   │   ├── Settlements.jsx
│   │   └── Support.jsx
│   ├── routes/                   # Route configuration
│   │   └── AppRoutes.jsx
│   ├── Store/                    # State management
│   │   └── UserStore.js
│   ├── utils/                    # Utility functions
│   │   ├── helpers.js
│   │   ├── helpingAnimation.jsx
│   │   └── mockData.js
│   ├── App.jsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS config
├── tailwind.config.js            # Tailwind config
├── vite.config.js                # Vite config
└── README.md                     # This file
```

---

## 🔗 Blockchain Integration

### Ramestta Network Details

| Parameter | Value |
|-----------|-------|
| Network Name | Ramestta |
| Chain ID | 1370 |
| Currency Symbol | RAMA |
| RPC URL | https://blockchain.ramestta.com |
| Explorer | https://ramascan.com |
| Layer | Layer 3 (built on Polygon) |

### Add Ramestta to MetaMask

1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter the details above
4. Click "Save"

Or use the one-click add button in the app!

### Smart Contracts

The ROPDY system uses multiple smart contracts:

- **View Contract**: Read-only data (circles, earnings, stats)
- **Root Contract**: Main logic (activations, payments, reactivations)
- **Price Converter**: RAMA/USD price calculations

All contracts are verified on [Ramascan](https://ramascan.com).

---

## 🎨 Key Features Explained

### 1. **Educational Presentation**
Navigate to `/presentation` to access:
- The Evolution of Money (7 stages)
- What is Blockchain?
- Smart Contracts Explained
- DeFi vs Traditional Finance
- Ramestta Blockchain Overview
- RAMA Tokenomics
- RAMA vs Major Chains Comparison
- How ROPDY Works
- Package Levels & Earnings
- And more!

### 2. **Circle Management**
- View all your active circles
- Track payments (1-6) for each circle
- See completion status
- Auto-reactivation notifications

### 3. **Team Dashboard**
- View direct referrals (CP1)
- Track global earnings (CP2)
- Monitor team performance
- Real-time statistics

### 4. **Multi-Package System**
| Package | Price | Per Payment | Total (6 pays) |
|---------|-------|-------------|----------------|
| Starter | $20 | $10 | $60 |
| Silver | $40 | $20 | $120 |
| Gold | $80 | $40 | $240 |
| Platinum | $160 | $80 | $480 |
| Diamond | $320 | $160 | $960 |

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Dependency Installation Fails**

**Problem**: `npm install` fails with peer dependency errors

**Solution**:
```bash
# Always use --legacy-peer-deps flag
npm install --legacy-peer-deps
```

#### 2. **Vite Build Errors**

**Problem**: Import assertion syntax errors

**Solution**: The project uses Vite 5.4.21 which supports modern import syntax. If you see errors:
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 3. **WalletConnect Not Working**

**Problem**: Wallet connection fails

**Solution**:
- Check your `VITE_PROJECT_ID` in `.env`
- Get a valid Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Restart dev server after changing `.env`

#### 4. **Blank Page After Build**

**Problem**: Production build shows blank page

**Solution**:
- Check browser console for errors
- Verify all environment variables are set
- Ensure `.env` variables start with `VITE_`

#### 5. **Network Connection Issues**

**Problem**: Can't connect to Ramestta network

**Solution**:
- Manually add Ramestta network to MetaMask
- Check RPC URL: https://blockchain.ramestta.com
- Clear MetaMask cache and retry

#### 6. **Port Already in Use**

**Problem**: Port 5173 is already in use

**Solution**:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

---

## 🔍 Development Tips

### Hot Reload
Vite provides instant hot module replacement (HMR). Changes to React components will update without full page reload.

### Browser DevTools
- React Developer Tools: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
- Redux DevTools: Not needed (using Zustand)

### Debugging Web3
```javascript
// Check wallet connection
console.log('Connected:', window.ethereum?.selectedAddress);

// Check network
console.log('Chain ID:', await window.ethereum?.request({ method: 'eth_chainId' }));

// Monitor transactions
window.ethereum?.on('accountsChanged', (accounts) => {
  console.log('Account changed:', accounts[0]);
});
```

---

## 📚 Additional Resources

### Documentation
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Wagmi Docs](https://wagmi.sh)
- [Ramestta Docs](https://docs.ramestta.com)

### ROPDY Resources
- **Website**: https://ropdy.com
- **DApp**: https://dapp.ropdy.com
- **Whitepaper**: https://ropdy.com/whitepaper.pdf
- **Telegram**: https://t.me/ropdy
- **Twitter**: https://twitter.com/ropdy

### Ramestta Resources
- **Explorer**: https://ramascan.com
- **Bridge**: https://bridge.ramestta.com
- **Faucet**: https://faucet.ramestta.com

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**ROPDY Development Team**

- **Project Lead**: [Your Name]
- **Blockchain**: Ramestta Network
- **Smart Contracts**: Verified on Ramascan

---

## 🙏 Acknowledgments

- Ramestta blockchain team for the robust Layer 3 infrastructure
- React and Vite communities for excellent tools
- WalletConnect for seamless Web3 integration
- All ROPDY community members and early adopters

---

## 📞 Support

Need help? Reach out:

- **Email**: support@ropdy.com
- **Telegram**: https://t.me/ropdy
- **Discord**: https://discord.gg/ropdy
- **GitHub Issues**: [Create an issue](https://github.com/obidua/ROPDY-Live_Dashboard/issues)

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] NFT rewards integration
- [ ] DAO governance
- [ ] Cross-chain bridge

---

**Built with ❤️ on Ramestta Blockchain**

🌊 **ROPDY** - *Ramestta On-Chain Passive Dynamic Yield*
