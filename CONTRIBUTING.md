# Contributing to ROPDY Live Dashboard

Thank you for your interest in contributing to ROPDY! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, wallet)

### Suggesting Features

We welcome feature suggestions! Please:
- Check if the feature already exists or is planned
- Describe the feature and its benefits
- Provide use cases
- Consider implementation complexity

### Code Contributions

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/ROPDY-Live_Dashboard.git
   cd ROPDY-Live_Dashboard
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Write clean, readable code
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature" 
   # or
   git commit -m "fix: resolve bug in component"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly
   - Link any related issues

## 📝 Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add wallet balance display
fix: resolve MetaMask connection issue
docs: update installation instructions
style: format sidebar component
refactor: optimize circle calculation logic
```

## 💻 Development Guidelines

### Code Style

- Use **functional components** and **hooks**
- Follow **React best practices**
- Use **TailwindCSS** for styling (no inline styles)
- Keep components **small and focused**
- Use **meaningful variable names**
- Add **PropTypes** or **TypeScript** for type safety

### Component Structure

```jsx
import { useState, useEffect } from 'react';
import { ComponentIcon } from 'lucide-react';

function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  const handleAction = () => {
    // Event handlers
  };

  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}

export default MyComponent;
```

### File Naming

- Components: `PascalCase.jsx` (e.g., `Dashboard.jsx`)
- Utilities: `camelCase.js` (e.g., `helpers.js`)
- Styles: `kebab-case.css` (e.g., `index.css`)

### Folder Structure

- `/src/components/` - Reusable UI components
- `/src/pages/` - Page components
- `/src/utils/` - Helper functions
- `/src/config/` - Configuration files
- `/src/contexts/` - React contexts
- `/src/Store/` - State management

## 🧪 Testing

Before submitting:

1. **Test Locally**
   ```bash
   npm run dev
   ```

2. **Build Successfully**
   ```bash
   npm run build
   ```

3. **Lint Your Code**
   ```bash
   npm run lint
   ```

4. **Test on Different Devices**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS, Android)
   - Tablet

5. **Test Web3 Features**
   - Wallet connection
   - Network switching
   - Transaction signing
   - Contract interactions

## 🔒 Security

- Never commit private keys or sensitive data
- Use environment variables for configuration
- Sanitize user inputs
- Follow Web3 security best practices
- Report security issues privately to security@ropdy.com

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] Build completes without errors
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] Web3 features tested with MetaMask
- [ ] Updated documentation if needed
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete

## 🎯 Priority Areas

We especially welcome contributions in:

- 🌐 **Internationalization** - Multi-language support
- 📱 **Mobile Optimization** - Better mobile UX
- ♿ **Accessibility** - ARIA labels, keyboard navigation
- 🧪 **Testing** - Unit tests, integration tests
- 📊 **Analytics** - Better data visualization
- 🎨 **UI/UX** - Design improvements
- 📖 **Documentation** - Tutorials, guides, examples

## 💬 Questions?

- **Telegram**: https://t.me/ropdy
- **Discord**: https://discord.gg/ropdy
- **Email**: dev@ropdy.com
- **GitHub Discussions**: Use the Discussions tab

## 🙏 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Invited to contributor chat
- Eligible for RAMA rewards (for significant contributions)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub's Community Guidelines

## 🎉 Thank You!

Every contribution, no matter how small, helps make ROPDY better!

**Happy Coding! 🌊**
