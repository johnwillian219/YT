//GrowthLines.jsx
import React, { useMemo } from "react";

const GrowthLines = () => {
  const gradientId = useMemo(
    () => `growth-gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.3;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.4;0"
                dur="4s"
                repeatCount="indefinite"
                begin="1s"
              />
            </stop>
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.3;0"
                dur="4s"
                repeatCount="indefinite"
                begin="2s"
              />
            </stop>
          </linearGradient>

          <pattern
            id="growthPattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Linha de crescimento */}
            <path
              d="M0,50 Q25,25 50,50 T100,50"
              stroke={`url(#${gradientId})`}
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>

        {/* Aplicar pattern em diferentes posições */}
        <rect
          x="0"
          y="20%"
          width="100%"
          height="60%"
          fill="url(#growthPattern)"
          opacity="0.5"
        />

        {/* Linhas de tendência adicionais */}
        <g opacity="0.3">
          <line
            x1="10%"
            y1="30%"
            x2="90%"
            y2="30%"
            stroke="#8B5CF6"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur="10s"
              repeatCount="indefinite"
            />
          </line>

          <line
            x1="15%"
            y1="70%"
            x2="85%"
            y2="70%"
            stroke="#00FFFF"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur="10s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      </svg>
    </div>
  );
};

export default GrowthLines;
