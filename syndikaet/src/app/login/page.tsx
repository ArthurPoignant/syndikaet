"use client";

import "tailwindcss/tailwind.css";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import LoginForm from "../../../components/LoginForm";
import RegisterForm from "../../../components/RegisteringForm";
import { redirect } from "next/navigation";

export default function Login() {
 
    const handleLoginSuccess = () => {
      // Handle successful login (e.g., redirect, show message)
      console.log("Login successful!");
      redirect('/')
    };

    const handleRegisterSuccess = () => {
      // Handle successful registration (e.g., redirect, show message)
      console.log("Registration successful!");
      redirect('/')
    }

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
  };

