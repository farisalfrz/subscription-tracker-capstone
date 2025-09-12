"use client";
import { useState } from 'react';
import { Subscription } from '@/app/page';

// Mendefinisikan tipe props yang akan diterima komponen ini dari parent (page.tsx)
type FormProps = {
  onAddSubscription: (subscription: Omit<Subscription, 'id'>) => void;
};

export default function SubscriptionForm({ onAddSubscription }: FormProps) {
  // State untuk setiap input di dalam form
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [cycle, setCycle] = useState<'Bulanan' | 'Tahunan'>('Bulanan');

  // Fungsi ini akan berjalan saat tombol "Simpan" diklik
  const handleSubmit = (e: React.FormEvent) => {
    // Mencegah halaman refresh saat form di-submit
    e.preventDefault();

    // Console.log untuk debugging, Anda bisa melihat ini di browser console
    console.log('Form submitted with data:', { name, cost, cycle });

    // Validasi sederhana: pastikan nama dan biaya tidak kosong
    if (!name || !cost) {
      alert('Nama langganan dan biaya tidak boleh kosong!');
      return;
    }

    // Panggil fungsi yang diberikan dari parent (page.tsx) dengan data baru
    onAddSubscription({
      name,
      cost: parseFloat(cost), // Ubah string biaya menjadi angka
      billingCycle: cycle,
    });

    // Reset form ke kondisi awal setelah berhasil submit
    setName('');
    setCost('');
    setCycle('Bulanan');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 space-y-4 mb-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Tambah Langganan Baru</h2>
      
      {/* Input untuk Nama Langganan */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Langganan</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="cth: Netflix Premium"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" 
          required
        />
      </div>

      {/* Input untuk Biaya */}
      <div>
        <label htmlFor="cost" className="block text-sm font-medium text-slate-700">Biaya</label>
        <input 
          type="number" 
          id="cost" 
          value={cost} 
          onChange={(e) => setCost(e.target.value)}
          placeholder="cth: 186000"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
          required
          min="0"
        />
      </div>

      {/* Pilihan untuk Siklus Tagihan */}
      <div>
        <label htmlFor="cycle" className="block text-sm font-medium text-slate-700">Siklus Tagihan</label>
        <select 
          id="cycle" 
          value={cycle} 
          onChange={(e) => setCycle(e.target.value as 'Bulanan' | 'Tahunan')}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
        >
          <option value="Bulanan">Bulanan</option>
          <option value="Tahunan">Tahunan</option>
        </select>
      </div>
      
      {/* Tombol Simpan */}
      <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
        Simpan
      </button>
    </form>
  );
}
