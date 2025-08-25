"use client";

import { useState } from "react";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setUser);

  const handleSignIn = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData.entries()) as LoginRequest;
      const user = await login(data);

      if (user) {
        setAuth(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Oops... some error");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSignIn}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignInPage;
