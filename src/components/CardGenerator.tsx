import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Share2, Upload, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase';

const CardGenerator = () => {
  const [partnerName, setPartnerName] = useState('');
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState<'romantic' | 'modern' | 'classic' | 'playful'>('romantic');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const themes = {
    romantic: {
      bg: 'bg-gradient-to-br from-rose-400 via-pink-400 to-red-400',
      text: 'text-white',
      border: 'border-rose-300',
      pattern: '❤️',
    },
    modern: {
      bg: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900',
      text: 'text-white',
      border: 'border-slate-600',
      pattern: '✨',
    },
    classic: {
      bg: 'bg-gradient-to-br from-amber-100 via-orange-100 to-red-100',
      text: 'text-gray-800',
      border: 'border-amber-300',
      pattern: '🌹',
    },
    playful: {
      bg: 'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400',
      text: 'text-white',
      border: 'border-purple-300',
      pattern: '💕',
    },
  };

  const generateShareCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCreateCard = async () => {
    if (!partnerName || !message) {
      alert('Please fill in all required fields!');
      return;
    }

    const code = generateShareCode();
    setShareCode(code);
    setShowCard(true);

    try {
      await supabase.from('love_cards').insert({
        partner_name: partnerName,
        message: message,
        theme: theme,
        photo_url: photoUrl || null,
        share_code: code,
      });
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDownload = async () => {
  if (!cardRef.current) return;

  const canvas = await html2canvas(cardRef.current, {
    scale: 3,              // better quality
    useCORS: true,         // ⭐ VERY IMPORTANT
    backgroundColor: null,
  });

  const link = document.createElement('a');
  link.download = `love-card-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};


  const handleShare = async () => {
  const shareUrl = `${window.location.origin}/card/${shareCode}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "LoveConnect Card ❤️",
        text: "Check out this love card I made for you!",
        url: shareUrl,
      });
    } catch (err) {
      console.log("Share cancelled");
    }
  } else {
    // fallback for desktop
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Digital Love Card Generator</h2>
          <p className="text-gray-600">Create a beautiful card for your loved one</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-5 md:p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Card Details</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Partner's Name *
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter your partner's name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your heartfelt message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(themes).map((t) => (
                    <motion.button
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTheme(t as typeof theme)}
                      className={`px-4 py-3 rounded-lg font-semibold capitalize transition-all ${theme === t
                        ? 'bg-rose-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo URL (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setUploading(true);
                        const fileExt = file.name.split('.').pop();
                        const fileName = `${Date.now()}.${fileExt}`;
                        const filePath = `${fileName}`;

                        const { error: uploadError } = await supabase.storage
                          .from('photos')
                          .upload(filePath, file, {
                            cacheControl: '3600',
                            upsert: true,
                          });


                        if (uploadError) {
                          console.error('Upload error:', uploadError);
                          alert(uploadError.message);
                          console.error(uploadError);
                          return;
                        }

                        const { data: publicData } = supabase.storage.from('photos').getPublicUrl(filePath);
                        const publicUrl = (publicData as any)?.publicUrl ?? (publicData as any)?.publicURL;
                        if (publicUrl) setPhotoUrl(publicUrl);
                      } catch (err) {
                        console.error('Upload exception:', err);
                        alert('Failed to upload image.');
                      } finally {
                        setUploading(false);
                        // reset the input so same file can be selected again if needed
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="
                                flex-shrink-0 h-[48px] px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2
                                whitespace-nowrap
                              "
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                    {uploading ? '' : ''}
                  </button>

                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateCard}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Create Card ❤️
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start justify-center"

          >
            {showCard ? (
              <div className="space-y-4 w-full">
                <div
                  ref={cardRef}
                  className={`${themes[theme].bg} ${themes[theme].text} 
rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden 
w-full max-w-md mx-auto`}

                >
                  <div className="absolute inset-0 opacity-10 text-6xl flex flex-wrap">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <span key={i} className="p-2">
                        {themes[theme].pattern}
                      </span>
                    ))}
                  </div>

                  <div className="relative z-10">
                    {photoUrl && (
                      <div className="mb-6">
                        <img
                          src={photoUrl}
                          crossOrigin="anonymous" 
                          alt="Love"
                          className="
w-40 h-40 md:w-48 md:h-48
rounded-full
mx-auto
object-cover
object-center
border-4 border-white
shadow-xl
"

                        />
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <Heart className="w-16 h-16 mx-auto mb-4 fill-current" />
                      <h3 className="text-3xl font-bold mb-2">To My Beloved</h3>
                      <p className="text-2xl font-semibold">{partnerName}</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
                      <p className="text-lg leading-relaxed text-center">{message}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm opacity-80">Created with love on LoveConnect</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="flex-1 bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
                <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your card preview will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
