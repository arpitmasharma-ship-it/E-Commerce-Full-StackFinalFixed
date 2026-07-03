import { motion } from "framer-motion";

const PremiumButton = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`rounded-full bg-black px-8 py-4 text-white font-semibold shadow-xl transition-all duration-300 hover:bg-zinc-800 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default PremiumButton;