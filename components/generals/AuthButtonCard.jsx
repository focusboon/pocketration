import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const AuthButtonCard = ({
  type = "type-a",
  text,
  url = null,
  onPress,
  disabled = false,
  loading,
}) => {
  const buttonStyles = {
    "type-a": "bg-orange-500",
    "type-b": "border border-orange-500 bg-transparent",
  };

  const textStyles = {
    "type-a": "text-white",
    "type-b": "text-orange-500",
  };

  const baseButton = (
    <TouchableOpacity
      className={`
        w-full 
        ${buttonStyles[type]} 
        p-4 rounded-full my-2
        ${(loading || disabled) ? "opacity-50" : ""}
      `}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={loading || disabled}
    >
      <Text
        className={`
          text-center uppercase font-medium py-1 
          ${textStyles[type]}
        `}
      >
        {loading ? "Loading..." : text}
      </Text>
    </TouchableOpacity>
  );

  return url ? (
    <Link href={url} asChild>
      {baseButton}
    </Link>
  ) : (
    baseButton
  );
};

export default AuthButtonCard;
