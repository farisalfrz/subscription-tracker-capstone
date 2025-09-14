import Link from "next/link";

export default function Footer() {
  return (
    // Footer container with background and border
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto max-w-4xl py-12 px-4">
        {/* Main footer content in grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding and description column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-lg font-bold text-slate-900">
              Subsavvy
            </Link>
            <p className="text-sm text-slate-500 mt-2 max-w-sm">
              Subsavvy is a smart subscription manager that helps you track your
              spending and provides AI-powered insights to help you save money.
            </p>
          </div>

          {/* Pages links column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Pages
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                About
              </Link>
              <Link
                href="/profile"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Legal links column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Legal
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="#"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Divider and bottom section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Subsavvy. Created by Faris
            Alfarizi.
          </p>
          {/* Built with logos */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">Built with</p>
            {/* Next.js logo */}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              title="Next.js"
            >
              <svg
                className="w-5 h-5 text-slate-600 hover:text-black"
                viewBox="0 0 180 180"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M90 15V165C131.421 165 165 131.421 165 90C165 48.5786 131.421 15 90 15Z" />
                <path d="M90 15L15 90V127.5L127.5 15H90Z" />
              </svg>
            </a>
            {/* Vercel logo */}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Vercel"
            >
              <svg
                className="w-5 h-5 text-slate-600 hover:text-black"
                viewBox="0 0 116 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M57.5 0L115 100H0L57.5 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
