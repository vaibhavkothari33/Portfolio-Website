import React from 'react';
import { motion } from 'framer-motion';

export const TitanText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-neutral-950 hidden md:block md:mt-20 lg:mt-20" 
      style={{ 
        height: 'clamp(50px, 45vh, 400px)'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-full text-[28vw] lg:text-[25vw] xl:text-[22vw] 2xl:text-[20vw] 
          font-bold text-center tracking-tighter whitespace-nowrap select-none text-gray-900 dark:text-white"
        style={{
          top: '5%',
          transform: 'translateY(-50%)',
        }}
      >
        VAIBHAV
      </motion.div>
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-white to-transparent dark:from-neutral-950 dark:via-neutral-950 dark:to-transparent"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
        }}
      />
    </div>
  );
};

export default TitanText;