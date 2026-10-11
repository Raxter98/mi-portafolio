"use client";

import dynamic from "next/dynamic";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DatasetSelector from "@/components/dashboard/DatasetSelector";
import { useDashboardAnalytics } from "@/components/dashboard/hooks/useDashboardAnalytics";
import { useTranslation } from "@/hooks/useTranslation";
import Footer from "@/components/footer/page";

// Dynamic imports for dashboard views
const ECommerceDashboardView = dynamic(
  () => import("@/components/dashboard/ecommerce/ECommerceDashboardView"),
  { ssr: false }
);

const HospitalDashboardView = dynamic(
  () => import("@/components/dashboard/hospital/HospitalDashboardView"),
  { ssr: false }
);

export default function DataAnalysisPage() {
  const { t } = useTranslation();
  const analytics = useDashboardAnalytics();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Page Introductory Header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {t.dataDashboard.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.dataDashboard.description}
          </p>
        </div>

        {/* Dataset Selector Control */}
        <div className="mb-8">
          <DatasetSelector
            activeDataset={analytics.activeDataset}
            onSelectDataset={analytics.setActiveDataset}
          />
        </div>

        {/* Dynamic Dataset Views (Strict Logical Separation) */}
        <div className="transition-all duration-300">
          {analytics.activeDataset === "ecommerce" ? (
            <div id="panel-ecommerce" role="tabpanel" aria-labelledby="tab-ecommerce">
              <ECommerceDashboardView analytics={analytics} />
            </div>
          ) : (
            <div id="panel-hospital" role="tabpanel" aria-labelledby="tab-hospital">
              <HospitalDashboardView analytics={analytics} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
