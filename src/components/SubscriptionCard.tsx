import { Subscription } from "@/app/page";

type SubscriptionCardProps = {
  subscription: Subscription;
  onDelete: (id: number) => void;
  onEdit: (subscription: Subscription) => void;
};

export default function SubscriptionCard({ subscription, onDelete, onEdit }: SubscriptionCardProps) {
  
  // Fungsi helper untuk memformat harga sesuai mata uang
  const formatCurrency = (cost: number, currency: 'IDR' | 'USD') => {
    if (currency === 'IDR') {
      return cost.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });
    } else {
      return cost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-lg text-slate-900">{subscription.name}</h3>
        <p className="text-slate-500">
          {formatCurrency(subscription.cost, subscription.currency)} / {subscription.billingCycle === 'Monthly' ? 'month' : 'year'}
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onEdit(subscription)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          Edit
        </button>
        <button 
          onClick={() => onDelete(subscription.id)} 
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}