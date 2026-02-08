import { Heart, Calendar, Calculator, Clock, Image, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {

  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/create-card', label: 'Love Card', icon: Sparkles },
    { path: '/planner', label: 'Week Planner', icon: Calendar },
    { path: '/calculator', label: 'Love Match', icon: Calculator },
    { path: '/countdown', label: 'Countdown', icon: Clock },
    { path: '/memories', label: 'Memories', icon: Image },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              LoveConnect
            </span>
          </motion.div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const isActive = location.pathname === tab.path;

              return (
                <Link key={tab.path} to={tab.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>


          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => window.location.href = e.target.value}
              className="px-4 py-2 rounded-lg border-2 border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {tabs.map((tab) => (
                <option key={tab.path} value={tab.path}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
