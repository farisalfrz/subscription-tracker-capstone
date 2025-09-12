import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    // Memberi warna latar belakang abu-abu muda ke seluruh halaman
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <nav className="container mx-auto max-w-3xl p-4">
          <h1 className="text-xl font-bold text-slate-900">SubTracker AI</h1>
        </nav>
      </header>
      <main className="container mx-auto max-w-3xl p-4">
        {children}
      </main>
    </div>
  );
}