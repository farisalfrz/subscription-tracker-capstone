// This is the About page for the Subsavvy app.
// It provides information about the app's mission, technology stack, and AI features.

export default function AboutPage() {
  return (
    // Main container with vertical spacing between sections
    <div className="space-y-8">
      
      {/* Header section: App name and tagline */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">About Subsavvy</h1>
        <p className="mt-2 text-lg text-slate-600">
          Your intelligent guide to subscription management.
        </p>
      </div>

      {/* Main content section styled with Tailwind's prose classes */}
      <div className="prose prose-slate max-w-none space-y-4">
        
        {/* Mission statement */}
        <h3>
          <strong>From Clutter to Clarity: The Mission</strong>
        </h3>
        <p>
          In today&apos;s digital world, it&apos;s easier than ever to subscribe
          to services but harder than ever to track them. A music stream here, a
          movie platform there. Before you know it, these small recurring costs
          add up. Subsavvy was born from this simple problem, and my mission is
          to provide you with a simple, beautiful, and intelligent tool to
          manage your subscriptions and empower you to make smarter spending
          decisions.
        </p>

        {/* Technology stack description */}
        <h3>
          <strong>The Technology Stack</strong>
        </h3>
        <p>
          To deliver a fast, modern, and reliable experience, Subsavvy is built
          on a foundation of industry-leading technologies:
        </p>
        <ul>
          <li>
            <strong>Next.js & React:</strong> For a high-performance,
            server-rendered user interface built with modern components.
          </li>
          <li>
            <strong>TypeScript:</strong> To ensure the code is robust, scalable,
            and free of common errors.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> For rapid, utility-first styling that
            creates a clean and consistent design.
          </li>
          <li>
            <strong>Replicate API:</strong> As a secure and scalable gateway to
            access powerful cloud-hosted AI models.
          </li>
        </ul>

        {/* GitHub repository link */}
        <div className="not-prose mt-6">
          <a
            href="https://github.com/farisalfrz/subscription-tracker-capstone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
          >
            {/* GitHub icon */}
            <svg
              className="w-4 h-4"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View GitHub Repository
          </a>
        </div>

        {/* AI model description */}
        <h3>
          <strong>The &quot;Savvy&quot;: Powered by IBM Granite</strong>
        </h3>
        <p>
          The intelligence at the heart of Subsavvy comes from{" "}
          <strong>IBM&apos;s Granite series of language models</strong>. I
          utilize a powerful Granite Instruct model to analyze your subscription
          list, taking into account different currencies and spending patterns,
          to provide financial advice that is genuinely helpful and contextual.
          This isn&apos;t just a tracker; it&apos;s a smart advisor helping you
          get the most value for your money.
        </p>

        {/* Link to the AI model on Replicate */}
        <div className="not-prose mt-6">
          <a
            href="https://replicate.com/ibm-granite/granite-3.3-8b-instruct"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
          >
            {/* Replicate icon */}
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            View Model on Replicate
          </a>
        </div>
      </div>
    </div>
  );
}
