"use client";

import TechStackCard from "./TechStack";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
      <div
        className="w-full absolute left-0 right-0 z-10"
        style={{
          top: "50%",
          transform: isExpanded ? "translateY(-7rem)" : "translateY(-50%)",
          transition: "transform 300ms ease-in-out",
        }}
      >
        <p>© 2025 Money Forward mfbc-cto-frontend-tech-assignment.</p>
        <p className="w-44 flex items-center gap-2 underline absolute right-0 top-0">
          <span
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: isExpanded ? 0 : 1,
              transform: isExpanded ? "translateY(-10px)" : "translateY(0)",
              position: isExpanded ? "absolute" : "static",
            }}
          >
            Show Tech Stack
          </span>
          <span
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? "translateY(0)" : "translateY(10px)",
              position: isExpanded ? "static" : "absolute",
            }}
          >
            Hide Tech Stack
          </span>
          {isExpanded ? (
            <FaChevronUp className="w-3 h-3 transition-transform duration-300" />
          ) : (
            <FaChevronDown className="w-3 h-3 transition-transform duration-300" />
          )}
        </p>
      </div>

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
