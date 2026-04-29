"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CookieSettingsPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: true,
  });

  const toggle = (key) => {
    if (key === "essential") return; // cannot disable essential
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem("ck_cookie_prefs", JSON.stringify(preferences));
    toast.success("Cookie preferences saved");
  };

  const cookies = [
    {
      key: "essential",
      label: "Essential Cookies",
      description: "Required for the website to function. These cannot be disabled. They include session management, shopping bag functionality, and security features.",
      required: true,
    },
    {
      key: "analytics",
      label: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website by collecting anonymous usage data. This helps us improve our site experience.",
    },
    {
      key: "marketing",
      label: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track ad campaign performance. These may be set by our advertising partners.",
    },
    {
      key: "personalization",
      label: "Personalization Cookies",
      description: "Allow us to remember your preferences, recently viewed items, and provide personalized product recommendations.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Cookie Settings</span>
      </p>

      <h1 className="text-2xl font-light tracking-wider uppercase mb-4">Cookie Settings</h1>
      <p className="text-xs text-gray-500 mb-10 leading-relaxed max-w-xl">
        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
        Manage your preferences below. For more information, see our{" "}
        <Link href="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>.
      </p>

      <div className="space-y-0 border-t border-gray-200">
        {cookies.map((cookie) => (
          <div key={cookie.key} className="py-6 border-b border-gray-200 flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xs font-medium tracking-wider uppercase">{cookie.label}</h2>
                {cookie.required && (
                  <span className="text-[10px] tracking-wider uppercase text-gray-400">Always active</span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{cookie.description}</p>
            </div>
            <button
              onClick={() => toggle(cookie.key)}
              disabled={cookie.required}
              className={`flex-shrink-0 mt-1 w-10 h-5 rounded-full relative transition-colors ${
                preferences[cookie.key] ? "bg-black" : "bg-gray-300"
              } ${cookie.required ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  preferences[cookie.key] ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={handleSave}
          className="h-10 px-10 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors"
        >
          Save Preferences
        </button>
        <button
          onClick={() => {
            setPreferences({ essential: true, analytics: true, marketing: true, personalization: true });
            localStorage.setItem(
              "ck_cookie_prefs",
              JSON.stringify({ essential: true, analytics: true, marketing: true, personalization: true })
            );
            toast.success("All cookies accepted");
          }}
          className="h-10 px-10 border border-black text-black text-xs font-medium tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
