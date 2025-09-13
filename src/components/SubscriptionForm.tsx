"use client";
import { useState, useEffect } from 'react';
import { Subscription } from '@/app/page';

type FormProps = {
  onAddSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  onUpdateSubscription: (subscription: Subscription) => void;
  editingData: Subscription | null;
};

export default function SubscriptionForm({ onAddSubscription, onUpdateSubscription, editingData }: FormProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [cycle, setCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');

  const isEditMode = editingData !== null;

  useEffect(() => {
    if (isEditMode) {
      setName(editingData.name);
      setCost(String(editingData.cost));
      setCycle(editingData.billingCycle);
      setCurrency(editingData.currency);
    }
  }, [editingData, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cost) return;
    const subscriptionData = { name, cost: parseFloat(cost), billingCycle: cycle, currency };
    if (isEditMode) {
      onUpdateSubscription({ ...editingData, ...subscriptionData });
    } else {
      onAddSubscription(subscriptionData);
    }
    setName(''); setCost(''); setCycle('Monthly'); setCurrency('IDR');
  };

  const costPlaceholder = currency === 'IDR' ? 'e.g., 50000' : 'e.g., 15.99';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 space-y-6 mb-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">{isEditMode ? 'Edit Subscription' : 'Add New Subscription'}</h2>
      
      {/* Input Nama */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Subscription Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g., Netflix Premium"
          className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500" 
          required
        />
      </div>

      {/* Input Biaya & Siklus Tagihan dalam satu baris */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Biaya & Mata Uang (Digabung) */}
        <div>
          <label htmlFor="cost" className="block text-sm font-semibold text-slate-700 mb-1">Cost</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Simbol mata uang berubah dinamis */}
              <span className="text-slate-500 sm:text-sm">{currency === 'IDR' ? 'Rp' : '$'}</span>
            </div>
            <input 
              type="number" 
              id="cost" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)}
              placeholder={costPlaceholder}
              className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              required
              min="0"
              step="any"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select 
                id="currency" 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as 'IDR' | 'USD')}
                className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm"
              >
                <option>IDR</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pilihan Siklus Tagihan */}
        <div>
          <label htmlFor="cycle" className="block text-sm font-semibold text-slate-700 mb-1">Billing Cycle</label>
          <select 
            id="cycle" 
            value={cycle} 
            onChange={(e) => setCycle(e.target.value as 'Monthly' | 'Yearly')}
            className="appearance-none block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-chevron-down bg-no-repeat bg-right pr-8"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      
      {/* Tombol Simpan */}
      <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 cursor-pointer">
        {isEditMode ? 'Save Changes' : 'Save Subscription'}
      </button>
    </form>
  );
}