import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor-element"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isPointer ? 100 : 40,
          height: isPointer ? 100 : 40,
          borderRadius: '50%',
          background: isPointer 
            ? 'radial-gradient(circle, rgba(255, 95, 109, 0.4) 0%, rgba(255, 195, 113, 0.1) 70%)' 
            : 'radial-gradient(circle, rgba(255, 195, 113, 0.2) 0%, transparent 80%)',
          border: isPointer ? '1px solid #FF5F6D' : '1px solid rgba(255, 195, 113, 0.3)',
          boxShadow: isPointer 
            ? '0 0 30px rgba(255, 95, 109, 0.4), inset 0 0 15px rgba(255, 195, 113, 0.2)' 
            : '0 0 15px rgba(255, 195, 113, 0.1)',
          pointerEvents: 'none',
          zIndex: 10000,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backdropFilter: 'saturate(1.2)',
        }}
      />
      {/* Outer Glow Aura */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isPointer ? 150 : 0,
          height: isPointer ? 150 : 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 95, 109, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isPointer ? 1 : 0
        }}
      />
    </>


  );
};

export default CustomCursor;
