"use client";

import { useState } from "react";
import { Subscription } from "@/app/page";

type AiAdvisorProps = {
  subscriptions: Subscription[];
};

export default function AiAdvisor({ subscriptions }: AiAdvisorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setAiResponse("");
    setError("");

    // 1. Membuat daftar langganan dengan format yang benar
    let subscriptionListText = "";
    subscriptions.forEach((sub) => {
      const monthlyCost =
        sub.billingCycle === "Yearly" ? sub.cost / 12 : sub.cost;
      const formattedCost =
        sub.currency === "IDR"
          ? `Rp${Math.round(monthlyCost).toLocaleString("id-ID")}`
          : `$${monthlyCost.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;

      subscriptionListText += `- ${sub.name}: ${formattedCost} per month (Currency: ${sub.currency})\n`;
    });

    const finalPrompt = `
    You are a savvy financial advisor specializing in managing digital subscriptions for users in Southeast Asia.

    Your goal is to provide trustworthy, actionable saving tips based on the user's subscription list below.
    Today's date is September 13, 2025. Use this for any time-sensitive information like exchange rates.

    Follow these strict rules:
    1.  Analyze the currencies in the user's list.
    2.  **If all subscriptions are in a single currency** (e.g., all IDR or all USD), provide saving tips directly in that context. **DO NOT** mention or suggest currency conversion as it is irrelevant.
    3.  **If subscriptions are in mixed currencies** (IDR and USD), your first and most important suggestion must be to compare them on a level playing field. Use the current exchange rate (as of today's date) to convert all prices to a single currency (IDR is preferred) and show the result.
    4.  For each suggestion, provide a brief **reason** why it's a good idea. This makes your advice more trustworthy.
    5.  Use currency symbols ($ and Rp) naturally in your response for clarity where appropriate.

    Provide the output as a simple, numbered list of bullet points. Start each point with a bolded title.
    Example: **1. Review Usage:** Regularly check if you still use this service...

    Here is the user's subscription list:
    ${subscriptionListText}
    `;

    try {
      // 2. Panggil API Route internal
      const response = await fetch("/api/get-ai-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // 3. Tampilkan output dari AI
      if (data.output && Array.isArray(data.output)) {
        setAiResponse(data.output.join(""));
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong while contacting the AI. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        AI Cost-Saving Advisor (IBM Granite Instruct)
      </h2>
      <button
        onClick={handleGetSuggestion}
        disabled={isLoading || subscriptions.length === 0}
        className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Analyzing..." : "Get AI Suggestions"}
      </button>

      {/* Area untuk menampilkan hasil */}
      <div className="mt-4 p-4 bg-slate-50 rounded-md min-h-[100px] text-sm text-slate-700">
        {isLoading && <p>AI is thinking... please wait.</p>}
        {error && <p className="text-red-600">{error}</p>}
        {aiResponse && <p className="whitespace-pre-wrap">{aiResponse}</p>}
        {!isLoading && !error && !aiResponse && (
          <p className="text-slate-400">
            Click the button above to get personalized saving tips based on your
            subscription list.
          </p>
        )}
      </div>
    </div>
  );
}
