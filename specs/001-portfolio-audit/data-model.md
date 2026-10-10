# Phase 1: Data Model & Schema Definitions

**Feature Directory**: `specs/001-portfolio-audit`  
**Date**: 2026-10-09  
**Status**: Complete  

## 1. Entity Definitions

### Entity: Audit Finding
Represents a specific code defect, technical debt item, or quality gap identified during repository analysis.

* **Attributes**:
  * `id`: Unique identifier (e.g., `FINDING-001`)
  * `title`: Concise descriptive summary
  * `domain`: Audit domain (`DEPENDENCIES_BUILD`, `ROUTING_ARCHITECTURE`, `LOCALIZATION`, `ACCESSIBILITY`, `SEO_PERFORMANCE`, `TESTING_DEPLOYMENT`)
  * `severity`: Severity level (`HIGH`, `MEDIUM`, `LOW`)
  * `filePath`: Absolute or workspace-relative path to affected file
  * `lineNumbers`: Precise line or line range (e.g., `L8-L13`)
  * `evidence`: Code snippet or configuration quote confirming finding
  * `impact`: Technical or user-facing impact statement
  * `recommendedAction`: Resolution steps
  * `estimatedComplexity`: Effort estimate (`LOW`, `MEDIUM`, `HIGH`)

---

### Entity: Recommendation Item
Represents a prioritized remediation task or feature enhancement.

* **Attributes**:
  * `priority`: Action priority (`P1`, `P2`, `P3`)
  * `findingId`: Associated `Audit Finding` ID
  * `title`: Task action title
  * `justification`: Rationale grounded in Project Constitution v1.0.0
  * `estimatedComplexity`: Implementation effort (`LOW`, `MEDIUM`, `HIGH`)
  * `constitutionCompliance`: Alignment with specific constitution principles

---

### Entity: Quality Gate
Represents project quality baseline checks required by the Project Constitution.

* **Attributes**:
  * `name`: Gate identifier (`TS_TYPE_CHECK`, `ESLINT_LINT`, `I18N_KEY_PARITY`, `WCAG_HEADING_TREE`)
  * `command`: Terminal check command (e.g., `npx tsc --noEmit`)
  * `passCriteria`: Expected result for clean pass
  * `currentStatus`: Current status (`PASSING`, `SUPPRESSED`, `MISSING`)

---

## 2. Validation & Severity Rules

```typescript
type Severity = "HIGH" | "MEDIUM" | "LOW";
type Priority = "P1" | "P2" | "P3";
type Domain = 
  | "DEPENDENCIES_BUILD"
  | "ROUTING_ARCHITECTURE"
  | "LOCALIZATION"
  | "ACCESSIBILITY"
  | "SEO_PERFORMANCE"
  | "TESTING_DEPLOYMENT";

interface AuditFinding {
  id: string;
  title: string;
  domain: Domain;
  severity: Severity;
  filePath: string;
  lineNumbers: string;
  evidence: string;
  impact: string;
  recommendedAction: string;
  estimatedComplexity: "LOW" | "MEDIUM" | "HIGH";
}
```
