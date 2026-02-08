import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Calculator } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home = ({ setActiveTab }: HomeProps) => {
  const features = [
    {
      id: 'card',
      icon: Sparkles,
      title: 'Create Love Cards',
      description: 'Design beautiful digital cards with custom messages and themes',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      id: 'planner',
      icon: Calendar,
      title: 'Valentine Week',
      description: 'Plan each day of the romantic week with special activities',
      gradient: 'from-pink-500 to-fuchsia-500',
    },
    {
      id: 'calculator',
      icon: Calculator,
      title: 'Love Calculator',
      description: 'Discover your compatibility percentage with fun algorithms',
      gradient: 'from-fuchsia-500 to-purple-500',
    },
    {
      id: 'countdown',
      icon: Heart,
      title: 'Countdown Timer',
      description: 'Track the days, hours, and minutes until Valentine\'s Day',
      gradient: 'from-red-500 to-rose-500',
    },
  ];

  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    x: Math.random() * 100,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 overflow-hidden">
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300 opacity-20"
          initial={{ y: '100vh', x: `${heart.x}vw` }}
          animate={{
            y: '-10vh',
            x: `${heart.x + Math.sin(heart.id) * 10}vw`,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-6"
          >
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500 mx-auto" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            LoveConnect
          </h1>

          <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your ultimate Valentine's companion for creating magical moments and expressing love
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('card')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-rose-300 transition-shadow"
          >
            Get Started ❤️
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onClick={() => setActiveTab(feature.id)}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
