from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import asyncio
import random
import json
from datetime import datetime

app = FastAPI(title="Real-time Dashboard API")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Metrics(BaseModel):
    activeUsers: int
    revenue: int
    conversions: int
    avgResponseTime: int

class TimeSeriesPoint(BaseModel):
    time: str
    users: int
    revenue: int
    requests: int

class DeviceData(BaseModel):
    name: str
    value: int
    color: str

# In-memory data storage
current_metrics = {
    "activeUsers": 1247,
    "revenue": 45280,
    "conversions": 342,
    "avgResponseTime": 145
}

time_series_data = [
    {"time": "00:00", "users": 120, "revenue": 2400, "requests": 450},
    {"time": "04:00", "users": 89, "revenue": 1800, "requests": 320},
    {"time": "08:00", "users": 340, "revenue": 6800, "requests": 890},
    {"time": "12:00", "users": 520, "revenue": 10400, "requests": 1250},
    {"time": "16:00", "users": 410, "revenue": 8200, "requests": 980},
    {"time": "20:00", "users": 280, "revenue": 5600, "requests": 720}
]

device_data = [
    {"name": "Desktop", "value": 45, "color": "#3b82f6"},
    {"name": "Mobile", "value": 35, "color": "#10b981"},
    {"name": "Tablet", "value": 20, "color": "#f59e0b"}
]

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

# REST API Endpoints
@app.get("/")
async def root():
    return {"message": "Real-time Dashboard API", "version": "1.0.0"}

@app.get("/api/metrics")
async def get_metrics():
    return current_metrics

@app.get("/api/timeseries")
async def get_timeseries():
    return time_series_data

@app.get("/api/devices")
async def get_devices():
    return device_data

@app.post("/api/metrics/update")
async def update_metrics(metrics: Metrics):
    global current_metrics
    current_metrics = metrics.dict()
    await manager.broadcast({
        "type": "metrics",
        "data": current_metrics
    })
    return {"status": "success", "data": current_metrics}

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Send initial data
            await websocket.send_json({
                "type": "initial",
                "metrics": current_metrics,
                "timeseries": time_series_data,
                "devices": device_data
            })
            
            # Wait for 3 seconds
            await asyncio.sleep(3)
            
            # Generate and send updated data
            updated_data = generate_random_updates()
            await websocket.send_json(updated_data)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)

def generate_random_updates():
    """Generate random data updates for real-time simulation"""
    global current_metrics, time_series_data, device_data
    
    # Update metrics
    current_metrics["activeUsers"] = max(800, current_metrics["activeUsers"] + random.randint(-20, 40))
    current_metrics["revenue"] = max(30000, current_metrics["revenue"] + random.randint(-1000, 2000))
    current_metrics["conversions"] = max(200, current_metrics["conversions"] + random.randint(-5, 10))
    current_metrics["avgResponseTime"] = max(100, current_metrics["avgResponseTime"] + random.randint(-10, 20))
    
    # Update time series
    last_point = time_series_data[-1]
    current_time = datetime.now().strftime("%H:%M")
    new_point = {
        "time": current_time,
        "users": max(50, last_point["users"] + random.randint(-50, 100)),
        "revenue": max(1000, last_point["revenue"] + random.randint(-1000, 2000)),
        "requests": max(200, last_point["requests"] + random.randint(-100, 200))
    }
    time_series_data = time_series_data[1:] + [new_point]
    
    # Update device data
    device_data = [
        {**device, "value": max(10, device["value"] + random.randint(-3, 6))}
        for device in device_data
    ]
    
    return {
        "type": "update",
        "metrics": current_metrics,
        "timeseries": time_series_data,
        "devices": device_data,
        "timestamp": datetime.now().isoformat()
    }

# Background task to broadcast updates
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_updates())

async def broadcast_updates():
    """Broadcast updates to all connected WebSocket clients"""
    while True:
        await asyncio.sleep(3)
        updated_data = generate_random_updates()
        await manager.broadcast(updated_data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
#YUSUF
