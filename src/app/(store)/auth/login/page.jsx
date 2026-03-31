"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.push("/");
  }, [user, authLoading, router]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;
  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      router.push("/account");
    } catch (err) {
      console.error("Login error:", err.code, err.message);
      const errorMap = {
        "auth/user-not-found": "No account found with this email. Please register first.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-credential": "Invalid email or password. If you haven't registered, please create an account first.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        "auth/operation-not-allowed": "Email/Password sign-in is not enabled. Please enable it in Firebase Console → Authentication → Sign-in method.",
      };
      toast.error(errorMap[err.code] || `Error: ${err.code || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-medium text-center mb-2">Sign In</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Welcome back to AV APPAREL</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors"
            placeholder="••••••••"
          />
        </div>
        <div className="text-right">
          <Link href="/auth/reset-password" className="text-xs text-gray-500 underline hover:text-black">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account? <Link href="/auth/register" className="underline text-black font-medium">Create one</Link>
        </p>
      </div>

      <div className="mt-6 p-4 bg-gray-50 text-xs text-gray-500 rounded">
        <p className="font-medium text-black mb-1">Admin Access</p>
        <p>To access the admin panel, sign in with an admin account and navigate to /admin.</p>
      </div>
    </div>
  );
}
