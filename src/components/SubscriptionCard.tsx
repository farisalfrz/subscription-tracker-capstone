type SubscriptionCardProps = {
  name: string;
  cost: number;
  billingCycle: 'Bulanan' | 'Tahunan';
};

export default function SubscriptionCard({ name, cost, billingCycle }: SubscriptionCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-lg text-slate-900">{name}</h3>
        <p className="text-slate-500">
          {/* Format angka menjadi format mata uang Rupiah */}
          Rp {cost.toLocaleString('id-ID')} / {billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
        </p>
      </div>
      <div className="flex gap-3">
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
        <button className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">Hapus</button>
      </div>
    </div>
  );
}