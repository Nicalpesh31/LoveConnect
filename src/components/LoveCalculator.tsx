import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Heart, Sparkles, Zap } from 'lucide-react';

const LoveCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateLovePercentage = (n1: string, n2: string): number => {
    const combined = (n1 + n2).toLowerCase().replace(/\s/g, '');

    const charCount: { [key: string]: number } = {};
    for (const char of combined) {
      charCount[char] = (charCount[char] || 0) + 1;
    }

    const uniqueChars = Object.keys(charCount).length;
    const totalChars = combined.length;
    const commonChars = totalChars - uniqueChars;

    const lengthFactor = Math.abs(n1.length - n2.length);
    const vowelCount = (combined.match(/[aeiou]/g) || []).length;

    let percentage = 50;
    percentage += (commonChars * 3);
    percentage -= (lengthFactor * 2);
    percentage += (vowelCount * 1.5);

    const nameHash = n1.charCodeAt(0) + n2.charCodeAt(0);
    const randomFactor = (nameHash % 30) - 15;
    percentage += randomFactor;

    return Math.max(10, Math.min(100, Math.round(percentage)));
  };

  const getResultMessage = (percentage: number) => {
    if (percentage >= 90) return { title: 'Perfect Match! 💯', message: 'You two are absolutely made for each other! A love written in the stars!', color: 'from-green-500 to-emerald-500', emoji: '🌟' };
    if (percentage >= 80) return { title: 'Excellent Match! 💕', message: 'Amazing compatibility! You complement each other perfectly!', color: 'from-green-400 to-teal-500', emoji: '💖' };
    if (percentage >= 70) return { title: 'Great Match! ❤️', message: 'Strong connection! You make a wonderful couple!', color: 'from-pink-500 to-rose-500', emoji: '💝' };
    if (percentage >= 60) return { title: 'Good Match! 💗', message: 'Nice compatibility! With effort, you can make it work beautifully!', color: 'from-pink-400 to-fuchsia-500', emoji: '💗' };
    if (percentage >= 50) return { title: 'Fair Match 💓', message: 'There\'s potential here! Focus on understanding each other better.', color: 'from-purple-400 to-pink-500', emoji: '💓' };
    if (percentage >= 40) return { title: 'Could Work 💛', message: 'It\'ll take some work, but love conquers all!', color: 'from-yellow-400 to-orange-500', emoji: '💛' };
    return { title: 'Better as Friends 😊', message: 'Maybe friendship is the better path! And that\'s wonderful too!', color: 'from-blue-400 to-cyan-500', emoji: '🤝' };
  };

  const handleCalculate = async () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names!');
      return;
    }

    setCalculating(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const percentage = calculateLovePercentage(name1, name2);
    setResult(percentage);
    setCalculating(false);
  };

  const resultData = result !== null ? getResultMessage(result) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Calculator className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Love Match Calculator</h2>
          <p className="text-gray-600">Discover your compatibility percentage!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="space-y-6 mb-8">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-lg"
              />
              <Heart className="absolute right-4 top-12 w-6 h-6 text-rose-300" />
            </div>

            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Second Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter partner's name"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-lg"
              />
              <Heart className="absolute right-4 top-12 w-6 h-6 text-pink-300" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white py-5 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculating ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                Calculating Magic...
              </span>
            ) : (
              'Calculate Love Match ❤️'
            )}
          </motion.button>

          <AnimatePresence>
            {resultData && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className={`bg-gradient-to-r ${resultData.color} rounded-2xl p-8 text-white shadow-2xl`}>
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="mb-6"
                    >
                      <div className="text-7xl mb-2">{resultData.emoji}</div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-8xl font-bold mb-2"
                      >
                        {result}%
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-3xl font-bold mb-3"
                    >
                      {resultData.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl opacity-90"
                    >
                      {resultData.message}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-6 pt-6 border-t border-white/30"
                    >
                      <p className="text-lg font-semibold">
                        {name1} 💕 {name2}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setName1('');
                    setName2('');
                    setResult(null);
                  }}
                  className="w-full mt-4 bg-white text-gray-700 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Calculate Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            <Zap className="w-4 h-4 inline mr-1" />
            Using advanced love compatibility algorithms!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveCalculator;
