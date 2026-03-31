"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill in all fields"); return;
    }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }

    setLoading(true);
    try {
      await signUp(form.email, form.password, `${form.firstName} ${form.lastName}`);
      toast.success("Account created successfully!");
      router.push("/account");
    } catch (err) {
      const msg = err.code === "auth/email-already-in-use"
        ? "Email already in use"
        : err.code === "auth/weak-password"
        ? "Password is too weak"
        : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-medium text-center mb-2">Create Account</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Join Calvin Klein for exclusive benefits</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1.5">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1.5">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" placeholder="Min. 6 characters" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5">Confirm Password</label>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-black transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide hover:bg-gray-900 disabled:opacity-60">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account? <Link href="/auth/login" className="underline text-black font-medium">Sign in</Link>
      </p>
    </div>
  );
}
