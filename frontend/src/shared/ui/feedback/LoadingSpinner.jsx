import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#151522] to-[#151522]">
      <div className="text-center">
        {/* Spinner com gradiente */}
        <div className="w-16 h-16 mx-auto mb-6">
          <div
            className="w-16 h-16 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: "#06b6d4",
              borderRightColor: "#8b5cf6",
              borderBottomColor: "#ec4899",
              borderLeftColor: "#3b82f6",
            }}
          ></div>
        </div>

        {/* Texto */}
        <div className="text-gray-300 text-sm">NinjaTube...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
