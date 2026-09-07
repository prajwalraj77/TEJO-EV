import React, { useEffect, useState } from "react";

function VehicleDashboard() {
  const [vehicle, setVehicle] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [telemetryHistory, setTelemetryHistory] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("wss://tejo-ev.onrender.com");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnectionStatus("Connected");
    };

    socket.onmessage = (event) => {
      try {
        const telemetry = JSON.parse(event.data);

        // Ignore the initial WebSocket connection message
        if (!telemetry.vehicleId) {
          return;
        }

        console.log("Telemetry received:", telemetry);

        setVehicle(telemetry);
        setLastUpdated(new Date());

        // Keep the latest 20 readings
        setTelemetryHistory((previous) => [
          ...previous.slice(-19),
          {
            speed: telemetry.speed,
            battery: telemetry.batteryLevel,
            temperature: telemetry.temperature,
          },
        ]);
      } catch (error) {
        console.error("Invalid WebSocket data:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Connection error");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("Disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const getBatteryColor = () => {
    if (!vehicle) return "bg-gray-400";

    if (vehicle.batteryLevel <= 20) {
      return "bg-red-500";
    }

    if (vehicle.batteryLevel <= 50) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  const getTemperatureStatus = () => {
    if (!vehicle) return "Normal";

    if (vehicle.temperature >= 35) {
      return "High Temperature";
    }

    return "Normal";
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Waiting for data...";

    return lastUpdated.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-green-600">
              TEJO EV Monitoring
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
              Live Vehicle Dashboard
            </h1>

            {vehicle && (
              <p className="mt-2 text-gray-500">
                Vehicle ID:{" "}
                <span className="font-semibold text-gray-800">
                  {vehicle.vehicleId}
                </span>
              </p>
            )}
          </div>

          {/* Connection status */}
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm">
            <span
              className={`h-3 w-3 rounded-full ${
                connectionStatus === "Connected"
                  ? "animate-pulse bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>

            <span className="text-sm font-semibold text-gray-700">
              {connectionStatus}
            </span>
          </div>
        </div>

        {!vehicle ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>

              <p className="text-lg font-semibold text-gray-700">
                Waiting for vehicle telemetry...
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Connecting to the TEJO EV vehicle
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Main telemetry cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* Battery */}
              <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Battery
                  </p>

                  <span className="text-2xl">🔋</span>
                </div>

                <div className="mt-5">
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-bold text-gray-900">
                      {vehicle.batteryLevel}%
                    </p>

                    <p className="text-sm text-gray-400">
                      Battery Level
                    </p>
                  </div>

                  {/* Battery progress */}
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBatteryColor()}`}
                      style={{
                        width: `${vehicle.batteryLevel}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    {vehicle.batteryLevel <= 20
                      ? "⚠️ Low battery"
                      : "Battery level is healthy"}
                  </p>
                </div>
              </div>

              {/* Speed */}
              <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Speed
                  </p>

                  <span className="text-2xl">🏍️</span>
                </div>

                <div className="mt-5">
                  <p className="text-4xl font-bold text-gray-900">
                    {vehicle.speed}
                    <span className="ml-1 text-lg font-medium text-gray-400">
                      km/h
                    </span>
                  </p>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          (vehicle.speed / 50) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    Current vehicle speed
                  </p>
                </div>
              </div>

              {/* Temperature */}
              <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Temperature
                  </p>

                  <span className="text-2xl">🌡️</span>
                </div>

                <div className="mt-5">
                  <p className="text-4xl font-bold text-gray-900">
                    {vehicle.temperature}
                    <span className="ml-1 text-lg font-medium text-gray-400">
                      °C
                    </span>
                  </p>

                  <div
                    className={`mt-5 rounded-lg px-3 py-2 text-sm font-semibold ${
                      vehicle.temperature >= 35
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {getTemperatureStatus()}
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    Motor / battery temperature
                  </p>
                </div>
              </div>

              {/* Vehicle status */}
              <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Vehicle Status
                  </p>

                  <span className="text-2xl">🚗</span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

                      <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>

                    <p className="text-2xl font-bold capitalize text-gray-900">
                      {vehicle.status}
                    </p>
                  </div>

                  <p className="mt-6 text-sm text-gray-500">
                    Vehicle is transmitting live telemetry
                  </p>
                </div>
              </div>
            </div>

            {/* Location + Last Updated */}
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

              {/* Location */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                      GPS Location
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      Current Vehicle Location
                    </h2>
                  </div>

                  <span className="text-3xl">📍</span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-400">
                      Latitude
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-800">
                      {vehicle.latitude.toFixed(6)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-400">
                      Longitude
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-800">
                      {vehicle.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-700">
                    ● GPS signal active
                  </p>

                  <p className="mt-1 text-sm text-green-600">
                    Location is being updated in real time.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Telemetry
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Live Data Connection
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <span className="text-gray-500">
                      Connection
                    </span>

                    <span className="font-semibold text-green-600">
                      WebSocket
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <span className="text-gray-500">
                      Last Updated
                    </span>

                    <span className="font-semibold text-gray-800">
                      {formatLastUpdated()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <span className="text-gray-500">
                      Readings Received
                    </span>

                    <span className="font-semibold text-gray-800">
                      {telemetryHistory.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Telemetry History */}
            <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                    Live Monitoring
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    Recent Telemetry
                  </h2>
                </div>

                <span className="text-sm text-gray-400">
                  Last {telemetryHistory.length} readings
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[500px]">
                  <div className="grid grid-cols-3 border-b pb-3 text-sm font-semibold text-gray-400">
                    <span>Reading</span>
                    <span>Speed</span>
                    <span>Battery</span>
                  </div>

                  {telemetryHistory
                    .slice()
                    .reverse()
                    .slice(0, 8)
                    .map((reading, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 border-b py-3 text-sm transition hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-500">
                          #{telemetryHistory.length - index}
                        </span>

                        <span className="font-semibold text-gray-800">
                          {reading.speed} km/h
                        </span>

                        <span className="font-semibold text-gray-800">
                          {reading.battery}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleDashboard;