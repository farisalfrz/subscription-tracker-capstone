"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/SubscriptionCard';
import SubscriptionForm from '@/components/SubscriptionForm';

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
  };

  const handleDeleteSubscription = (idToDelete: number) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== idToDelete);
    setSubscriptions(updatedSubscriptions);
  };

  const handleUpdateSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
    setEditingSubscription(null);
    setShowForm(false);
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
        <button onClick={handleToggleForm} className="bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">
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
          <div className="text-center p-8 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">You haven't added any subscriptions yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}