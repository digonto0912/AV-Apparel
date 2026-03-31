"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black text-white min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-medium tracking-[0.08em] mb-4">AV APPAREL</h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Bold. Progressive. Provocative. Since 1968.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Our Story</h2>
          <div className="space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
            <p>
              Founded in 1968 in New York City, AV APPAREL has defined modern American style for over five decades.
              What began as a coat shop in the York Hotel has grown into one of the most recognized fashion brands in
              the world — rooted in minimalism, sensuality, and cultural relevance.
            </p>
            <p>
              From iconic denim and underwear to refined ready-to-wear, AV APPAREL stands for bold simplicity.
              Our designs strip away the unnecessary, focusing on clean lines, premium materials, and a modern
              aesthetic that speaks to how people live today.
            </p>
            <p>
              With groundbreaking campaigns featuring cultural icons — from Brooke Shields and Kate Moss to
              Justin Bieber and Jennie Kim — AV APPAREL has always been more than fashion. It is a cultural force
              that reflects and shapes the zeitgeist.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Minimalism",
                desc: "Less is more. Our design philosophy celebrates restraint — clean silhouettes, neutral palettes, and timeless pieces that transcend trends.",
              },
              {
                title: "Inclusivity",
                desc: "AV APPAREL is for everyone. We celebrate all bodies, all identities, and all expressions of self. Fashion should empower, never exclude.",
              },
              {
                title: "Sustainability",
                desc: "We are committed to reducing our environmental impact through sustainable materials, ethical manufacturing, and a circular future for fashion.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center md:text-left">
                <h3 className="text-lg font-medium mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-10 text-center">Milestones</h2>
          <div className="space-y-8">
            {[
              { year: "1968", text: "AV APPAREL founded in New York City. First collection: a line of coats." },
              { year: "1978", text: "Launch of AV APPAREL Jeans — denim becomes a fashion statement." },
              { year: "1982", text: "Introduction of AV APPAREL Underwear with the iconic waistband." },
              { year: "1994", text: "AV One fragrance launches — the first unisex scent for a generation." },
              { year: "2003", text: "Acquired by PVH Corp.; global expansion accelerates." },
              { year: "2017", text: "Raf Simons named Chief Creative Officer, ushering in the AV APPAREL 205W39NYC era." },
              { year: "2020", text: "Sustainability pledge: 100% sustainable cotton and zero waste by 2030." },
              { year: "2026", text: "Continued innovation in digital retail, inclusivity, and modern American style." },
            ].map((item) => (
              <div key={item.year} className="flex gap-6">
                <span className="text-xl font-medium w-16 flex-shrink-0">{item.year}</span>
                <p className="text-sm text-gray-600 leading-relaxed pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">Experience AV APPAREL</h2>
        <p className="text-sm text-gray-300 mb-8 max-w-lg mx-auto">
          Discover the latest collections and find your perfect fit.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/products?gender=Women" className="border border-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors">
            Shop Women
          </Link>
          <Link href="/products?gender=Men" className="border border-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors">
            Shop Men
          </Link>
        </div>
      </section>
    </div>
  );
}
