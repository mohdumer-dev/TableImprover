import { useState } from "react";

export default function CircleButton({ number, onToggle }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const newValue = !selected;
    setSelected(newValue);
    onToggle(number, newValue);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-[45px] h-[45px] rounded-full font-bold text-lg
        flex items-center justify-center overflow-hidden group
        border-2 border-black transition-colors
        ${selected ? "text-black" : "text-black"}
      `}
    >
      {/* gradient background layer */}
      <span
        className={`
          absolute inset-0 rounded-full 
          bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
          scale-0 group-hover:scale-100 
          transition-transform duration-700 ease-in-out
          ${selected ? "scale-100" : ""}
        `}
      />
      {/* number always on top */}
      <span className="relative z-10">{number}</span>
    </button>
  );
}
