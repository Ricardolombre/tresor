"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineCard = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 300;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleAccept = () => {
    setIsAccepted(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <motion.div
      className="bg-white rounded-[2rem] shadow-2xl border border-rose-100 p-6 sm:p-8 text-center relative overflow-hidden"
      layout
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-rose-100 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop" 
                  alt="Toi et Moi"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-lg"
              >
                <Heart fill="currentColor" size={20} />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif text-rose-600 font-bold">
                Ma Valentine...
              </h2>
              <p className="text-rose-400 font-medium italic">
                "Tu es la plus belle chose qui me soit arrivée."
              </p>
              <p className="text-xl sm:text-2xl text-rose-800 font-bold pt-2">
                Veux-tu être ma Valentine ?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 min-h-[120px]">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 transition-all z-20 text-lg"
              >
                Oui, je le veux ! ❤️
              </motion.button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                className="bg-rose-50 text-rose-300 px-8 py-3 rounded-full font-semibold flex items-center gap-2 border border-rose-100 cursor-default"
              >
                Non 💔
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 space-y-6"
          >
            <div className="flex justify-center">
              <div className="relative">
                <Heart className="text-rose-500" size={100} fill="currentColor" />
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="absolute inset-0 text-rose-500"
                >
                  <Heart fill="currentColor" size={100} />
                </motion.div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-serif text-rose-600 font-bold">
                Merveilleux !
              </h2>
              <p className="text-rose-500 text-xl font-medium">
                Je t'aime plus que tout au monde. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ValentineCard;