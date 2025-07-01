import AuthButtonCard from "@/components/generals/AuthButtonCard";
import AuthInput from "@/components/generals/AuthInput";
import Back from "@/components/generals/Back";
import React, { useState } from "react";
import { Text, View } from "react-native";

const STEPS = {
  EMAIL: 1,
  CODE: 2,
  RESET: 3,
};

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    setLoading(true);
    
    if (step === STEPS.EMAIL) {
      // Validate email
      if (!formData.email) {
        setErrors({ email: "Email is required" });
        setLoading(false);
        return;
      }
      // TODO: Send code to email
      setTimeout(() => {
        setStep(STEPS.CODE);
        setLoading(false);
      }, 1000);
    } 
    else if (step === STEPS.CODE) {
      // Validate code
      if (!formData.code) {
        setErrors({ code: "Verification code is required" });
        setLoading(false);
        return;
      }
      setStep(STEPS.RESET);
      setLoading(false);
    } 
    else {
      // Validate passwords
      const newErrors = {};
      if (!formData.newPassword) newErrors.newPassword = "Password is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // TODO: Implement password reset
      console.log("Password reset data:", formData);
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case STEPS.EMAIL: return "Forgot Password";
      case STEPS.CODE: return "Verify Code";
      case STEPS.RESET: return "Reset Password";
      default: return "Forgot Password";
    }
  };

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center gap-1 mt-2 py-3">
        <Back />
        <Text className="text-2xl text-orange-500 font-bold">{getStepTitle()}</Text>
      </View>

      <View className="p-5">
        {step === STEPS.EMAIL && (
          <>
            <Text className="text-gray-600 mb-4">
              Enter your email to receive a verification code
            </Text>
            <AuthInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </>
        )}

        {step === STEPS.CODE && (
          <>
            <Text className="text-gray-600 mb-4">
              We sent a code to {formData.email}. Please enter it below.
            </Text>
            <AuthInput
              label="Verification Code"
              value={formData.code}
              onChangeText={(text) => handleChange("code", text)}
              placeholder="6-digit code"
              keyboardType="number-pad"
              error={errors.code}
            />
          </>
        )}

        {step === STEPS.RESET && (
          <>
            <Text className="text-gray-600 mb-4">
              Create a new password for your account
            </Text>
            <AuthInput
              label="New Password"
              value={formData.newPassword}
              onChangeText={(text) => handleChange("newPassword", text)}
              placeholder="At least 8 characters"
              secureTextEntry={true}
              error={errors.newPassword}
            />
            <AuthInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              placeholder="Confirm your password"
              secureTextEntry={true}
              error={errors.confirmPassword}
            />
          </>
        )}

        <AuthButtonCard
          text={
            loading 
              ? "Processing..." 
              : step === STEPS.EMAIL 
                ? "Send Code" 
                : step === STEPS.CODE 
                  ? "Verify Code" 
                  : "Reset Password"
          }
          onPress={handleSubmit}
          disabled={loading}
          className="mt-4"
        />

        {step !== STEPS.EMAIL && (
          <Text 
            className="text-orange-500 text-center mt-4"
            onPress={() => setStep(step - 1)}
          >
            Go Back
          </Text>
        )}
      </View>
    </View>
  );
}