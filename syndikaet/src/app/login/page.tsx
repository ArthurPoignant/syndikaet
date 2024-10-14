"use client";

import "tailwindcss/tailwind.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import LoginForm from "../../../components/login/LoginForm";
import RegisterForm from "../../../components/login/RegisteringForm";

export default function Login() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    console.log("Login successful from front!");
    router.push('/');
  };

  const handleRegisterSuccess = () => {
    console.log("Registration successful!");
    router.push('/login');
  };

  return (
    <>
      <Header />
        <div className="w-full flex mt-14 justify-around h-screen">
          <LoginForm onLogin={handleLoginSuccess} />
          <RegisterForm onRegister={handleRegisterSuccess} />
        </div>
      <Newsletter />
      <Footer />
    </>
  );
}
