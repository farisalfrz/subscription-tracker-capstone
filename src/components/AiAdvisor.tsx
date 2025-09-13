"use client";

import { useState } from 'react';
import { Subscription } from '@/app/page';

type AiAdvisorProps = {
  subscriptions: Subscription[];
};

export default function AiAdvisor({ subscriptions }: AiAdvisorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setAiResponse('');
    setError('');

    let subscriptionListText = "";
    subscriptions.forEach(sub => {
      const monthlyCost = sub.billingCycle === 'Yearly' ? (sub.cost / 12) : sub.cost;
      const formattedCost = sub.currency === 'IDR' 
        ? `Rp${Math.round(monthlyCost).toLocaleString('id-ID')}` 
        : `$${parseFloat(monthlyCost.toFixed(2)).toLocaleString('en-US')}`;
      subscriptionListText += `- ${sub.name}: ${formattedCost} per month\n`;
    });
    
    const currentDate = new Date().toLocaleDateString('en-CA');

    // Prompt A: Untuk mata uang campuran (sedikit disempurnakan)
    const mixedCurrencyPrompt = `
      You are "SubSavvy", an expert AI financial coach. Your first task is to help the user understand their spending by converting all their subscriptions to a single currency (IDR). Use today's date (${currentDate}) and a realistic exchange rate. 
      After showing the conversion summary, provide 1-2 other insightful, non-obvious saving tips based on the combined list.

      Here is the list:
      ${subscriptionListText}

      Provide the output as a simple, numbered list of bullet points. Start each point with a bolded title.
    `;

    // Prompt B: Untuk mata uang tunggal (dirombak total menjadi lebih ahli)
    const singleCurrencyPrompt = `
      You are "SubSavvy", an expert AI financial coach specializing in helping young professionals manage and optimize their digital subscriptions. Your advice must be insightful, creative, and go beyond generic tips.

      Before providing suggestions, mentally analyze the user's list through these three lenses:
      1.  **Redundancy:** Are there overlapping services? (e.g., multiple music or video streaming platforms).
      2.  **Value Optimization:** Is the user on the right tier? Could they get more value via family plans, annual discounts, or student plans?
      3.  **Alternatives:** Are there more cost-effective or local alternatives?

      Based on your analysis, provide 3 highly practical and insightful suggestions for the subscription list below. Frame your advice in an encouraging and expert tone.
      DO NOT mention currency conversion at all.

      Here is the list:
      ${subscriptionListText}

      Provide the output as a simple, numbered list of bullet points. Start each point with a bolded title.
    `;
    
    const currencies = new Set(subscriptions.map(sub => sub.currency));
    const isMixedCurrency = currencies.size > 1;
    const finalPrompt = isMixedCurrency ? mixedCurrencyPrompt : singleCurrencyPrompt;

    try {
      // ... (sisa kode fetch tidak berubah)
      const response = await fetch('/api/get-ai-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) { throw new Error(`Error: ${response.statusText}`); }
      const data = await response.json();
      if (data.output && Array.isArray(data.output)) {
        setAiResponse(data.output.join(''));
      }

    } catch (err) {
      setError('Sorry, something went wrong while contacting the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-1">AI Cost-Saving Advisor</h2>
      <p className="text-sm text-slate-500 mb-4">Powered by IBM Granite Instruct</p>
      <button
        onClick={handleGetSuggestion}
        disabled={isLoading || subscriptions.length === 0}
        className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? 'Analyzing...' : 'Get AI Suggestions'}
      </button>
      
      <div className="mt-4 p-4 bg-slate-50 rounded-md min-h-[100px] text-sm text-slate-700">
        {isLoading && <p className="animate-pulse">AI is thinking... please wait.</p>}
        {error && <p className="text-red-500">{error}</p>}
        {aiResponse && <p className="whitespace-pre-wrap">{aiResponse}</p>}
        {!isLoading && !error && !aiResponse && <p className="text-slate-400">Click the button above to get personalized saving tips based on your subscription list.</p>}
      </div>
    </div>
  );
}