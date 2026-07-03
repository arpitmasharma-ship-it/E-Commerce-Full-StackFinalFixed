// import { useEffect, useState } from "react";

// const CursorGlow = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const moveCursor = (e) => {
//       setPosition({
//         x: e.clientX,
//         y: e.clientY,
//       });
//     };

//     window.addEventListener("mousemove", moveCursor);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//     };
//   }, []);

//   return (
//     <div
//       className="pointer-events-none fixed z-[9999] h-64 w-64 rounded-full bg-indigo-500/20 blur-[120px] transition-all duration-100"
//       style={{
//         left: position.x - 128,
//         top: position.y - 128,
//       }}
//     />
//   );
// };

// export default CursorGlow;