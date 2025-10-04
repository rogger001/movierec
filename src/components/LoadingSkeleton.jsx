import React from 'react';
import { motion } from 'framer-motion';

export const MovieCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl ring-1 ring-white/10">
      <div className="aspect-[2/3] bg-gray-800 relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="absolute top-3 right-3 h-8 w-16 bg-gray-700/50 rounded-full animate-pulse" />
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="relative h-[70vh] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
        <div className="max-w-2xl space-y-4">
          <div className="h-16 bg-gray-800 rounded-lg w-3/4 animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="h-8 w-20 bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-8 w-32 bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-4/6 animate-pulse" />
          </div>
          <div className="h-12 w-40 bg-gray-800 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const LoadingScreen = ({ message = "Loading amazing movies..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        {/* Animated loader */}
        <div className="relative w-24 h-24 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-red-500 border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 bg-red-500 rounded-full shadow-glow-lg" />
          </motion.div>
        </div>
        
        <motion.p
          className="text-xl text-white font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
        
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default { MovieCardSkeleton, HeroSkeleton, LoadingScreen };
