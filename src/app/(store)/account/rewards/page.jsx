"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiPackage, FiMapPin, FiHeart, FiGift, FiLogOut, FiStar, FiAward, FiTrendingUp } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { fetchUserRewards } from "@/lib/firestore";

const TIERS = [
  { name: "Member", minPoints: 0, color: "bg-gray-200 text-gray-700", benefits: ["Earn 1 point per $1 spent", "Birthday reward", "Free shipping on orders $75+"] },
  { name: "Silver", minPoints: 500, color: "bg-gray-400 text-white", benefits: ["Earn 1.25 points per $1 spent", "Birthday reward", "Free shipping on orders $50+", "Early access to sales"] },
  { name: "Gold", minPoints: 1500, color: "bg-yellow-500 text-white", benefits: ["Earn 1.5 points per $1 spent", "Birthday reward", "Free shipping on all orders", "Early access to sales", "Exclusive member-only products"] },
  { name: "Platinum", minPoints: 3000, color: "bg-gray-900 text-white", benefits: ["Earn 2 points per $1 spent", "Birthday reward", "Free shipping + free returns", "Early access to sales", "Exclusive products", "Priority customer service"] },
];

export default function RewardsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/auth/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserRewards(user.uid).then((data) => {
        setRewards(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;

  const NAV_ITEMS = [
    { icon: FiUser, label: "Profile", href: "/account" },
    { icon: FiPackage, label: "Order History", href: "/account/orders" },
    { icon: FiMapPin, label: "Addresses", href: "/account/addresses" },
    { icon: FiGift, label: "Rewards", href: "/account/rewards", active: true },
    { icon: FiHeart, label: "Wishlist", href: "/wishlist" },
  ];

  const currentTier = TIERS.find(t => t.name === (rewards?.tier || "Member")) || TIERS[0];
  const currentTierIndex = TIERS.indexOf(currentTier);
  const nextTier = currentTierIndex < TIERS.length - 1 ? TIERS[currentTierIndex + 1] : null;
  const lifetimeEarned = (rewards?.history || []).filter(h => h.type === "earned").reduce((s, h) => s + h.points, 0);
  const progressToNext = nextTier ? Math.min(100, (lifetimeEarned / nextTier.minPoints) * 100) : 100;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">My AV Rewards</h1>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Side Nav */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm ${item.active ? "bg-black text-white" : "hover:bg-gray-50"}`}>
              <item.icon size={16} /> {item.label}
            </Link>
          ))}
          <button onClick={() => { }} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-black w-full">
            <FiLogOut size={16} /> Sign Out
          </button>
        </nav>

        {/* Content */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">Loading rewards...</div>
          ) : (
            <>
              {/* Points Summary */}
              <div className="bg-black text-white p-6 md:p-8 rounded-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-widest text-gray-400 mb-1">AVAILABLE POINTS</p>
                    <p className="text-4xl md:text-5xl font-light">{rewards?.points || 0}</p>
                    <p className="text-sm text-gray-400 mt-1">= ${((rewards?.points || 0) * 0.01).toFixed(2)} in rewards</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-4 py-1.5 text-xs font-medium tracking-wide rounded-full ${currentTier.color}`}>
                      {currentTier.name}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Lifetime earned: {lifetimeEarned} pts</p>
                  </div>
                </div>

                {nextTier && (
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{currentTier.name}</span>
                      <span>{nextTier.name} — {nextTier.minPoints - lifetimeEarned} pts to go</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full">
                      <div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressToNext}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* How It Works */}
              <div>
                <h2 className="text-lg font-medium mb-4">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-5 text-center">
                    <FiStar size={24} className="mx-auto mb-2 text-gray-700" />
                    <p className="text-sm font-medium">Earn Points</p>
                    <p className="text-xs text-gray-500 mt-1">Get 1 point for every $1 you spend. Higher tiers earn more.</p>
                  </div>
                  <div className="border border-gray-200 p-5 text-center">
                    <FiTrendingUp size={24} className="mx-auto mb-2 text-gray-700" />
                    <p className="text-sm font-medium">Level Up</p>
                    <p className="text-xs text-gray-500 mt-1">Earn more points to unlock Silver, Gold, and Platinum tiers.</p>
                  </div>
                  <div className="border border-gray-200 p-5 text-center">
                    <FiAward size={24} className="mx-auto mb-2 text-gray-700" />
                    <p className="text-sm font-medium">Redeem Rewards</p>
                    <p className="text-xs text-gray-500 mt-1">100 points = $1 off. Use points at checkout.</p>
                  </div>
                </div>
              </div>

              {/* Tier Benefits */}
              <div>
                <h2 className="text-lg font-medium mb-4">Tier Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {TIERS.map((tier) => (
                    <div key={tier.name}
                      className={`border p-5 rounded-sm ${tier.name === currentTier.name ? "border-black" : "border-gray-200"}`}>
                      <div className={`inline-block px-3 py-1 text-xs font-medium tracking-wide rounded-full mb-3 ${tier.color}`}>
                        {tier.name}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{tier.minPoints}+ lifetime points</p>
                      <ul className="space-y-1.5">
                        {tier.benefits.map((b) => (
                          <li key={b} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="mt-0.5 text-green-600">✓</span> {b}
                          </li>
                        ))}
                      </ul>
                      {tier.name === currentTier.name && (
                        <p className="text-xs font-medium mt-3 text-black">Your current tier</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Points History */}
              <div>
                <h2 className="text-lg font-medium mb-4">Points History</h2>
                {(rewards?.history || []).length === 0 ? (
                  <div className="border border-gray-200 p-8 text-center">
                    <FiGift size={32} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-500">No activity yet</p>
                    <p className="text-xs text-gray-400 mt-1">Start shopping to earn points!</p>
                    <Link href="/products" className="inline-block mt-4 bg-black text-white px-6 py-2.5 text-xs font-medium tracking-wide hover:bg-gray-900">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="border border-gray-200 divide-y divide-gray-100">
                    {[...(rewards.history || [])].reverse().map((entry, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm">{entry.description}</p>
                          <p className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                        </div>
                        <span className={`text-sm font-medium ${entry.type === "earned" ? "text-green-600" : "text-red-500"}`}>
                          {entry.type === "earned" ? "+" : ""}{entry.points}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
