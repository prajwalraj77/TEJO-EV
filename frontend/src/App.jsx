import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Scooters from "./pages/Scooters";
import Auth from "./pages/Auth";
import Service from "./pages/Service";
import VehicleDashboard from "./pages/VehicleDashboard";
import ScooterDetails from "./pages/ScooterDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scooters" element={<Scooters />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/service" element={<Service />} />
        <Route path="/vehicle" element={<VehicleDashboard />} />
        <Route path="/scooters/:id" element={<ScooterDetails />} />
      

      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;