"use client";

import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ECommerceOrder, SortConfig, PaginationConfig } from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface ECommerceTableProps {
  orders: ECommerceOrder[];
  sort: SortConfig<ECommerceOrder>;
  onSort: (sort: SortConfig<ECommerceOrder>) => void;
  pagination: PaginationConfig;
  onPageChange: (page: number) => void;
}

export default function ECommerceTable({
  orders,
  sort,
  onSort,
  pagination,
  onPageChange,
}: ECommerceTableProps) {
  const { t } = useTranslation();

  const handleSort = (key: keyof ECommerceOrder) => {
    if (sort.key === key) {
      onSort({ key, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      onSort({ key, direction: "desc" });
    }
  };

  const getSortIcon = (key: keyof ECommerceOrder) => {
    if (sort.key !== key) return <ArrowUpDown className="w-3 h-3 text-zinc-400 opacity-50" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="w-3 h-3 text-red-500" />
    ) : (
      <ArrowDown className="w-3 h-3 text-red-500" />
    );
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm dark:shadow-none backdrop-blur flex flex-col">
      {/* Table Title and Pagination Stats */}
      <div className="p-4 md:px-6 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            Detalle de Órdenes
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-mono">
            {pagination.totalItems} registros
          </span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.common.page} {pagination.currentPage} {t.dataDashboard.common.of}{" "}
            {pagination.totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200/60 dark:border-white/5 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <tr>
              <th
                onClick={() => handleSort("orderId")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  {t.dataDashboard.ecommerce.table.orderId}
                  {getSortIcon("orderId")}
                </div>
              </th>
              <th
                onClick={() => handleSort("orderDate")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  {t.dataDashboard.ecommerce.table.date}
                  {getSortIcon("orderDate")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.ecommerce.table.customer}</th>
              <th className="py-3 px-4">{t.dataDashboard.ecommerce.table.region}</th>
              <th className="py-3 px-4">{t.dataDashboard.ecommerce.table.product}</th>
              <th className="py-3 px-4">{t.dataDashboard.ecommerce.table.category}</th>
              <th
                onClick={() => handleSort("quantity")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.ecommerce.table.qty}
                  {getSortIcon("quantity")}
                </div>
              </th>
              <th
                onClick={() => handleSort("unitPrice")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.ecommerce.table.price}
                  {getSortIcon("unitPrice")}
                </div>
              </th>
              <th className="py-3 px-4 text-right">{t.dataDashboard.ecommerce.table.discount}</th>
              <th
                onClick={() => handleSort("totalRevenue")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.ecommerce.table.revenue}
                  {getSortIcon("totalRevenue")}
                </div>
              </th>
              <th
                onClick={() => handleSort("profit")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.ecommerce.table.profit}
                  {getSortIcon("profit")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.ecommerce.table.shipMode}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/40 dark:divide-white/5 font-mono">
            {orders.map((ord) => (
              <tr
                key={ord.orderId}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-bold text-red-500">{ord.orderId}</td>
                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300">{ord.orderDate}</td>
                <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-white">
                  {ord.customerName}
                </td>
                <td className="py-3 px-4 font-sans text-zinc-600 dark:text-zinc-300">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                    {ord.region}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-200">
                  {ord.productName}
                </td>
                <td className="py-3 px-4 font-sans text-zinc-600 dark:text-zinc-300">
                  {ord.category}
                </td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white font-bold">
                  {ord.quantity}
                </td>
                <td className="py-3 px-4 text-right text-zinc-600 dark:text-zinc-300">
                  ${ord.unitPrice.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-zinc-500">
                  {ord.discountPercent > 0 ? `${ord.discountPercent}%` : "—"}
                </td>
                <td className="py-3 px-4 text-right font-bold text-zinc-900 dark:text-white">
                  ${ord.totalRevenue.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right font-bold text-emerald-500">
                  +${ord.profit.toFixed(2)}
                </td>
                <td className="py-3 px-4 font-sans text-zinc-600 dark:text-zinc-400">
                  {ord.shipMode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
