import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Flower, Heart, Gift, MessageCircle, Users, Zap } from 'lucide-react';

const ValentineWeekPlanner = () => {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const valentineDays = [
    {
      day: 'Rose Day',
      date: 'Feb 7',
      icon: Flower,
      suggestion: 'Send a virtual rose or buy fresh roses. Red for love, yellow for friendship!',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      template: '🌹 A rose for you, my love...',
    },
    {
      day: 'Propose Day',
      date: 'Feb 8',
      icon: Heart,
      suggestion: 'Express your feelings! Write a heartfelt proposal or love letter.',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      template: '💍 Will you be mine forever?',
    },
    {
      day: 'Chocolate Day',
      date: 'Feb 9',
      icon: Gift,
      suggestion: 'Share sweet treats! Order their favorite chocolates or make homemade ones.',
      color: 'from-amber-700 to-amber-900',
      bgColor: 'bg-amber-50',
      template: '🍫 Something sweet for someone sweet!',
    },
    {
      day: 'Teddy Day',
      date: 'Feb 10',
      icon: Users,
      suggestion: 'Gift a cuddly teddy bear as a symbol of your affection and care.',
      color: 'from-orange-400 to-red-400',
      bgColor: 'bg-orange-50',
      template: '🧸 A cuddly friend to remind you of me!',
    },
    {
      day: 'Promise Day',
      date: 'Feb 11',
      icon: MessageCircle,
      suggestion: 'Make meaningful promises. Commit to your relationship goals together.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      template: '🤝 I promise to always love and cherish you...',
    },
    {
      day: 'Hug Day',
      date: 'Feb 12',
      icon: Users,
      suggestion: 'Give warm hugs! Send virtual hugs or plan to meet for a real embrace.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      template: '🤗 Sending you the warmest hug!',
    },
    {
      day: 'Kiss Day',
      date: 'Feb 13',
      icon: Heart,
      suggestion: 'Share sweet messages or plan a romantic moment together.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      template: '💋 Sealed with a kiss...',
    },
    {
      day: 'Valentine\'s Day',
      date: 'Feb 14',
      icon: Zap,
      suggestion: 'The grand finale! Plan something special - dinner, gifts, or a surprise date!',
      color: 'from-red-600 to-pink-600',
      bgColor: 'bg-red-50',
      template: '❤️ Happy Valentine\'s Day, my love!',
    },
  ];

  useEffect(() => {
    const savedCompleted = localStorage.getItem('valentineCompleted');
    const savedNotes = localStorage.getItem('valentineNotes');
    if (savedCompleted) setCompletedDays(JSON.parse(savedCompleted));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  const toggleComplete = (day: string) => {
    const newCompleted = completedDays.includes(day)
      ? completedDays.filter((d) => d !== day)
      : [...completedDays, day];
    setCompletedDays(newCompleted);
    localStorage.setItem('valentineCompleted', JSON.stringify(newCompleted));
  };

  const saveNote = (day: string, note: string) => {
    const newNotes = { ...notes, [day]: note };
    setNotes(newNotes);
    localStorage.setItem('valentineNotes', JSON.stringify(newNotes));
    setEditingDay(null);
  };

  const useTemplate = (day: string, template: string) => {
    setNotes({ ...notes, [day]: template });
    setEditingDay(day);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Calendar className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Valentine's Week Planner</h2>
          <p className="text-gray-600">Plan each special day leading up to Valentine's</p>
          <div className="mt-4 inline-block bg-white px-6 py-2 rounded-full shadow-md">
            <span className="text-sm font-semibold text-gray-700">
              {completedDays.length} of {valentineDays.length} days completed
            </span>
          </div>
        </motion.div>

        <div className="space-y-6">
          {valentineDays.map((vDay, index) => {
            const Icon = vDay.icon;
            const isCompleted = completedDays.includes(vDay.day);
            const isEditing = editingDay === vDay.day;

            return (
              <motion.div
                key={vDay.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${vDay.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 ${
                  isCompleted ? 'border-green-400' : 'border-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${vDay.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{vDay.day}</h3>
                        <p className="text-sm text-gray-600 font-semibold">{vDay.date}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleComplete(vDay.day)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-green-500 shadow-lg'
                            : 'bg-white border-2 border-gray-300'
                        }`}
                      >
                        {isCompleted && <Check className="w-6 h-6 text-white" />}
                      </motion.button>
                    </div>

                    <p className="text-gray-700 mb-4">{vDay.suggestion}</p>

                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={notes[vDay.day] || ''}
                          onChange={(e) => setNotes({ ...notes, [vDay.day]: e.target.value })}
                          placeholder="Write your plan or message..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none resize-none"
                        />
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => saveNote(vDay.day, notes[vDay.day] || '')}
                            className="px-4 py-2 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-colors"
                          >
                            Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditingDay(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : notes[vDay.day] ? (
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <p className="text-gray-700 mb-2">{notes[vDay.day]}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingDay(vDay.day)}
                          className="text-rose-500 font-semibold text-sm hover:text-rose-600 transition-colors"
                        >
                          Edit
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingDay(vDay.day)}
                          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-rose-500 transition-colors"
                        >
                          Add Plan
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => useTemplate(vDay.day, vDay.template)}
                          className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-semibold hover:bg-rose-200 transition-colors"
                        >
                          Use Template
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ValentineWeekPlanner;
