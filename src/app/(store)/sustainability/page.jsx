"use client";

import Link from "next/link";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] bg-black flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
          alt="Sustainability"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative text-center text-white z-10 px-4">
          <p className="text-sm tracking-[0.3em] uppercase mb-4">Our Commitment</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4">SUSTAINABILITY</h1>
          <p className="text-lg font-light max-w-2xl mx-auto">
            Fashion that respects our planet. We&apos;re committed to creating a more sustainable future.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Vision */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-wider mb-6 text-center">OUR VISION</h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            At Calvin Klein, we believe that fashion and sustainability must go hand in hand. 
            Our goal is to minimize our environmental impact while continuing to deliver the modern, 
            minimalist designs our customers love. By 2030, we aim to achieve net-zero carbon emissions 
            across our entire supply chain.
          </p>
        </section>

        {/* Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-wider mb-10 text-center">OUR PILLARS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">Climate Action</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reducing greenhouse gas emissions across our operations and supply chain. 
                We&apos;ve already cut emissions by 30% since 2020.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">Responsible Materials</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transitioning to sustainable materials including organic cotton, recycled polyester, 
                and innovative bio-based fabrics. 60% of our materials are now sustainably sourced.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">People & Communities</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ensuring fair wages, safe working conditions, and equal opportunities throughout 
                our supply chain. We work with over 500 factories across 40 countries.
              </p>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="mb-16 bg-gray-50 p-8 md:p-12">
          <h2 className="text-2xl font-light tracking-wider mb-8 text-center">2030 GOALS</h2>
          <div className="space-y-6">
            {[
              { target: "100%", desc: "sustainably sourced cotton by 2027" },
              { target: "50%", desc: "reduction in water usage across supply chain" },
              { target: "Net Zero", desc: "carbon emissions by 2030" },
              { target: "Zero", desc: "waste to landfill from owned and operated facilities" },
              { target: "100%", desc: "of packaging recyclable, reusable, or compostable" },
            ].map((goal, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-xl font-semibold text-black min-w-[100px]">{goal.target}</span>
                <span className="text-gray-600 pt-1">{goal.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Circular Fashion */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-wider mb-6 text-center">CIRCULAR FASHION</h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-8">
            We&apos;re designing products to last longer and be recycled at end of life. 
            Our take-back program allows customers to return worn garments for recycling, 
            keeping materials in circulation and out of landfills.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6">
              <h3 className="font-medium mb-2">CK Resale</h3>
              <p className="text-sm text-gray-600">
                Give your pre-loved Calvin Klein a second life. Our resale platform connects sellers 
                with new owners, extending the life of every garment.
              </p>
            </div>
            <div className="border border-gray-200 p-6">
              <h3 className="font-medium mb-2">CK Take-Back</h3>
              <p className="text-sm text-gray-600">
                Bring any worn-out CK garment to our stores. We&apos;ll recycle the materials 
                and reward you with loyalty points toward your next purchase.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-6">
            Want to learn more about our sustainability journey?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition"
          >
            GET IN TOUCH
          </Link>
        </section>
      </div>
    </div>
  );
}
