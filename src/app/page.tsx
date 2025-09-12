"use client";
import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/SubscriptionCard';
import SubscriptionForm from '@/components/SubscriptionForm';

import { useState, useEffect } from 'react'; 

export interface Subscription {
  id: number;
  name: string;
  cost: number;
  billingCycle: 'Bulanan' | 'Tahunan';
}

export default function HomePage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSubscriptions = localStorage.getItem('subscriptions');
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  const [showForm, setShowForm] = useState(false);

  const handleAddSubscription = (newSubscription: Omit<Subscription, 'id'>) => {
    const subscriptionWithId = { ...newSubscription, id: Date.now() };
    setSubscriptions([...subscriptions, subscriptionWithId]);
    setShowForm(false); 
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Daftar Langganan
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">
          {showForm ? 'Tutup' : '+ Tambah Baru'}
        </button>
      </div>

      {showForm && <SubscriptionForm onAddSubscription={handleAddSubscription} />}
      
      <div className="space-y-4">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              name={sub.name}
              cost={sub.cost}
              billingCycle={sub.billingCycle}
            />
          ))
        ) : (
          <div className="text-center p-8 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">Anda belum menambahkan langganan.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}