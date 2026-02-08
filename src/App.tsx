// import { useState } from 'react';
// import Navigation from './components/Navigation';
// import Home from './components/Home';
// import CardGenerator from './components/CardGenerator';
// import ValentineWeekPlanner from './components/ValentineWeekPlanner';
// import LoveCalculator from './components/LoveCalculator';
// import CountdownTimer from './components/CountdownTimer';
// import MemoriesGallery from './components/MemoriesGallery';
// import ViewCard from './components/ViewCard';

// function App() {
//   const [activeTab, setActiveTab] = useState('home');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'home':
//         return <Home setActiveTab={setActiveTab} />;
//       case 'card':
//         return <CardGenerator />;
//       case 'planner':
//         return <ValentineWeekPlanner />;
//       case 'calculator':
//         return <LoveCalculator />;
//       case 'countdown':
//         return <CountdownTimer />;
//       case 'memories':
//         return <MemoriesGallery />;
//       case 'view':
//         return <ViewCard />; 
//       default:
//         return <Home setActiveTab={setActiveTab} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
//       {renderContent()}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
