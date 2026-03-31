"use client";

import { useState } from "react";
import Link from "next/link";

const DEPARTMENTS = [
  {
    name: "Design & Creative",
    description: "Shape the future of modern fashion. Work with world-class designers to create iconic collections.",
    roles: ["Senior Designer — Menswear", "Junior Designer — Womenswear", "Textile Designer", "Creative Director Assistant"],
  },
  {
    name: "Marketing & Digital",
    description: "Drive brand storytelling across global campaigns, social media, and digital experiences.",
    roles: ["Digital Marketing Manager", "Social Media Coordinator", "Content Strategist", "E-Commerce Analyst"],
  },
  {
    name: "Retail & Sales",
    description: "Be the face of Calvin Klein. Deliver exceptional customer experiences in our stores worldwide.",
    roles: ["Store Manager — New York", "Sales Associate — London", "Visual Merchandiser", "Regional Sales Director"],
  },
  {
    name: "Technology & Engineering",
    description: "Build the digital infrastructure powering a global fashion brand.",
    roles: ["Full Stack Developer", "UX/UI Designer", "Data Engineer", "DevOps Engineer"],
  },
  {
    name: "Supply Chain & Operations",
    description: "Ensure our products reach customers efficiently and sustainably.",
    roles: ["Supply Chain Analyst", "Logistics Manager", "Sustainability Coordinator", "Quality Assurance Specialist"],
  },
  {
    name: "Corporate & Finance",
    description: "Support the business strategy behind one of the most recognized brands in the world.",
    roles: ["Financial Analyst", "HR Business Partner", "Legal Counsel", "Business Development Manager"],
  },
];

const VALUES = [
  { title: "Innovation", desc: "We push boundaries in design, technology, and sustainability." },
  { title: "Inclusivity", desc: "We celebrate diversity and create a culture where everyone belongs." },
  { title: "Integrity", desc: "We act with honesty, transparency, and accountability." },
  { title: "Boldness", desc: "We take risks, challenge conventions, and dare to be different." },
];

export default function CareersPage() {
  const [expandedDept, setExpandedDept] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] bg-black flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80"
          alt="Calvin Klein Office"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative text-center text-white z-10 px-4">
          <p className="text-sm tracking-[0.3em] uppercase mb-4">Join Our Team</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4">CAREERS</h1>
          <p className="text-lg font-light max-w-2xl mx-auto">
            Build your future with one of the world&apos;s most iconic fashion brands.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Intro */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-light tracking-wider mb-6">WHY CALVIN KLEIN</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Calvin Klein is more than a fashion brand — it&apos;s a cultural icon. For over 50 years, 
            we&apos;ve defined modern American style with bold, minimalist design. As part of our team, 
            you&apos;ll work alongside creative thinkers, innovators, and passionate individuals who 
            are shaping the future of fashion.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-wider mb-10 text-center">OUR VALUES</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center p-6 border border-gray-200">
                <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16 bg-gray-50 p-8 md:p-12">
          <h2 className="text-2xl font-light tracking-wider mb-8 text-center">BENEFITS & PERKS</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Competitive salary & performance bonuses",
              "Generous employee discount on CK products",
              "Flexible & hybrid work arrangements",
              "Health, dental & vision insurance",
              "401(k) with company match",
              "Paid parental leave",
              "Professional development & tuition assistance",
              "Wellness programs & gym membership",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <svg className="w-5 h-5 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-wider mb-10 text-center">OPEN POSITIONS</h2>
          <div className="space-y-4">
            {DEPARTMENTS.map((dept, i) => (
              <div key={dept.name} className="border border-gray-200">
                <button
                  onClick={() => setExpandedDept(expandedDept === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-medium">{dept.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{dept.roles.length} open roles</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedDept === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDept === i && (
                  <div className="border-t border-gray-200 p-5 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                    <div className="space-y-3">
                      {dept.roles.map((role) => (
                        <div key={role} className="flex items-center justify-between bg-white p-3 border border-gray-100">
                          <span className="text-sm font-medium">{role}</span>
                          <Link
                            href="/contact"
                            className="text-xs bg-black text-white px-4 py-1.5 hover:bg-gray-800 transition"
                          >
                            APPLY
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <h2 className="text-xl font-light tracking-wider mb-3">DON&apos;T SEE YOUR ROLE?</h2>
          <p className="text-gray-600 mb-6 text-sm">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll be in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition"
          >
            CONTACT US
          </Link>
        </section>
      </div>
    </div>
  );
}
