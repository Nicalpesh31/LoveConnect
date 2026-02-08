import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Plus, Trash2, Heart, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Memory } from '../types';

const MemoriesGallery = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [memoryDate, setMemoryDate] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('memory_date', { ascending: false });

    if (error) {
      console.error('Error fetching memories:', error);
    } else {
      setMemories(data || []);
    }
    setLoading(false);
  };

  const handleSaveMemory = async () => {
    if (!title || !description || !memoryDate) {
      alert('Please fill in all required fields!');
      return;
    }

    const { error } = await supabase.from('memories').insert({
      title,
      description,
      photo_url: photoUrl || null,
      memory_date: memoryDate,
    });

    if (error) {
      console.error('Error saving memory:', error);
      alert('Failed to save memory. Please try again.');
    } else {
      setTitle('');
      setDescription('');
      setPhotoUrl('');
      setMemoryDate('');
      setShowForm(false);
      fetchMemories();
    }
  };

  const handleDeleteMemory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;

    const { error } = await supabase.from('memories').delete().eq('id', id);

    if (error) {
      console.error('Error deleting memory:', error);
      alert('Failed to delete memory. Please try again.');
    } else {
      fetchMemories();
      setSelectedMemory(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Image className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Memories</h2>
          <p className="text-gray-600">Save and cherish your special moments together</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="mb-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          Add New Memory
        </motion.button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Memory</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Memory Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Our first date..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell the story of this special moment..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photo URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={memoryDate}
                      onChange={(e) => setMemoryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveMemory}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Save Memory
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Heart className="w-12 h-12 text-rose-500" />
            </motion.div>
            <p className="text-gray-600 mt-4">Loading memories...</p>
          </div>
        ) : memories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <Image className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No memories yet</h3>
            <p className="text-gray-500 mb-6">Start creating beautiful memories together!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              Create First Memory
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedMemory(memory)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                {memory.photo_url ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={memory.photo_url}
                      alt={memory.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-white fill-white opacity-50" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{memory.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(memory.memory_date)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden"
              >
                {selectedMemory.photo_url && (
                  <div className="h-64 md:h-96 overflow-hidden">
                    <img
                      src={selectedMemory.photo_url}
                      alt={selectedMemory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">{selectedMemory.title}</h3>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="w-5 h-5 mr-2" />
                    {formatDate(selectedMemory.memory_date)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedMemory.description}</p>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteMemory(selectedMemory.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMemory(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoriesGallery;
