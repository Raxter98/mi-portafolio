"use client";

import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { HospitalPatient, SortConfig, PaginationConfig } from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface HospitalTableProps {
  patients: HospitalPatient[];
  sort: SortConfig<HospitalPatient>;
  onSort: (sort: SortConfig<HospitalPatient>) => void;
  pagination: PaginationConfig;
  onPageChange: (page: number) => void;
}

export default function HospitalTable({
  patients,
  sort,
  onSort,
  pagination,
  onPageChange,
}: HospitalTableProps) {
  const { t } = useTranslation();

  const handleSort = (key: keyof HospitalPatient) => {
    if (sort.key === key) {
      onSort({ key, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      onSort({ key, direction: "desc" });
    }
  };

  const getSortIcon = (key: keyof HospitalPatient) => {
    if (sort.key !== key) return <ArrowUpDown className="w-3 h-3 text-zinc-400 opacity-50" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="w-3 h-3 text-red-500" />
    ) : (
      <ArrowDown className="w-3 h-3 text-red-500" />
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Pending":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Partially Paid":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-zinc-100 text-zinc-600";
    }
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm dark:shadow-none backdrop-blur flex flex-col">
      {/* Table Title and Pagination Stats */}
      <div className="p-4 md:px-6 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            Registro de Pacientes
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
                onClick={() => handleSort("patientId")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  {t.dataDashboard.hospital.table.patientId}
                  {getSortIcon("patientId")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.patientName}</th>
              <th
                onClick={() => handleSort("age")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.hospital.table.age}
                  {getSortIcon("age")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.gender}</th>
              <th
                onClick={() => handleSort("admissionDate")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  {t.dataDashboard.hospital.table.admission}
                  {getSortIcon("admissionDate")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.discharge}</th>
              <th
                onClick={() => handleSort("lengthOfStayDays")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.hospital.table.los}
                  {getSortIcon("lengthOfStayDays")}
                </div>
              </th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.department}</th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.diagnosis}</th>
              <th
                onClick={() => handleSort("totalBillAmount")}
                className="py-3 px-4 cursor-pointer hover:text-red-500 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  {t.dataDashboard.hospital.table.totalBill}
                  {getSortIcon("totalBillAmount")}
                </div>
              </th>
              <th className="py-3 px-4 text-right">{t.dataDashboard.hospital.table.coverage}</th>
              <th className="py-3 px-4">{t.dataDashboard.hospital.table.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/40 dark:divide-white/5 font-mono">
            {patients.map((p) => (
              <tr
                key={p.patientId}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-bold text-red-500">{p.patientId}</td>
                <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-white">
                  {p.patientName}
                </td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{p.age}</td>
                <td className="py-3 px-4 font-sans text-zinc-600 dark:text-zinc-300">{p.gender}</td>
                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300">{p.admissionDate}</td>
                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300">{p.dischargeDate}</td>
                <td className="py-3 px-4 text-right font-bold text-amber-500">
                  {p.lengthOfStayDays} d
                </td>
                <td className="py-3 px-4 font-sans">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                    {p.department}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300 max-w-xs truncate">
                  {p.diagnosis}
                </td>
                <td className="py-3 px-4 text-right font-bold text-zinc-900 dark:text-white">
                  ${p.totalBillAmount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-zinc-600 dark:text-zinc-300">
                  {p.insuranceCoveragePercent}%
                </td>
                <td className="py-3 px-4 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                      p.paymentStatus
                    )}`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
