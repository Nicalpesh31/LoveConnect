import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isValentine, setIsValentine] = useState(false);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let valentineDay = new Date(currentYear, 1, 14, 0, 0, 0);

    if (now > valentineDay) {
      valentineDay = new Date(currentYear + 1, 1, 14, 0, 0, 0);
    }

    const todayValentine = new Date(currentYear, 1, 14);
    if (
      now.getDate() === todayValentine.getDate() &&
      now.getMonth() === todayValentine.getMonth() &&
      now.getFullYear() === todayValentine.getFullYear()
    ) {
      setIsValentine(true);
    }

    const difference = valentineDay.getTime() - now.getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-rose-500 to-pink-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-pink-500 to-fuchsia-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-fuchsia-500 to-purple-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-purple-500 to-indigo-500' },
  ];

  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 4,
    x: Math.random() * 100,
    size: 20 + Math.random() * 30,
  }));

  if (isValentine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 flex items-center justify-center px-4 relative overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-white opacity-30"
            initial={{ y: '100vh', x: `${heart.x}vw`, scale: 0 }}
            animate={{
              y: '-10vh',
              x: `${heart.x + Math.sin(heart.id) * 15}vw`,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ fontSize: `${heart.size}px` }}
          >
            ❤️
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-32 h-32 mx-auto mb-8 fill-white" />
          </motion.div>

          <h1 className="text-7xl font-bold mb-6">
            Happy Valentine's Day! 💕
          </h1>
          <p className="text-3xl mb-4">
            Wishing you a day filled with love and joy!
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl"
          >
            ❤️ 💖 💝 💕
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 px-4 relative overflow-hidden">
      {floatingHearts.slice(0, 10).map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-200 opacity-20"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Clock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Valentine's Day Countdown
          </h2>
          <p className="text-gray-600 text-lg">Time until the most romantic day of the year!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    scale: unit.label === 'Seconds' ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: unit.label === 'Seconds' ? Infinity : 0,
                  }}
                  className={`bg-gradient-to-br ${unit.color} rounded-2xl p-6 md:p-8 shadow-xl mb-4`}
                >
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                </motion.div>
                <div className="text-xl font-semibold text-gray-700">{unit.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <Sparkles className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Plan Ahead</h3>
            <p className="text-gray-600">
              Use our Valentine Week Planner to prepare special surprises!
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3 fill-pink-500" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Create Cards</h3>
            <p className="text-gray-600">
              Design beautiful love cards to express your feelings!
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <Clock className="w-10 h-10 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Make It Special</h3>
            <p className="text-gray-600">
              Every moment counts! Plan something memorable together.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block text-6xl mb-4"
          >
            💝
          </motion.div>
          <p className="text-gray-600 text-lg font-medium">
            Love is in the air! Make every day count.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;
