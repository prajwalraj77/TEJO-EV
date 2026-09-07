import WebSocket from "ws";

const vehicle = {
  vehicleId: "TEJO-X1-001",
  batteryLevel: 100,
  speed: 0,
  temperature: 25,
  latitude: 12.9716,
  longitude: 77.5946,
  status: "offline",
};

// const socket = new WebSocket("ws://localhost:5000");
// const socket = new WebSocket("wss://tejo-ev.onrender.com");

const generateTelemetry = () => {
  vehicle.speed = Math.floor(Math.random() * 50);

  if (vehicle.speed > 0 && vehicle.batteryLevel > 0) {
    vehicle.batteryLevel -= 1;
  }

  vehicle.temperature = 25 + Math.floor(Math.random() * 10);

  vehicle.latitude += (Math.random() - 0.5) * 0.001;
  vehicle.longitude += (Math.random() - 0.5) * 0.001;

  vehicle.status = "online";

  return vehicle;
};

const connectWebSocket = () => {
  const socket = new WebSocket("wss://tejo-ev.onrender.com");

  socket.on("open", () => {
    console.log("IoT Simulator connected to WebSocket server");

    vehicle.status = "online";

    const telemetryInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        const telemetry = generateTelemetry();

        socket.send(JSON.stringify(telemetry));

        console.log("Telemetry sent:");
        console.log(telemetry);
      }
    }, 3000);

    socket.on("close", () => {
      clearInterval(telemetryInterval);

      console.log("WebSocket connection closed");
      console.log("Reconnecting in 3 seconds...");

      vehicle.status = "offline";

      setTimeout(() => {
        connectWebSocket();
      }, 3000);
    });
  });

  socket.on("error", (error) => {
    console.error("WebSocket Error:", error.message);
  });
};

connectWebSocket();