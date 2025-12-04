import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, DollarSign, TrendingUp, Wifi, WifiOff } from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: 1247,
    revenue: 45280,
    conversions: 342,
    avgResponseTime: 145
  });
  
  const [timeSeriesData, setTimeSeriesData] = useState([
    { time: '00:00', users: 120, revenue: 2400, requests: 450 },
    { time: '04:00', users: 89, revenue: 1800, requests: 320 },
    { time: '08:00', users: 340, revenue: 6800, requests: 890 },
    { time: '12:00', users: 520, revenue: 10400, requests: 1250 },
    { time: '16:00', users: 410, revenue: 8200, requests: 980 },
    { time: '20:00', users: 280, revenue: 5600, requests: 720 }
  ]);

  const [deviceData, setDeviceData] = useState([
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 20, color: '#f59e0b' }
  ]);

  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random variations
      setMetrics(prev => ({
        activeUsers: Math.max(800, prev.activeUsers + Math.floor(Math.random() * 40 - 20)),
        revenue: Math.max(30000, prev.revenue + Math.floor(Math.random() * 2000 - 1000)),
        conversions: Math.max(200, prev.conversions + Math.floor(Math.random() * 10 - 5)),
        avgResponseTime: Math.max(100, prev.avgResponseTime + Math.floor(Math.random() * 20 - 10))
      }));

      // Update time series data
      setTimeSeriesData(prev => {
        const newData = [...prev.slice(1)];
        const lastPoint = prev[prev.length - 1];
        const currentTime = new Date();
        const timeStr = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
        
        newData.push({
          time: timeStr,
          users: Math.max(50, lastPoint.users + Math.floor(Math.random() * 100 - 50)),
          revenue: Math.max(1000, lastPoint.revenue + Math.floor(Math.random() * 2000 - 1000)),
          requests: Math.max(200, lastPoint.requests + Math.floor(Math.random() * 200 - 100))
        });
        
        return newData;
      });

      // Update device data slightly
      setDeviceData(prev => prev.map(device => ({
        ...device,
        value: Math.max(10, device.value + Math.floor(Math.random() * 6 - 3))
      })));

      setLastUpdate(new Date());
    }, 3000); // Update every 3 seconds

    // Simulate connection status changes
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, []);

  const MetricCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2" style={{ color }}>{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className="bg-opacity-10 p-2 sm:p-3 rounded-full ml-2" style={{ backgroundColor: color }}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Real-time Analytics</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Live dashboard updates every 3 seconds</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs sm:text-sm text-green-600 font-medium">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="text-xs sm:text-sm text-red-600 font-medium">Disconnected</span>
              </>
            )}
            <span className="text-xs text-gray-400 ml-2 sm:ml-4 hidden sm:inline">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <MetricCard
            title="Active Users"
            value={metrics.activeUsers}
            icon={Users}
            trend="+12.5%"
            color="#3b82f6"
          />
          <MetricCard
            title="Revenue"
            value={`${metrics.revenue}`}
            icon={DollarSign}
            trend="+8.3%"
            color="#10b981"
          />
          <MetricCard
            title="Conversions"
            value={metrics.conversions}
            icon={TrendingUp}
            trend="+15.2%"
            color="#f59e0b"
          />
          <MetricCard
            title="Avg Response (ms)"
            value={metrics.avgResponseTime}
            icon={Activity}
            trend="-5.4%"
            color="#8b5cf6"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Line Chart - Users Over Time */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Active Users Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Device Distribution */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Device Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '12px' }}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Area Chart - Revenue */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Revenue Stream</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="Revenue ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - API Requests */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">API Requests</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar 
                  dataKey="requests" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]}
                  name="Requests"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;