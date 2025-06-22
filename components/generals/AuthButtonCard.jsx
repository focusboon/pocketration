import { Link } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import React from "react";

const AuthButtonCard = ({ 
  type = "type-a", 
  text, 
  url = '/',
  disabled = false 
}) => {
  const buttonStyles = {
    "type-a": "bg-green-600",
    "type-b": "border border-green-600 bg-transparent"
  };

  const textStyles = {
    "type-a": "text-white",
    "type-b": "text-green-600"
  };

  return (
    <Link 
      href={url} 
      asChild
      disabled={disabled}
    >
      <TouchableOpacity
        className={`
          w-full 
          ${buttonStyles[type]} 
          p-4 rounded-full my-2
          ${disabled ? "opacity-50" : ""}
        `}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text 
          className={`
            text-center uppercase font-medium py-1 
            ${textStyles[type]}
          `}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default AuthButtonCard;