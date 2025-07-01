import AuthButtonCard from "@/components/generals/AuthButtonCard";
import AuthInput from "@/components/generals/AuthInput";
import Back from "@/components/generals/Back";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function SignInScreen() {
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await signIn(formData.email, formData.password);

    if (res.success) {
      console.log("Registered:", res.user.email);
    } else {
      console.error("Registration failed:", res.error);

      setErrors({ email: res.error });
    }
  };

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center gap-1 mt-2 py-3">
        <Back />
        <Text className="text-2xl text-orange-500 font-bold">Welcome back</Text>
      </View>

      <View className="p-5">
        <AuthInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <AuthInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Enter your password"
          secureTextEntry={true}
          error={errors.password}
        />

        <Link
          href="/auth/forgot-password"
          className="text-right text-orange-500 mb-6"
        >
          Forgot password?
        </Link>

        <AuthButtonCard
          text={"Sign in"}
          onPress={handleSubmit}
          disabled={loading}
          loading={loading}
          className="mt-2"
        />

        <Text className="text-center mt-4">
          Dont have an account?
          <Link href="/auth/create-account" className="text-orange-500  ">
            {" "}
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
}
