"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiCheck, FiChevronLeft, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder, fetchPromoCodes, fetchSiteOffers, addRewardsPoints } from "@/lib/firestore";

const STEPS = ["Bag", "Information", "Shipping", "Review & Confirm"];

function validateEmail(e) { return /\S+@\S+\.\S+/.test(e); }

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, itemCount } = useCart();
  const { user, userProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    email: user?.email || "",
    firstName: userProfile?.displayName?.split(" ")[0] || "",
    lastName: userProfile?.displayName?.split(" ").slice(1).join(" ") || "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: userProfile?.phone || "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [siteOffer, setSiteOffer] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPromoCodes().then(setPromoCodes).catch(() => setPromoCodes([]));
    fetchSiteOffers().then((data) => {
      const active = data.find((o) => o.active && o.discountValue > 0);
      if (active) setSiteOffer(active);
    }).catch(() => {});
  }, []);

  if (items.length === 0 && step < 4) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-medium mb-4">Your bag is empty</h1>
        <Link href="/products" className="text-sm underline">Continue Shopping</Link>
      </div>
    );
  }

  const shippingCost = shippingMethod === "express" ? 15 : 0;

  // Calculate site offer discount (auto-applied from announcement bar)
  const calcSiteOfferDiscount = () => {
    if (!siteOffer || siteOffer.discountValue <= 0) return 0;
    let eligibleSubtotal = 0;
    for (const item of items) {
      const excluded = (siteOffer.excludeCategories || []).some(
        (cat) => cat.toLowerCase() === (item.category || "").toLowerCase()
      );
      if (siteOffer.discountScope === "sitewide" && !excluded) {
        eligibleSubtotal += (item.salePrice || item.price) * item.quantity;
      } else if (siteOffer.discountScope !== "sitewide" && (item.category || "").toLowerCase() === siteOffer.discountScope.toLowerCase() && !excluded) {
        eligibleSubtotal += (item.salePrice || item.price) * item.quantity;
      }
    }
    if (eligibleSubtotal === 0) return 0;
    return siteOffer.discountType === "percentage"
      ? eligibleSubtotal * (siteOffer.discountValue / 100)
      : Math.min(siteOffer.discountValue, eligibleSubtotal);
  };

  const siteOfferDiscount = calcSiteOfferDiscount();

  // Promo code discount (manual entry)
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage" ? subtotal * (appliedPromo.value / 100) : appliedPromo.value
    : 0;

  const totalDiscount = siteOfferDiscount + promoDiscount;
  const tax = (subtotal - totalDiscount) * 0.08;
  const total = subtotal - totalDiscount + tax + shippingCost;

  const handleApplyPromo = () => {
    const code = promoCodes.find((c) => c.code.toLowerCase() === promoCode.trim().toLowerCase() && c.active !== false);
    if (!code) { toast.error("Invalid promo code"); return; }
    if (subtotal < (code.minPurchase || 0)) { toast.error(`Minimum $${code.minPurchase} required`); return; }
    setAppliedPromo(code);
    toast.success(code.description);
  };

  const validateInfo = () => {
    const e = {};
    if (!info.email || !validateEmail(info.email)) e.email = "Valid email required";
    if (!info.firstName.trim()) e.firstName = "First name required";
    if (!info.lastName.trim()) e.lastName = "Last name required";
    if (!info.address.trim()) e.address = "Address required";
    if (!info.city.trim()) e.city = "City required";
    if (!info.state.trim()) e.state = "State required";
    if (!info.zip.trim()) e.zip = "ZIP code required";
    if (!info.phone.trim()) e.phone = "Phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateInfo()) return;
    if (step === 3) {
      placeOrder();
      return;
    }
    setStep(step + 1);
    setErrors({});
  };

  const placeOrder = async () => {
    setProcessing(true);
    try {
      const order = {
        userId: user?.uid || "guest",
        email: info.email,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.salePrice || i.price,
          image: i.image || "",
        })),
        shippingAddress: {
          firstName: info.firstName,
          lastName: info.lastName,
          address: info.address,
          apartment: info.apartment,
          city: info.city,
          state: info.state,
          zip: info.zip,
          phone: info.phone,
        },
        shippingMethod,
        paymentMethod: "cod",
        subtotal,
        siteOfferDiscount,
        promoDiscount,
        discount: totalDiscount,
        tax,
        shippingCost,
        total,
        siteOffer: siteOffer ? { text: siteOffer.text, discountType: siteOffer.discountType, discountValue: siteOffer.discountValue, discountScope: siteOffer.discountScope } : null,
        promoCode: appliedPromo?.code || "",
        status: "processing",
        createdAt: new Date().toISOString(),
      };

      const result = await createOrder(order);

      // Award rewards points (1 point per $1 spent)
      if (user) {
        const pointsEarned = Math.floor(total);
        if (pointsEarned > 0) {
          try {
            await addRewardsPoints(user.uid, pointsEarned, `Order #${result.id.slice(-8).toUpperCase()}`);
          } catch (e) {
            console.error("Failed to add rewards:", e);
          }
        }
      }

      clearCart();
      router.push(`/checkout/confirmation?orderId=${result.id}`);
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const InputField = ({ label, name, value, onChange, error, type = "text", placeholder, half }) => (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="block text-xs font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full border px-3 py-2.5 text-sm ${error ? "border-red-500" : "border-gray-300 focus:border-black"} transition-colors`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  const handleInfoChange = (name, value) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Progress Bar */}
      <div className="px-4 md:px-8 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                i < step ? "bg-black text-white" : i === step ? "border-2 border-black text-black" : "border border-gray-300 text-gray-400"
              }`}>
                {i < step ? <FiCheck size={12} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden md:block ${i <= step ? "text-black" : "text-gray-400"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-black" : "bg-gray-300"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left - Form */}
        <div className="flex-1 px-4 md:px-8 py-8 lg:border-r border-gray-200">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-black mb-6">
              <FiChevronLeft size={14} /> Back
            </button>
          )}

          {/* Step 1: Information */}
          {step === 1 && (
            <div className="max-w-lg animate-fade-in">
              <h2 className="text-xl font-medium mb-6">Contact & Shipping Information</h2>
              {!user && (
                <p className="text-xs text-gray-500 mb-4">
                  Already have an account? <Link href="/auth/login" className="underline">Sign in</Link>
                </p>
              )}
              <div className="space-y-4">
                <InputField label="Email" name="email" value={info.email} onChange={handleInfoChange} error={errors.email} type="email" placeholder="email@example.com" />
                <div className="flex gap-3">
                  <InputField label="First Name" name="firstName" value={info.firstName} onChange={handleInfoChange} error={errors.firstName} half />
                  <InputField label="Last Name" name="lastName" value={info.lastName} onChange={handleInfoChange} error={errors.lastName} half />
                </div>
                <InputField label="Address" name="address" value={info.address} onChange={handleInfoChange} error={errors.address} placeholder="Street address" />
                <InputField label="Apartment, suite, etc. (optional)" name="apartment" value={info.apartment} onChange={handleInfoChange} />
                <div className="flex gap-3">
                  <InputField label="City" name="city" value={info.city} onChange={handleInfoChange} error={errors.city} half />
                  <InputField label="State" name="state" value={info.state} onChange={handleInfoChange} error={errors.state} half />
                </div>
                <div className="flex gap-3">
                  <InputField label="ZIP Code" name="zip" value={info.zip} onChange={handleInfoChange} error={errors.zip} half />
                  <InputField label="Phone" name="phone" value={info.phone} onChange={handleInfoChange} error={errors.phone} type="tel" half />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="max-w-lg animate-fade-in">
              <h2 className="text-xl font-medium mb-6">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border cursor-pointer ${shippingMethod === "standard" ? "border-black" : "border-gray-200 hover:border-gray-400"}`}>
                  <input type="radio" name="shipping" value="standard" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="accent-black" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Standard Shipping</p>
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                  <span className="text-sm font-medium text-green-700">FREE</span>
                </label>
                <label className={`flex items-center gap-4 p-4 border cursor-pointer ${shippingMethod === "express" ? "border-black" : "border-gray-200 hover:border-gray-400"}`}>
                  <input type="radio" name="shipping" value="express" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="accent-black" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Express Shipping</p>
                    <p className="text-xs text-gray-500">1-2 business days</p>
                  </div>
                  <span className="text-sm font-medium">$15.00</span>
                </label>
              </div>
              <div className="mt-6 p-4 bg-gray-50 text-xs text-gray-600">
                <p className="font-medium mb-1">Shipping to:</p>
                <p>{info.firstName} {info.lastName}</p>
                <p>{info.address}{info.apartment && `, ${info.apartment}`}</p>
                <p>{info.city}, {info.state} {info.zip}</p>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm (Cash on Delivery) */}
          {step === 3 && (
            <div className="max-w-lg animate-fade-in">
              <h2 className="text-xl font-medium mb-6">Review & Confirm</h2>

              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 mb-6">
                <FiTruck size={20} className="text-green-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">Cash on Delivery</p>
                  <p className="text-xs text-green-700 mt-1">Pay with cash when your order arrives at your doorstep. No online payment needed.</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 mb-4">
                <h3 className="text-xs font-medium mb-2">Shipping Address</h3>
                <div className="text-xs text-gray-600">
                  <p>{info.firstName} {info.lastName}</p>
                  <p>{info.address}{info.apartment && `, ${info.apartment}`}</p>
                  <p>{info.city}, {info.state} {info.zip}</p>
                  <p>{info.phone}</p>
                  <p className="text-gray-400 mt-1">{info.email}</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 mb-4">
                <h3 className="text-xs font-medium mb-2">Shipping Method</h3>
                <p className="text-xs text-gray-600">{shippingMethod === "express" ? "Express (1-2 business days) — $15.00" : "Standard (3-5 business days) — FREE"}</p>
              </div>

              <div className="p-4 border border-gray-200">
                <h3 className="text-xs font-medium mb-2">Payment Method</h3>
                <p className="text-xs text-gray-600">Cash on Delivery (COD)</p>
              </div>
            </div>
          )}

          <div className="max-w-lg mt-8">
            <button
              onClick={nextStep}
              disabled={processing}
              className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? "Placing Order..." : step === 3 ? `Place Order — $${total.toFixed(2)} (COD)` : "Continue"}
            </button>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full lg:w-[380px] flex-shrink-0 px-4 md:px-8 py-8 bg-gray-50">
          <h3 className="text-sm font-medium mb-4">Order Summary ({itemCount})</h3>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3">
                <div className="w-14 h-14 bg-gray-200 flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">AV</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-500">{item.color} / {item.size} × {item.quantity}</p>
                </div>
                <span className="text-xs font-medium">${((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-gray-300 px-3 py-2 text-xs bg-white focus:border-black"
              />
              <button onClick={handleApplyPromo} className="px-3 py-2 bg-black text-white text-xs">Apply</button>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-xs"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {siteOfferDiscount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-green-700">Site Offer ({siteOffer.discountType === "percentage" ? `${siteOffer.discountValue}%` : `$${siteOffer.discountValue}`} {siteOffer.discountScope === "sitewide" ? "sitewide" : siteOffer.discountScope})</span>
                <span className="text-green-700">-${siteOfferDiscount.toFixed(2)}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-green-700">Promo ({appliedPromo.code})</span>
                <span className="text-green-700">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs"><span className="text-gray-500">Shipping</span><span>{shippingCost ? `$${shippingCost.toFixed(2)}` : "FREE"}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Payment</span><span className="text-green-700 font-medium">Cash on Delivery</span></div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
