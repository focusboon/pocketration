import AuthButtonCard from "@/components/generals/AuthButtonCard";
import AuthInput from "@/components/generals/AuthInput";
import Back from "@/components/generals/Back";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function RegisterScreen() {
  const { signUp, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const extraData = {
      firstName: formData.firstName,
      surName: formData.surname,
    };

    const res = await signUp(formData.email, formData.password, extraData);

    if (res.success) {
      console.log("Registered:", res.user.email);
      // Optional: Save full name to Firestore
      // Optional: Navigate to home or onboarding
    } else {
      console.error("Registration failed:", res.error);
      // Show error toast or message
      setErrors({ email: res.error });
    }
  };
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center gap-1 mt-2 py-3">
        <Back />
        <Text className="text-2xl text-orange-500 font-bold ">Create your account</Text>
      </View>

      <View className="p-5">
        <AuthInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          placeholder="John"
          autoCapitalize="words"
          error={errors.firstName}
        />

        <AuthInput
          label="Surname"
          value={formData.surname}
          onChangeText={(text) => handleChange("surname", text)}
          placeholder="Doe"
          autoCapitalize="words"
          error={errors.surname}
        />

        <AuthInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="john@example.com"
          keyboardType="email-address"
          error={errors.email}
        />

        <AuthInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="At least 8 characters"
          secureTextEntry={true}
          error={errors.password}
        />
        <Text className="text-sm text-center px-8 mb-5">
          By creating an account you accept all{" "}
          <Link href="/auth/sign-in" className="text-orange-500 pl-2">
            terms and condition
          </Link>
        </Text>
        <AuthButtonCard
          text="Create account"
          onPress={handleSubmit}
          className="mt-4"
          loading={loading}
        />
        <Text className="text-center mt-4">
          Already have an account?
          <Link href="/auth/sign-in" className="text-orange-500 pl-2">
            {" "}
            Sign in
          </Link>
        </Text>
      </View>
    </View>
  );
}
