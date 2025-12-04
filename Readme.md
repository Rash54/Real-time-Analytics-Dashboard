# Real-time Dashboard - React Frontend

A modern, responsive React application for real-time analytics visualization. Built with React 18, Recharts, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-2.10+-8884d8)

## 🎯 Overview

This React application provides a beautiful, real-time analytics dashboard with live data updates, interactive charts, and full mobile responsiveness. It connects to a FastAPI backend via REST API and WebSocket for real-time data streaming.

## ✨ Features

- 🔄 **Real-time Updates** - Automatic data refresh every 3 seconds
- 📊 **Multiple Chart Types** - Line, Area, Bar, and Pie charts
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- 🔌 **WebSocket Support** - Live connection status indicator
- ⚡ **Performance Optimized** - Efficient state management with React hooks
- 🎯 **Type-Safe** - Clean component architecture
- 🌐 **Cross-browser Compatible** - Works on all modern browsers

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher (or **yarn** 1.22+)
- Running FastAPI backend (default: `http://localhost:8000`)

### Installation

1. **Create a new React app**
```bash
npx create-react-app dashboard-frontend
cd dashboard-frontend
```

2. **Install dependencies**
```bash
npm install recharts lucide-react
```

3. **Install Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Configure Tailwind CSS**

Create/update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. **Update `src/index.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

6. **Replace `src/App.js`** with the dashboard component code

7. **Start the development server**
```bash
npm start
```

Visit `http://localhost:3000` to see your dashboard!

## 📁 Project Structure

```
dashboard-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js                 # Main dashboard component
│   ├── index.js               # React entry point
│   ├── index.css              # Global styles with Tailwind
│   └── App.test.js            # Tests
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Component Architecture

### Main Dashboard Component

The `Dashboard` component manages all state and renders the entire interface:

```jsx
<Dashboard>
  ├── Header (Title + Connection Status)
  ├── Metric Cards (4 cards)
  │   ├── Active Users
  │   ├── Revenue
  │   ├── Conversions
  │   └── Avg Response Time
  └── Charts (4 charts in 2x2 grid)
      ├── Line Chart (Users Trend)
      ├── Pie Chart (Device Distribution)
      ├── Area Chart (Revenue Stream)
      └── Bar Chart (API Requests)
</Dashboard>
```

### State Management

```javascript
// Metrics state
const [metrics, setMetrics] = useState({
  activeUsers: 1247,
  revenue: 45280,
  conversions: 342,
  avgResponseTime: 145
});

// Time series data for charts
const [timeSeriesData, setTimeSeriesData] = useState([...]);

// Device distribution
const [deviceData, setDeviceData] = useState([...]);

// Connection status
const [isConnected, setIsConnected] = useState(true);

// Last update timestamp
const [lastUpdate, setLastUpdate] = useState(new Date());
```

## 🔧 Configuration

### Update Interval

Change the data refresh rate (default: 3000ms):

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    // Update logic
  }, 3000); // Change this value (in milliseconds)
  
  return () => clearInterval(interval);
}, []);
```

### API Endpoint

To connect to your backend, update the fetch URLs:

```javascript
// Add this at the top of your component
const API_BASE_URL = 'http://localhost:8000';

// Then use it in your fetch calls
fetch(`${API_BASE_URL}/api/metrics`)
```

### Chart Colors

Customize chart colors in the component:

```javascript
// Metric card colors
const colors = {
  users: '#3b82f6',      // Blue
  revenue: '#10b981',    // Green
  conversions: '#f59e0b', // Orange
  response: '#8b5cf6'     // Purple
};

// Device data colors
const deviceData = [
  { name: 'Desktop', value: 45, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#10b981' },
  { name: 'Tablet', value: 20, color: '#f59e0b' }
];
```

## 📱 Responsive Design

The dashboard uses Tailwind's responsive utilities:

### Breakpoints
- **Mobile (sm):** 640px
- **Tablet (md):** 768px
- **Laptop (lg):** 1024px
- **Desktop (xl):** 1280px

### Grid Layout
```javascript
// Metric cards
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Charts
className="grid grid-cols-1 lg:grid-cols-2"
```

### Text Sizes
```javascript
// Responsive text
className="text-2xl sm:text-3xl"  // Smaller on mobile, larger on desktop
```

## 📊 Available Charts

### 1. Line Chart (Active Users Trend)
```jsx
<LineChart data={timeSeriesData}>
  <Line dataKey="users" stroke="#3b82f6" />
</LineChart>
```

### 2. Area Chart (Revenue Stream)
```jsx
<AreaChart data={timeSeriesData}>
  <Area dataKey="revenue" fill="#10b981" />
</AreaChart>
```

### 3. Bar Chart (API Requests)
```jsx
<BarChart data={timeSeriesData}>
  <Bar dataKey="requests" fill="#f59e0b" />
</BarChart>
```

### 4. Pie Chart (Device Distribution)
```jsx
<PieChart>
  <Pie data={deviceData} dataKey="value" />
</PieChart>
```

## 🎯 Adding New Features

### Add a New Metric Card

```jsx
<MetricCard
  title="New Metric"
  value={metrics.newMetric}
  icon={YourIcon}  // Import from lucide-react
  trend="+10%"
  color="#ef4444"
/>
```

### Add a New Chart

```jsx
<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
    Your Chart Title
  </h3>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={yourData}>
      {/* Chart configuration */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

## 🔌 API Integration

### Connecting to Real Backend

Replace the simulated data updates with actual API calls:

```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsConnected(false);
    }
  };

  const interval = setInterval(fetchData, 3000);
  fetchData(); // Initial fetch

  return () => clearInterval(interval);
}, []);
```

### WebSocket Integration

For real-time WebSocket connection:

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8000/ws');

  ws.onopen = () => {
    console.log('Connected to WebSocket');
    setIsConnected(true);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setMetrics(data.metrics);
    setTimeSeriesData(data.timeseries);
    setLastUpdate(new Date());
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    setIsConnected(false);
  };

  ws.onclose = () => {
    console.log('Disconnected from WebSocket');
    setIsConnected(false);
  };

  return () => ws.close();
}, []);
```

## 🧪 Testing

Run tests with:

```bash
npm test
```

Create tests for your components:

```javascript
// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Real-time Analytics/i);
  expect(titleElement).toBeInTheDocument();
});
```

## 🏗️ Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain optimized files
```

### Environment Variables

Create `.env` file for different environments:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
REACT_APP_UPDATE_INTERVAL=3000
```

Use in your code:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Deploy:
```bash
npm run deploy
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## 🐛 Troubleshooting

### Charts not rendering
- Ensure `recharts` is installed
- Check that data format matches chart requirements
- Verify ResponsiveContainer has a defined height

### Tailwind styles not applying
- Verify `tailwind.config.js` content paths
- Check that Tailwind directives are in `index.css`
- Restart dev server after Tailwind config changes

### Performance issues
- Use React.memo for heavy components
- Implement virtualization for large lists
- Optimize re-renders with useMemo and useCallback

## 🎓 Learn More

- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

## 📝 Available Scripts

```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Create production build
npm run eject      # Eject from Create React App
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

Your Name
- GitHub: (https://github.com/Rash54)
- email: frashop54@gmail.com

---

**Built with ⚛️ React and 💙 Tailwind CSS**
