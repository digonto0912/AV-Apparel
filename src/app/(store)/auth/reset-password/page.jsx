"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Password reset email sent!");
    } catch {
      toast.error("Could not send reset email. Please check the email address.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-medium mb-4">Check Your Email</h1>
        <p className="text-sm text-gray-600 mb-6">We sent a password reset link to <strong>{email}</strong></p>
        <Link href="/auth/login" className="text-sm underline">Back to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-medium text-center mb-2">Reset Password</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Enter your email to receive a reset link</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" placeholder="email@example.com" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-3.5 text-sm font-medium hover:bg-gray-900 disabled:opacity-60">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/auth/login" className="underline">Back to Sign In</Link>
      </p>
    </div>
  );
}
