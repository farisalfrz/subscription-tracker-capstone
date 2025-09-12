import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Daftar Langganan
        </h1>
        <button className="bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">
          + Tambah Baru
        </button>
      </div>
      
      {/* Menampilkan beberapa contoh kartu dengan data statis */}
      <div className="space-y-4">
        <SubscriptionCard name="Netflix Premium" cost={186000} billingCycle="Bulanan" />
        <SubscriptionCard name="Spotify Family" cost={869000} billingCycle="Tahunan" />
        <SubscriptionCard name="Adobe Creative Cloud" cost={750000} billingCycle="Bulanan" />
      </div>
    </Layout>
  );
}