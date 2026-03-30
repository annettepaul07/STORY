# Meghamalai Tea - Next.js Application

A modern web application built with Next.js 14, TypeScript, and React 18.

## Prerequisites

Before setting up this project locally, ensure you have the following installed:

### For Windows:
1. **Node.js** (version 18.17 or later)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - The installer will also install npm automatically

2. **Git** (optional but recommended)
   - Download from: https://git-scm.com/download/win
   - Choose the default options during installation

3. **Code Editor** (recommended)
   - Visual Studio Code: https://code.visualstudio.com/

### For Mac:
1. **Node.js** (version 18.17 or later)
   - **Option 1:** Download from https://nodejs.org/ (recommended for beginners)
   - **Option 2:** Using Homebrew: `brew install node`

2. **Git** (usually pre-installed)
   - Check if installed: `git --version`
   - If not installed: `brew install git`

3. **Code Editor** (recommended)
   - Visual Studio Code: https://code.visualstudio.com/

## Setup Instructions

### 1. Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd STORY

# Or download and extract the ZIP file to your desired location
```

### 2. Install Dependencies

#### Windows (Command Prompt or PowerShell):
```cmd
npm install
```

#### Mac (Terminal):
```bash
npm install
```

### 3. Run the Development Server

#### Windows:
```cmd
npm run dev
```

#### Mac:
```bash
npm run dev
```

The application will start and be available at: **http://localhost:3000**

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm run start` - Runs the production build (requires `npm run build` first)

## Project Structure

```
├── app/                    # App Router directory (Next.js 13+)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── page.module.css    # Page-specific styles
├── public/                # Static assets
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Troubleshooting

### Common Issues:

#### Port Already in Use
If you get an error that port 3000 is already in use:
- **Windows:** `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- **Mac:** `lsof -ti:3000 | xargs kill -9`

#### Node Version Issues
- Check your Node.js version: `node --version`
- Ensure it's 18.17 or later
- Update Node.js if necessary

#### Permission Errors (Mac)
If you encounter permission errors:
```bash
sudo chown -R $(whoami) ~/.npm
```

#### Clear npm Cache (Both Platforms)
```bash
npm cache clean --force
```

## Development Tips

1. **Hot Reload:** The development server supports hot reload - your changes will automatically appear in the browser
2. **TypeScript:** This project uses TypeScript for better development experience
3. **CSS Modules:** Component-specific styles use CSS Modules (`.module.css`)
4. **Global Styles:** Global styles are in `app/globals.css`

## Getting Help

- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev/
- TypeScript Documentation: https://www.typescriptlang.org/docs/

---

**Happy Coding!** 🚀
