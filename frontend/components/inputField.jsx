import { useState } from "react";

export default  function QuestionInput({ onChange }) {
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value)) value = "";
    if (value < 0) value = 0;
    if (value > 30) value = 30;

    onChange(value); // send value up to parent
  };

  return (
    // <div className="flex flex-col p-6 max-w-md mx-auto">
        <div>
      <label htmlFor="numberOfQuestions" className="mb-2 text-lg font-semibold text-gray-800">
        How many questions do you want
      </label>

      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
        <input
          id="numberOfQuestions"
          type="number"
          min="0"
          max="30"
          onChange={handleChange}
          placeholder="Enter a number (0–30)"
          className="w-full rounded-2xl px-4 py-3 bg-white/90 text-gray-800 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white shadow-md"
        />
      </div>
    </div>
  );
}

