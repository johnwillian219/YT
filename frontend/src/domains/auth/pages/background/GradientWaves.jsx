import React, { useMemo } from "react";
import { BACKGROUND_CONFIG, THEME_CONFIG } from "./background.constants";

const GradientWaves = ({ theme = "cyberpunk" }) => {
  const gradientId = useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  const themeColors =
    THEME_CONFIG[theme]?.gradient?.colors ||
    THEME_CONFIG.cyberpunk.gradient.colors;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientTransform="rotate(45)"
          >
            {themeColors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / themeColors.length) * 100}%`}
                stopColor={color}
              >
                <animate
                  attributeName="offset"
                  values={`${(index / themeColors.length) * 100}%;${
                    ((index + 0.5) / themeColors.length) * 100
                  }%;${(index / themeColors.length) * 100}%`}
                  dur={`${BACKGROUND_CONFIG.gradient.animationDuration}s`}
                  repeatCount="indefinite"
                  begin={`${index * 3}s`}
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </stop>
            ))}
          </linearGradient>

          {/* Ondas suaves */}
          <path
            d="M-100,0 C150,150 350,0 600,150 C850,300 1050,0 1300,150 L1300,600 L-100,600 Z"
            fill={`url(#${gradientId})`}
            opacity="0.4"
          >
            <animate
              attributeName="d"
              dur="25s"
              repeatCount="indefinite"
              values="
                M-100,0 C150,150 350,0 600,150 C850,300 1050,0 1300,150 L1300,600 L-100,600 Z;
                M-100,0 C150,50 350,200 600,50 C850,-100 1050,200 1300,50 L1300,600 L-100,600 Z;
                M-100,0 C150,150 350,0 600,150 C850,300 1050,0 1300,150 L1300,600 L-100,600 Z
              "
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </path>
        </defs>
      </svg>

      {/* Overlay para suavizar */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/10 to-gray-950/30" />
    </div>
  );
};

export default GradientWaves;
