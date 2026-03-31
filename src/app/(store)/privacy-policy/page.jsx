"use client";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Privacy Policy</span>
      </p>

      <h1 className="text-2xl font-light tracking-wider uppercase mb-10">Privacy Policy</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">1. Information We Collect</h2>
          <p className="mb-2">We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Name, email address, phone number, and postal address when you create an account or place an order</li>
            <li>Payment information (processed securely through our payment partners — we do not store card details)</li>
            <li>Size preferences, wishlist items, and shopping history</li>
            <li>Communications you send to us via email or contact forms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Process and fulfill your orders, including sending order confirmations and shipping updates</li>
            <li>Manage your AV APPAREL account and rewards membership</li>
            <li>Send promotional communications (with your consent), including new arrivals, sales, and exclusive offers</li>
            <li>Improve our website, products, and services through analytics</li>
            <li>Detect and prevent fraud or unauthorized activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">3. Sharing of Information</h2>
          <p>We do not sell your personal information. We may share your data with:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 mt-2">
            <li>Shipping carriers to deliver your orders</li>
            <li>Payment processors to securely handle transactions</li>
            <li>Analytics providers to help us understand website usage</li>
            <li>Law enforcement when required by applicable law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">4. Data Security</h2>
          <p className="text-xs text-gray-600">We implement industry-standard security measures to protect your personal information, including SSL encryption, secure data storage, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">5. Cookies & Tracking</h2>
          <p className="text-xs text-gray-600">We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage your cookie preferences through our <Link href="/cookie-settings" className="underline hover:text-black">Cookie Settings</Link> page or your browser settings.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">6. Your Rights</h2>
          <p className="mb-2 text-xs text-gray-600">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">7. Data Retention</h2>
          <p className="text-xs text-gray-600">We retain your personal information for as long as your account is active or as needed to provide services. Order records are retained for a minimum of 5 years for legal and tax compliance purposes.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">8. Children&apos;s Privacy</h2>
          <p className="text-xs text-gray-600">Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">9. Contact Us</h2>
          <p className="text-xs text-gray-600">For privacy-related inquiries, please contact us at:</p>
          <div className="mt-2 text-xs text-gray-600">
            <p>AV APPAREL Privacy Team</p>
            <p>Email: privacy@avapparel.com</p>
            <p>Or use our <Link href="/contact" className="underline hover:text-black">Contact Form</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
