import React from "react";
import PropTypes from "prop-types";

/**
 * Container profissional responsivo com suporte a diferentes tamanhos
 */
const Container = ({
  children,
  className = "",
  size = "default",
  as: Component = "div",
  ...props
}) => {
  // Mapeamento de tamanhos
  const sizeClasses = {
    sm: "max-w-4xl",
    default: "max-w-7xl",
    lg: "max-w-[1920px]",
    full: "max-w-none",
  };

  return (
    <Component
      className={`
        mx-auto 
        ${sizeClasses[size]}
        px-4 sm:px-6 lg:px-8
        w-full
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "default", "lg", "full"]),
  as: PropTypes.elementType,
};

export default Container;
