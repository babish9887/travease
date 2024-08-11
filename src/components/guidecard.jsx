import React from "react";

function GuideCard({ name, currently_in }) {
  return (
    <div className="w-60 aspect-square bg-gray-200 rounded-2xl flex flex-col justify-center items-center gap-y-4 hover:scale-105 transition-all cursor-pointer">
      <div className="w-28 h-28 rounded-full bg-gray-100 self-center"></div>
      <div className="flex justify-center items-center flex-col">
        <h1>{name}</h1>
        <p>{currently_in}</p>
      </div>
    </div>
  );
}

export default GuideCard;
