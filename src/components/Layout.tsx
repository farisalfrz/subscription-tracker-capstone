import React from "react";
import Footer from "./Footer";
import Link from "next/link";

// Props for the layout: children components
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    // Main layout container with background and text color
    <div className="bg-blue-50 min-h-screen text-slate-800 flex flex-col">
      {/* Header navigation bar */}
      <header className="bg-slate-100/80 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto max-w-3xl p-4 flex justify-between items-center">
          {/* App name link */}
          <Link href="/" className="text-xl font-bold text-slate-900">
            Subsavvy
          </Link>
          {/* Navigation links */}
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Profile
            </Link>
          </div>
        </nav>
      </header>
      {/* Main content area */}
      <main className="container mx-auto max-w-3xl p-4 flex-grow">
        {children}
      </main>
      {/* Footer section */}
      <Footer />
    </div>
  );
}
