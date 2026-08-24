import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Dashboard | MUSA Cafe & Restaurant",
};

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <section>
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Overview
          </p>

          <h2 className="mt-2 font-display text-4xl text-brand-ivory">
            Welcome back.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted">
            Manage your restaurant menu, deals, gallery and business information
            from one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            label="Menu Items"
            value="3"
            description="Currently available"
          />

          <DashboardCard
            label="Categories"
            value="9"
            description="Menu categories"
          />

          <DashboardCard
            label="Orders"
            value="—"
            description="WhatsApp orders"
          />

          <DashboardCard
            label="Deals"
            value="1"
            description="Active promotions"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-brand-surface p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">
            Next
          </p>

          <h3 className="mt-2 font-display text-2xl text-brand-ivory">
            Menu management
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted">
            Add, edit, remove and manage restaurant menu items without changing
            the website code.
          </p>
        </div>
      </section>
    </AdminLayout>
  );
}

function DashboardCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-surface p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">
        {label}
      </p>

      <p className="mt-4 font-display text-4xl text-brand-ivory">{value}</p>

      <p className="mt-2 text-xs text-brand-muted">{description}</p>
    </div>
  );
}
