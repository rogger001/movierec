import React from 'react';
import { motion } from 'framer-motion';
import { Grid3x3, List } from 'lucide-react';

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView('grid')}
        className={`p-2 rounded-md transition-all ${
          view === 'grid'
            ? 'bg-red-600 text-white shadow-glow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Grid View"
      >
        <Grid3x3 className="w-5 h-5" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView('list')}
        className={`p-2 rounded-md transition-all ${
          view === 'list'
            ? 'bg-red-600 text-white shadow-glow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        title="List View"
      >
        <List className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default ViewToggle;
