"use client";

import { useState } from "react";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData.entries()) as RegisterRequest;
      const user = await register(data);

      if (user) {
        setAuth(user);
        router.push("/profile");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Oops... something went wrong");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
