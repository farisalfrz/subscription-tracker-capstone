"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/SubscriptionCard';
import SubscriptionForm from '@/components/SubscriptionForm';
import AiAdvisor from '@/components/AiAdvisor';
import toast from 'react-hot-toast';

// Defining the data structure with English types
export interface Subscription {
  id: number;
  name: string;
  cost: number;
  billingCycle: 'Monthly' | 'Yearly';
  currency: 'IDR' | 'USD';
}

export default function HomePage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  // Effect to load data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSubscriptions = localStorage.getItem('subscriptions');
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions));
      }
    }
  }, []);

  // Effect to save data to localStorage whenever subscriptions change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  // --- CRUD Functions ---

  const handleAddSubscription = (newSubscription: Omit<Subscription, 'id'>) => {
    const subscriptionWithId = { ...newSubscription, id: Date.now() };
    setSubscriptions([...subscriptions, subscriptionWithId]);
    setShowForm(false);
    toast.success('Subscription added successfully!');
  };

  const handleDeleteSubscription = (idToDelete: number) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== idToDelete);
    setSubscriptions(updatedSubscriptions);
    toast.error('Subscription deleted.');
  };

  const handleUpdateSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
    setEditingSubscription(null);
    setShowForm(false);
    toast.success('Subscription updated!');
  };
  
  const handleEditClick = (subscriptionToEdit: Subscription) => {
    setEditingSubscription(subscriptionToEdit);
    setShowForm(true);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (editingSubscription) {
      setEditingSubscription(null);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Subscriptions
        </h1>
        <button onClick={handleToggleForm} className="bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
          {showForm ? 'Close Form' : '+ Add New'}
        </button>
      </div>

      {showForm && (
        <SubscriptionForm 
          onAddSubscription={handleAddSubscription}
          onUpdateSubscription={handleUpdateSubscription}
          editingData={editingSubscription}
        />
      )}

      <div className="space-y-4 mt-6">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              subscription={sub}
              onDelete={handleDeleteSubscription}
              onEdit={handleEditClick}
            />
          ))
        ) : (
          <div className="text-center p-12 bg-white rounded-lg border border-dashed border-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">No Subscriptions</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by adding a new subscription.</p>
          </div>
        )}
      </div>
      <AiAdvisor subscriptions={subscriptions} />
    </Layout>
  );
}