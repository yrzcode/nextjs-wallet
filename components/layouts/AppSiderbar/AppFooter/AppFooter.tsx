"use client";

import TechStackCard from "./TechStack";
import { useState } from "react";

const AppFooter = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <button
      type="button"
      className="text-white text-center text-sm cursor-pointer rounded-t-lg w-full border-none relative overflow-hidden flex flex-col"
      style={{
        height: isExpanded ? "16rem" : "2rem",
        backgroundColor: isExpanded ? "#365069" : "#3f5a7d",
        transition: "all 300ms ease-in-out",
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label="Expand or collapse footer"
    >
      {/* Copyright text */}
      <p
        className="w-full absolute left-0 right-0 z-10"
        style={{
          top: "50%",
          transform: isExpanded ? "translateY(-7rem)" : "translateY(-50%)",
          transition: "transform 300ms ease-in-out",
        }}
      >
        © 2025 Money Forward mfbc-cto-frontend-tech-assignment.
      </p>

      {/* Tech Stack Card - follows the text movement */}
      <div
        className="absolute w-full px-4 z-5"
        style={{
          top: "50%",
          transform: isExpanded ? "translateY(-5rem)" : "translateY(3rem)",
          opacity: isExpanded ? 1 : 0,
          transition: "all 300ms ease-in-out",
        }}
      >
        <TechStackCard />
      </div>
    </button>
  );
};

export default AppFooter;
