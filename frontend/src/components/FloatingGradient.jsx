const FloatingGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[150px] animate-pulse" />

      <div className="absolute top-1/3 right-[-200px] h-[550px] w-[550px] rounded-full bg-blue-500/20 blur-[160px] animate-pulse" />

      <div className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[150px] animate-pulse" />

    </div>
  );
};

export default FloatingGradient;