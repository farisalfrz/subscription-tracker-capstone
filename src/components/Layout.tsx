import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto max-w-3xl p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">Subsavvy</h1>
        </nav>
      </header>
      <main className="container mx-auto max-w-3xl p-4">
        {children}
      </main>
    </div>
  );
}