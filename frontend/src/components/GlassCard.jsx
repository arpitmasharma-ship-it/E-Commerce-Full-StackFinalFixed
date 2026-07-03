import { motion } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;