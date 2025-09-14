import { Subscription } from "@/app/page";

// Props for the subscription card: subscription data, delete and edit handlers
type SubscriptionCardProps = {
  subscription: Subscription;
  onDelete: (id: number) => void;
  onEdit: (subscription: Subscription) => void;
};

export default function SubscriptionCard({
  subscription,
  onDelete,
  onEdit,
}: SubscriptionCardProps) {
  // Format the cost based on currency
  const formatCurrency = (cost: number, currency: "IDR" | "USD") => {
    if (currency === "IDR") {
      return cost.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    } else {
      return cost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
  };

  return (
    // Card UI for a single subscription
    <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
      <div>
        {/* Subscription name */}
        <h3 className="font-bold text-lg text-slate-900">
          {subscription.name}
        </h3>
        {/* Cost and billing cycle */}
        <p className="text-slate-500">
          {formatCurrency(subscription.cost, subscription.currency)} /{" "}
          {subscription.billingCycle === "Monthly" ? "month" : "year"}
        </p>
      </div>
      {/* Edit and Delete buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => onEdit(subscription)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(subscription.id)}
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
