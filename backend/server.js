import "dotenv/config";
import express from "express";

import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

import connectDB from "./config/MongoDB.js";
import paymentRouter from "./routes/payment.route.js";

import authRouter from "./routes/auth.route.js";
import scooterRouter from "./routes/scooter.route.js";
import bookingRouter from "./routes/booking.route.js";
import vehicleRouter from "./routes/vehicle.route.js";


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/scooters", scooterRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("TEJO EV Backend Running");
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });


wss.on("connection", (socket) => {
  // console.log("🔌 WebSocket client connected");

  socket.on("message", (message) => {
    try {
      const telemetry = JSON.parse(message);

      // console.log("🚗 Telemetry received:");
      // console.log(telemetry);

      // Send telemetry to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(telemetry));
        }
      });
    } catch (error) {
      console.error("Invalid telemetry data:", error.message);
    }
  });

  socket.on("close", () => {
    // console.log("🔌 WebSocket client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket running on ws://localhost:${PORT}`);
});