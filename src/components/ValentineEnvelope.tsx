"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ValentineEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const ValentineEnvelope: React.FC<ValentineEnvelopeProps> = ({ onOpen, isOpen, children }) => {
  return (
    <div className="relative flex items-center justify-center w-full [perspective:1000px]">
      <div 
        className="relative w-80 h-56 transition-all duration-500"
        onClick={!isOpen ? onOpen : undefined}
      >
        {/* Ombre portée */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 blur-xl rounded-full" />

        {/* Dos de l'enveloppe */}
        <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>

        {/* La Carte qui sort */}
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.9 }}
          animate={isOpen ? { 
            y: -180, 
            opacity: 1, 
            scale: 1,
            zIndex: 50 
          } : { 
            y: 0, 
            opacity: 0, 
            scale: 0.9,
            zIndex: 5
          }}
          transition={{ 
            delay: 0.4, 
            duration: 1, 
            type: "spring", 
            stiffness: 40,
            damping: 15
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[340px] sm:w-[400px]">
            {children}
          </div>
        </motion.div>

        {/* Rabat supérieur (Flap) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-rose-300 rounded-t-lg origin-top z-40 shadow-md"
          initial={false}
          animate={isOpen ? { rotateX: 160 } : { rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

        {/* Devant de l'enveloppe */}
        <div 
          className="absolute inset-0 bg-rose-100 rounded-lg z-30 shadow-inner border border-rose-200/50" 
          style={{ clipPath: 'polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/50 to-transparent" />
        </div>

        {/* Sceau */}
        {!isOpen && (
          <motion.div 
            className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <Heart className="text-rose-500 drop-shadow-lg" fill="currentColor" size={56} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 text-rose-400/50"
              >
                <Heart fill="currentColor" size={56} />
              </motion.div>
            </div>
            <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-rose-500 font-serif italic text-sm bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Ouvre-moi...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ValentineEnvelope;