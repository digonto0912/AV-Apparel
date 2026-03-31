import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-medium tracking-tight mb-4">404</h1>
        <h2 className="text-xl font-medium mb-3">Page Not Found</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="border border-black px-8 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
