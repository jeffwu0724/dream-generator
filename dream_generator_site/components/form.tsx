"use client";
import React from "react";
interface FromsProps {
  setStory: any;
  onSubmit: any;
}

const Forms: React.FC<FromsProps> = (props) => {
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <>
      <p>Tell me your dream briefly, we will generate a detailed one</p>
      <div className="p-4 space-y-4">
  <input
    className="p-3 w-full rounded-md text-slate-200 bg-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    type="text"
    placeholder="A labrador is eating spaghetti"
    onChange={(e) => props.setStory(e.currentTarget.value)}
  />
  
  <button
  className={`bg-gradient-to-r ${
    isPressed ? 'from-gray-500 to-gray-300' : 'from-blue-700 to-blue-500'
  } disabled:opacity-50 w-full p-3 rounded-md text-lg text-white font-semibold shadow-md transition ease-in-out duration-200`}
  onClick={() => {
    setIsPressed(true);
    props.onSubmit();
  }}
  onMouseUp={() => setIsPressed(false)}
>
  {isPressed ? 'Generating...' : 'Generate'}
</button>

</div>

    </>
  );
};

export default Forms;
