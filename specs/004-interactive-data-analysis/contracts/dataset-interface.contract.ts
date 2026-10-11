/**
 * UI & Component Contract Interfaces for Interactive Data Analysis & Visualization
 */

import {
  DatasetId,
  ECommerceOrder,
  HospitalPatient,
  ECommerceFilterState,
  HospitalFilterState,
  DashboardKPICard,
  SortConfig,
  PaginationConfig,
} from "../../../types/data-analysis";

/**
 * Contract: Homepage Spotlight Section Props
 */
export interface DataAnalysisSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

/**
 * Contract: Dedicated Analytics Dashboard State Hook
 */
export interface UseDashboardAnalyticsReturn {
  activeDataset: DatasetId;
  setActiveDataset: (dataset: DatasetId) => void;

  // E-Commerce State & Actions
  ecommerceOrders: ECommerceOrder[];
  filteredECommerceOrders: ECommerceOrder[];
  ecommerceFilters: ECommerceFilterState;
  setECommerceFilters: (filters: Partial<ECommerceFilterState>) => void;
  resetECommerceFilters: () => void;
  ecommerceKPIs: DashboardKPICard[];
  ecommerceSort: SortConfig<ECommerceOrder>;
  setECommerceSort: (sort: SortConfig<ECommerceOrder>) => void;
  ecommercePagination: PaginationConfig;
  setECommercePage: (page: number) => void;

  // Hospital State & Actions
  hospitalPatients: HospitalPatient[];
  filteredHospitalPatients: HospitalPatient[];
  hospitalFilters: HospitalFilterState;
  setHospitalFilters: (filters: Partial<HospitalFilterState>) => void;
  resetHospitalFilters: () => void;
  hospitalKPIs: DashboardKPICard[];
  hospitalSort: SortConfig<HospitalPatient>;
  setHospitalSort: (sort: SortConfig<HospitalPatient>) => void;
  hospitalPagination: PaginationConfig;
  setHospitalPage: (page: number) => void;
}

/**
 * Contract: Generic Chart Props
 */
export interface ChartBaseProps {
  title: string;
  className?: string;
  height?: number;
}
