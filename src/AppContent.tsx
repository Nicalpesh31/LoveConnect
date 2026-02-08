import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CardGenerator from "./components/CardGenerator";
import ValentineWeekPlanner from "./components/ValentineWeekPlanner";
import LoveCalculator from "./components/LoveCalculator";
import CountdownTimer from "./components/CountdownTimer";
import MemoriesGallery from "./components/MemoriesGallery";
import ViewCard from "./components/ViewCard";

function AppContent() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("home");

  // Hide navbar when someone opens shared card
  const hideNav = location.pathname.startsWith("/card/");

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNav && <Navigation />}

      <Routes>
        <Route path="/" element={<Home setActiveTab={setActiveTab} />} />
        <Route path="/create-card" element={<CardGenerator />} />
        <Route path="/planner" element={<ValentineWeekPlanner />} />
        <Route path="/calculator" element={<LoveCalculator />} />
        <Route path="/countdown" element={<CountdownTimer />} />
        <Route path="/memories" element={<MemoriesGallery />} />

        {/* MOST IMPORTANT ROUTE */}
        <Route path="/card/:shareCode" element={<ViewCard />} />

        {/* Optional Professional 404 */}
        <Route path="*" element={<h1>404 - Love Not Found ❤️</h1>} />
      </Routes>
    </div>
  );
}

export default AppContent;
