"use client";
import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

const FAQ_SECTIONS = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 3-5 business days. Express shipping delivers in 1-2 business days. Orders placed before 2 PM EST on business days ship the same day.",
      },
      {
        q: "How much does shipping cost?",
        a: "Standard shipping is free on all orders. Express shipping is available for $15.00.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order from your account under Order History.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact us immediately if you need help.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we ship within the United States only. International shipping is coming soon.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have all original tags attached. Returns are free for all orders.",
      },
      {
        q: "How do I start a return?",
        a: "Log into your account, go to Order History, select the order, and click 'Start Return.' You'll receive a prepaid shipping label via email.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your return, refunds are processed within 5-7 business days. The refund will appear on your original payment method.",
      },
      {
        q: "Can I exchange an item?",
        a: "We don't offer direct exchanges. Please return the item and place a new order for the desired size or color.",
      },
    ],
  },
  {
    title: "Products & Sizing",
    questions: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a Size Guide with detailed measurements. Compare your body measurements with our size chart for the best fit.",
      },
      {
        q: "Are your products authentic?",
        a: "Yes, every product sold on our website is 100% authentic Calvin Klein merchandise.",
      },
      {
        q: "How do I care for my Calvin Klein items?",
        a: "Care instructions are provided on each product's page under 'Materials & Care.' Generally, we recommend cold machine wash and tumble dry low for most items.",
      },
    ],
  },
  {
    title: "Account & Payment",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click the user icon in the header and select 'Create Account.' You'll need to provide your name, email, and a password.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, Discover, and PayPal. We also support Klarna and Afterpay for installment payments.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All transactions are encrypted with industry-standard SSL/TLS technology. We never store your full credit card information.",
      },
      {
        q: "Can I checkout without an account?",
        a: "Yes, we offer guest checkout. However, creating an account lets you track orders, save addresses, and earn rewards.",
      },
    ],
  },
  {
    title: "Promotions & Rewards",
    questions: [
      {
        q: "How do promo codes work?",
        a: "Enter your promo code in the checkout bag or during checkout. Discounts are applied to eligible items. Only one promo code can be used per order.",
      },
      {
        q: "What is My Calvin Rewards?",
        a: "My Calvin Rewards is our loyalty program. Earn points on every purchase, get exclusive access to sales, birthday rewards, and more. Sign up for free on our website.",
      },
      {
        q: "Do sale items qualify for additional discounts?",
        a: "Some promotions exclude already-discounted items. Check the specific promotion's terms for details.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-3">Frequently Asked Questions</h1>
      <p className="text-sm text-gray-500 text-center mb-12">
        Find answers to common questions about orders, shipping, returns, and more.
      </p>

      <div className="space-y-10">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">{section.title}</h2>
            <div className="space-y-0">
              {section.questions.map((item, i) => {
                const key = `${section.title}-${i}`;
                return (
                  <div key={key} className="border-b border-gray-100">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-sm font-medium pr-4">{item.q}</span>
                      <FiChevronDown
                        size={16}
                        className={`flex-shrink-0 text-gray-400 transition-transform ${openItems[key] ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openItems[key] && (
                      <p className="text-sm text-gray-600 leading-relaxed pb-4 animate-fade-in">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-gray-50 p-8">
        <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
        <p className="text-sm text-gray-500 mb-4">Our customer service team is here to help.</p>
        <Link href="/contact" className="inline-block bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-900">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
