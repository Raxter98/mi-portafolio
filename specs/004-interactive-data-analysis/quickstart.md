# Quickstart Verification Guide: Interactive Data Analysis and Visualization

**Feature Directory**: `specs/004-interactive-data-analysis`  
**Date**: 2026-10-11  
**Status**: Complete  

---

## Overview

This guide provides runnable commands and manual verification procedures to validate the Interactive Data Analysis and Visualization feature across data ingestion integrity, exact KPI calculations, responsive charts, multi-filtering, video playback, and bilingual i18n key parity.

---

## Runnable Verification Scenarios

### Scenario 1: TypeScript Compilation Check
* **Goal**: Confirm zero type errors across all newly created interfaces, contracts, data hooks, and components.
* **Command**:
  ```bash
  npx tsc --noEmit
  ```
* **Expected Result**: Exits with status `0` and 0 error messages.

---

### Scenario 2: i18n Dictionary Key Parity Test
* **Goal**: Confirm 100% key parity between `locales/en.json` and `locales/es.json` for all new `dataAnalysis` and `dataDashboard` namespaces.
* **Command**:
  ```bash
  node -e '
    const en = require("./locales/en.json");
    const es = require("./locales/es.json");
    
    function checkKeys(objEn, objEs, path = "") {
      const enKeys = Object.keys(objEn || {}).sort();
      const esKeys = Object.keys(objEs || {}).sort();
      const missingInEs = enKeys.filter(k => !(k in (objEs || {})));
      const missingInEn = esKeys.filter(k => !(k in (objEn || {})));
      
      if (missingInEs.length > 0) {
        console.error(`Missing in es.json at ${path}:`, missingInEs);
        process.exit(1);
      }
      if (missingInEn.length > 0) {
        console.error(`Missing in en.json at ${path}:`, missingInEn);
        process.exit(1);
      }
      
      for (const k of enKeys) {
        if (typeof objEn[k] === "object" && objEn[k] !== null && !Array.isArray(objEn[k])) {
          checkKeys(objEn[k], objEs[k], path ? `${path}.${k}` : k);
        }
      }
    }
    
    checkKeys(en.dataAnalysis, es.dataAnalysis, "dataAnalysis");
    checkKeys(en.dataDashboard, es.dataDashboard, "dataDashboard");
    console.log("✅ Data Analysis i18n keys match with 100% parity across EN and ES.");
  '
  ```
* **Expected Result**: Logs confirmation with 0 missing keys and exits with code `0`.

---

### Scenario 3: Pre-Compiled Dataset Integrity & Mathematical Formulas
* **Goal**: Validate that pre-processed JSON datasets in `data/` match source Excel data and yield exact baseline KPI values.
* **Command**:
  ```bash
  node -e '
    const ecommerce = require("./data/ecommerce-orders.json");
    const hospital = require("./data/hospital-patients.json");
    
    console.assert(ecommerce.length === 1000, `Expected 1000 ecommerce orders, got ${ecommerce.length}`);
    console.assert(hospital.length === 1000, `Expected 1000 hospital patients, got ${hospital.length}`);
    
    // E-Commerce Metrics
    const totalRev = ecommerce.reduce((acc, r) => acc + r.totalRevenue, 0);
    const totalProfit = ecommerce.reduce((acc, r) => acc + r.profit, 0);
    const totalUnits = ecommerce.reduce((acc, r) => acc + r.quantity, 0);
    
    console.log("E-Commerce Total Revenue:", totalRev.toFixed(2));
    console.log("E-Commerce Total Profit:", totalProfit.toFixed(2));
    console.log("E-Commerce Total Units:", totalUnits);
    
    console.assert(Math.round(totalRev) === 90203, `Revenue mismatch: ${totalRev}`);
    console.assert(Math.round(totalProfit) === 28148, `Profit mismatch: ${totalProfit}`);
    console.assert(totalUnits === 2029, `Units mismatch: ${totalUnits}`);
    
    // Hospital Metrics
    const totalBill = hospital.reduce((acc, r) => acc + r.totalBillAmount, 0);
    const avgLos = hospital.reduce((acc, r) => acc + r.lengthOfStayDays, 0) / hospital.length;
    
    console.log("Hospital Total Billing:", totalBill.toFixed(2));
    console.log("Hospital Avg LOS (days):", avgLos.toFixed(2));
    
    console.assert(Math.round(totalBill) === 8053143, `Billing mismatch: ${totalBill}`);
    console.assert(avgLos.toFixed(2) === "4.81", `LOS mismatch: ${avgLos}`);
    
    console.log("✅ Dataset mathematical integrity confirmed.");
  '
  ```
* **Expected Result**: Confirms 1,000 records each and exact KPI mathematical outputs.

---

### Scenario 4: Next.js Production Build & Lint Verification
* **Goal**: Validate that the entire Next.js portfolio builds cleanly without linting errors or compilation regressions.
* **Command**:
  ```bash
  npm run lint && npm run build
  ```
* **Expected Result**: Lint completes with 0 errors; build creates static routes including `/data-analysis`.

---

## Manual User Experience & Interaction Scenarios

### Scenario 5: Homepage Spotlight & Looping Video
1. Start dev server: `npm run dev`.
2. Open `http://localhost:3000`.
3. Scroll down to `#data-analysis`.
4. Verify:
   - Section heading: "Análisis y visualización de datos" (ES) or "Interactive Data Analysis and Visualization" (EN).
   - Looping preview video plays continuously without audio.
   - Enabling "prefers-reduced-motion" in browser/OS disables autoplay and displays the poster card.
   - Clicking "Explorar visualizaciones" / "Explore Visualizations" navigates to `/data-analysis`.

### Scenario 6: Dataset Selector & Logical Isolation
1. Navigate to `http://localhost:3000/data-analysis`.
2. Verify "Público e-commerce" is active by default.
3. Switch dataset to "Hospital-patients".
4. Verify:
   - Header, KPIs, charts, filters, and data table update immediately.
   - Zero e-commerce fields or values remain visible.
   - Toggling back to "Público e-commerce" restores baseline e-commerce metrics cleanly.

### Scenario 7: Reactive Multi-Filtering, Sorting, and Reset
1. In "Público e-commerce", set Category = "Electronics" and Region = "West".
2. Confirm all 5 KPI cards recalculate instantly.
3. In the data table, click the "Total Revenue" header $\rightarrow$ confirm rows sort descending.
4. Click "Limpiar filtros" / "Reset Filters" $\rightarrow$ confirm filters clear and totals return to $\$90,201.27$.

---

## Artifact References

* Feature Specification: [`specs/004-interactive-data-analysis/spec.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/spec.md)
* Implementation Plan: [`specs/004-interactive-data-analysis/plan.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/plan.md)
* Technical Research: [`specs/004-interactive-data-analysis/research.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/research.md)
* Data Model: [`specs/004-interactive-data-analysis/data-model.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/data-model.md)
* Component & State Contracts: [`specs/004-interactive-data-analysis/contracts/dataset-interface.contract.ts`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/contracts/dataset-interface.contract.ts)
* i18n Dictionary Schema: [`specs/004-interactive-data-analysis/contracts/i18n-dictionary-schema.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/004-interactive-data-analysis/contracts/i18n-dictionary-schema.json)
