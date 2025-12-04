# Real-time Analytics Dashboard

A modern, real-time analytics dashboard built with **FastAPI** (Python) and **React** (JavaScript). Features live data updates via WebSocket, beautiful charts, and responsive design for all devices.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688)

## 🌟 Features

- ✅ **Real-time Updates** - Data refreshes every 3 seconds via WebSocket
- ✅ **Beautiful Charts** - Line, Area, Bar, and Pie charts using Recharts
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Live Metrics** - Track active users, revenue, conversions, and response times
- ✅ **Connection Status** - Visual indicator for WebSocket connection
- ✅ **REST API** - Full RESTful endpoints for data access
- ✅ **CORS Enabled** - Ready for cross-origin requests

## 📊 Dashboard Metrics

| Metric | Description |
|--------|-------------|
| **Active Users** | Current number of users online |
| **Revenue** | Real-time revenue tracking |
| **Conversions** | Number of successful conversions |
| **Avg Response Time** | API response time in milliseconds |

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 16+** and **npm**
- **pip** (Python package manager)

### Backend Setup (FastAPI)

1. **Clone the repository**
```bash
grow up hahaahh
cd dashboard-project
```

2. **Create virtual environment**
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the FastAPI server**
```bash
python main.py
```

The API will be available at: `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

### Frontend Setup (React)

1. **Create React app**
```bash
npx create-react-app dashboard-frontend
cd dashboard-frontend
```

2. **Install dependencies**
```bash
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind CSS**

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **Replace `src/App.js`** with the React dashboard component

5. **Start the development server**
```bash
npm start
```

The dashboard will open at: `http://localhost:3000`

## 📁 Project Structure

```
dashboard-project/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # React dashboard component
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔌 API Endpoints

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `GET` | `/api/metrics` | Get current metrics |
| `GET` | `/api/timeseries` | Get time series data |
| `GET` | `/api/devices` | Get device distribution |
| `POST` | `/api/metrics/update` | Update metrics |

### WebSocket Endpoint

- **URL:** `ws://localhost:8000/ws`
- **Updates:** Every 3 seconds
- **Format:** JSON

**Example WebSocket Message:**
```json
{
  "type": "update",
  "metrics": {
    "activeUsers": 1247,
    "revenue": 45280,
    "conversions": 342,
    "avgResponseTime": 145
  },
  "timestamp": "2025-12-03T10:30:45.123Z"
}
```

## 🎨 Customization

### Change Update Interval

**Backend (`main.py`):**
```python
await asyncio.sleep(3)  # Change to desired seconds
```

**Frontend (`App.js`):**
```javascript
const interval = setInterval(() => {
  // Update logic
}, 3000);  // Change to desired milliseconds
```

### Add New Metrics

1. **Update backend data model:**
```python
current_metrics = {
    "activeUsers": 1247,
    "revenue": 45280,
    "conversions": 342,
    "avgResponseTime": 145,
    "newMetric": 100  # Add your metric
}
```

2. **Add metric card in React:**
```jsx
<MetricCard
  title="New Metric"
  value={metrics.newMetric}
  icon={YourIcon}
  trend="+5%"
  color="#ef4444"
/>
```

### Change Chart Colors

```jsx
<Line stroke="#your-color-hex" />
<Bar fill="#your-color-hex" />
<Area fill="#your-color-hex" />
```

## 📱 Mobile Responsive

The dashboard is fully responsive with breakpoints:

- **Mobile:** 320px - 767px (1 column)
- **Tablet:** 768px - 1023px (2 columns)
- **Desktop:** 1024px+ (4 columns)

## 🔧 Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **WebSockets** - Real-time communication
- **Pydantic** - Data validation

### Frontend
- **React** - UI library
- **Recharts** - Chart components
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS

## 🐛 Troubleshooting

### CORS Issues
Make sure the FastAPI CORS middleware is properly configured:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### WebSocket Connection Failed
- Check if backend is running on port 8000
- Verify firewall settings
- Check browser console for errors

### Charts Not Displaying
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify data format matches chart requirements

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Data persistence with database (PostgreSQL/MongoDB)
- [ ] Export reports to PDF/CSV
- [ ] Email alerts for critical metrics
- [ ] Multiple dashboard views
- [ ] Historical data analytics
- [ ] Dark mode toggle
- [ ] Customizable time ranges

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/Rash54)
- Email: frashop54@gmail.com

## 🙏 Acknowledgments

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: frashop54@gmail.com


---
YUSUF

**Made with ❤️ using FastAPI and React**
