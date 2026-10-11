"use client";

import DonutDistributionChart from "./DonutDistributionChart";

interface PaymentStatusItem {
  label: string;
  value: number;
}

interface PaymentStatusChartProps {
  data: PaymentStatusItem[];
}

export default function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  const colors: Record<string, string> = {
    Paid: "#10b981", // emerald-500
    Pending: "#ef4444", // red-500
    "Partially Paid": "#f59e0b", // amber-500
  };

  const formattedData = data.map((item) => ({
    label: item.label,
    value: item.value,
    color: colors[item.label] || "#ef4444",
  }));

  return <DonutDistributionChart data={formattedData} centerLabel="Facturas" />;
}
