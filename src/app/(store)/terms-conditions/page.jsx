"use client";
import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Terms & Conditions</span>
      </p>

      <h1 className="text-2xl font-light tracking-wider uppercase mb-10">Terms & Conditions</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">1. Acceptance of Terms</h2>
          <p className="text-xs text-gray-600">By accessing and using the AV APPAREL website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website or services.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">2. Account Registration</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>You must provide accurate, current, and complete information during registration</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must be at least 16 years old to create an account</li>
            <li>One account per person — duplicate accounts may be suspended</li>
            <li>You are responsible for all activity that occurs under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">3. Orders & Pricing</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>All prices are displayed in USD and include applicable taxes unless stated otherwise</li>
            <li>We reserve the right to correct pricing errors — if an item is listed at an incorrect price, we will notify you before processing</li>
            <li>An order confirmation email does not constitute acceptance — acceptance occurs when the item ships</li>
            <li>We reserve the right to limit quantities or refuse orders at our discretion</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">4. Payment</h2>
          <p className="text-xs text-gray-600">We currently accept Cash on Delivery (COD) as our payment method. Full payment is collected upon delivery of your order. Failure to pay upon delivery may result in account restrictions.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">5. Shipping & Delivery</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Free standard shipping on all orders over $75</li>
            <li>Estimated delivery times are approximate and not guaranteed</li>
            <li>Risk of loss transfers to you upon delivery to the carrier</li>
            <li>We are not responsible for delays caused by carriers, customs, or events beyond our control</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">6. Returns & Exchanges</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Items may be returned within 30 days of delivery in original, unworn condition with all tags attached</li>
            <li>Underwear, swimwear, and personalized items are final sale and cannot be returned</li>
            <li>Refunds are processed within 7-10 business days of receiving the returned item</li>
            <li>Original shipping costs are non-refundable unless the return is due to our error</li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">For complete details, visit our <Link href="/shipping-returns" className="underline hover:text-black">Shipping & Returns</Link> page.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">7. AV APPAREL Rewards</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Points are earned at a rate of 1 point per $1 spent</li>
            <li>Points have no cash value and cannot be transferred</li>
            <li>We reserve the right to modify the rewards program or point values at any time</li>
            <li>Fraudulent activity will result in forfeiture of all points and account termination</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">8. Intellectual Property</h2>
          <p className="text-xs text-gray-600">All content on this website — including logos, text, images, graphics, and design — is the property of AV APPAREL and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">9. Prohibited Conduct</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Using the site for any unlawful purpose</li>
            <li>Attempting to gain unauthorized access to any part of the website</li>
            <li>Using bots, scrapers, or automated tools to access the site</li>
            <li>Purchasing items for resale without authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">10. Limitation of Liability</h2>
          <p className="text-xs text-gray-600">To the maximum extent permitted by law, AV APPAREL shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">11. Changes to These Terms</h2>
          <p className="text-xs text-gray-600">We may update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.</p>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wider uppercase text-black mb-3">12. Contact</h2>
          <p className="text-xs text-gray-600">For questions about these Terms, please reach out via our <Link href="/contact" className="underline hover:text-black">Contact Form</Link> or email legal@avapparel.com.</p>
        </section>
      </div>
    </div>
  );
}
