export const files = {
    'package.json': {
      file: {
        contents: `{
    "name": "vite-react-tailwind",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"
    },
    "dependencies": {
      "lucide-react": "^0.294.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@vitejs/plugin-react": "^4.2.1",
      "autoprefixer": "^10.4.16",
      "eslint": "^8.55.0",
      "eslint-plugin-react": "^7.33.2",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      "postcss": "^8.4.32",
      "tailwindcss": "^3.4.0",
      "vite": "^5.0.8"
    }
  }`
      }
    },
    'index.html': {
      file: {
        contents: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + Tailwind</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>`
      }
    },
    'vite.config.js': {
      file: {
        contents: `import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
  })`
      }
    },
    'tailwind.config.js': {
      file: {
        contents: `/** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }`
      }
    },
    'postcss.config.js': {
      file: {
        contents: `export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }`
      }
    },
    '.eslintrc.cjs': {
      file: {
        contents: `module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }`
      }
    },
    'src': {
      directory: {
        'main.jsx': {
          file: {
            contents: `import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )`
          }
        },
        'App.jsx': {
          file: {
            contents: `import { Home, Settings, User, Bell, Menu, Search } from 'lucide-react'
  
  function App() {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Menu className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
                <Home className="w-6 h-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">Dashboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
              </div>
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Your Dashboard
                  </h1>
                  <p className="text-gray-600 text-center max-w-md">
                    This template includes Vite, React, Tailwind CSS, and Lucide icons.
                    Start building your awesome application!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  export default App`
          }
        },
        'index.css': {
          file: {
            contents: `@tailwind base;
  @tailwind components;
  @tailwind utilities;`
          }
        }
      }
    }
  };


export default files;