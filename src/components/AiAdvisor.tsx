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

    // 1. Format data langganan menjadi sebuah prompt yang jelas untuk AI
    let subscriptionListText = "Here is my current list of digital subscriptions and their monthly costs:\n";
    subscriptions.forEach(sub => {
      const monthlyCost = sub.billingCycle === 'Yearly' ? (sub.cost / 12).toFixed(2) : sub.cost;
      subscriptionListText += `- ${sub.name}: $${monthlyCost} per month (Currency: ${sub.currency})\n`;
    });
    
    const finalPrompt = `${subscriptionListText}\nBased on this list, please provide 2-3 concise, actionable suggestions on how I could save money. Respond in simple bullet points.`;

    try {
      // 2. Panggil API Route internal 
      const response = await fetch('/api/get-ai-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // 3. Tampilkan output dari AI
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
      <h2 className="text-xl font-bold text-slate-900 mb-4">AI Cost-Saving Advisor (IBM Granite Instruct)</h2>
      <button
        onClick={handleGetSuggestion}
        disabled={isLoading || subscriptions.length === 0}
        className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? 'Analyzing...' : 'Get AI Suggestions'}
      </button>
      
      {/* Area untuk menampilkan hasil */}
      <div className="mt-4 p-4 bg-slate-50 rounded-md min-h-[100px] text-sm text-slate-700">
        {isLoading && <p>AI is thinking... please wait.</p>}
        {error && <p className="text-red-600">{error}</p>}
        {aiResponse && <p className="whitespace-pre-wrap">{aiResponse}</p>}
        {!isLoading && !error && !aiResponse && <p className="text-slate-400">Click the button above to get personalized saving tips based on your subscription list.</p>}
      </div>
    </div>
  );
}