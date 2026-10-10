<!--
Sync Impact Report:
- Version change: Unratified Template -> 1.0.0
- Added sections:
  - 1. Technology Stack Preservation
  - 2. Architecture and Code Quality
  - 3. Responsive Design and Cross-Device Compatibility
  - 4. Internationalization and Localization (i18n)
  - 5. Visual Identity and Design System
  - 6. Accessibility and Usability
  - 7. Performance and Search Engine Optimization
  - 8. Security and Privacy
  - 9. Testing and Verification
  - 10. Backward Compatibility and Change Management
  - 11. Specification-Driven Development
  - 12. Documentation and Maintainability
  - 13. Implementation Discipline
  - Governance
- Modified principles: None (initial population)
- Removed sections: Placeholder sections replaced with project principles
- Follow-up TODOs: None
-->

# Personal Portfolio Constitution

## Core Principles

### 1. Technology Stack Preservation

* MUST preserve the existing technology stack, including the framework, programming language, build tools, dependencies, and deployment configuration.
* MUST inspect the existing repository before proposing architectural changes or implementation plans.
* MUST NOT replace frameworks, introduce major dependencies, or perform migrations without explicit authorization and a documented justification.
* MUST follow the conventions and established patterns already present in the codebase unless there is a clear technical reason to improve them.

### 2. Architecture and Code Quality

* MUST maintain a modular, maintainable, and well-organized codebase.
* MUST favor reusable components, clear separation of responsibilities, and consistent naming conventions.
* MUST avoid unnecessary code duplication, excessive abstraction, and overengineering.
* MUST separate presentation, content, and business logic where appropriate for the existing architecture.
* MUST use the project's existing type system and enforce type safety wherever supported.
* MUST keep components and functions focused on clearly defined responsibilities.

### 3. Responsive Design and Cross-Device Compatibility

* MUST provide a consistent, usable experience across mobile phones, tablets, laptops, and desktop displays.
* MUST follow a mobile-first approach when compatible with the existing design system and architecture.
* MUST use responsive layouts and fluid sizing rather than relying on fixed dimensions that break on smaller screens.
* MUST prevent unintended horizontal overflow, clipped content, overlapping elements, and inaccessible navigation.
* MUST verify critical layouts and interactions across representative viewport sizes.
* MUST preserve usability for both touch and pointer-based interactions.

### 4. Internationalization and Localization (i18n)

* MUST support the languages required by the portfolio, initially Spanish and English, while preserving any additional languages already supported.
* MUST use the existing internationalization library or localization architecture whenever one is already available.
* MUST centralize user-facing strings in translation resources instead of hardcoding them throughout components.
* MUST translate navigation, buttons, forms, validation messages, accessibility labels, metadata, and other user-facing content.
* MUST ensure that adding or updating content does not introduce missing translations or inconsistent terminology.
* MUST handle language selection and persistence consistently with the existing application behavior.
* MUST account for differences in text length, date formatting, number formatting, and locale-sensitive content.
* MUST keep source code identifiers and technical conventions in English unless existing project constraints require otherwise.

### 5. Visual Identity and Design System

* MUST preserve the portfolio's established brand identity unless a redesign is explicitly requested.
* MUST maintain consistent typography, spacing, colors, layout patterns, borders, and interaction states.
* MUST prefer shared design tokens and reusable UI components when supported by the current architecture.
* MUST maintain visual consistency across all pages and sections.
* MUST implement clear hover, focus, active, disabled, loading, and error states where applicable.
* MUST avoid introducing inconsistent styles or one-off UI patterns when existing components can satisfy the requirement.
* MUST prioritize professional presentation, readability, visual hierarchy, and intuitive navigation.

### 6. Accessibility and Usability

* MUST follow established web accessibility practices, targeting WCAG 2.2 Level AA where applicable and feasible.
* MUST use semantic HTML and appropriate accessible names for interactive elements.
* MUST ensure that core functionality is available through keyboard navigation.
* MUST provide visible focus indicators and sufficient text and interface contrast.
* MUST provide appropriate alternative text for meaningful images.
* MUST respect reduced-motion preferences when animations are present.
* MUST avoid relying exclusively on color, animation, or visual appearance to communicate important information.
* MUST ensure that translated content remains accessible and understandable.

### 7. Performance and Search Engine Optimization

* MUST preserve and improve performance without compromising existing functionality.
* MUST optimize image delivery, asset loading, and rendering according to the capabilities of the existing stack.
* MUST avoid unnecessary dependencies, excessive client-side JavaScript, and redundant processing.
* MUST maintain appropriate page titles, descriptions, canonical URLs, and social-sharing metadata where relevant.
* MUST use semantic document structure and appropriate metadata for search engines.
* MUST consider Core Web Vitals and mobile performance when evaluating significant changes.
* MUST avoid implementing speculative optimizations without evidence that they provide value.

### 8. Security and Privacy

* MUST never expose secrets, credentials, private tokens, or sensitive configuration in client-side code or version control.
* MUST validate and safely handle user-provided input wherever applicable.
* MUST follow secure practices for external links, forms, third-party integrations, and dependencies.
* MUST minimize the collection and exposure of personal information.
* MUST NOT introduce tracking, analytics, external services, or additional permissions without an appropriate justification and authorization.

### 9. Testing and Verification

* MUST follow the testing, linting, formatting, and build conventions already established in the repository.
* MUST verify changes using the available automated checks whenever applicable.
* MUST add or update tests for significant functionality and regression-prone behavior when an appropriate test framework exists.
* MUST verify responsive behavior and internationalization for affected features.
* MUST NOT claim that a test, build, or verification succeeded unless it was actually executed and its result confirmed.
* MUST document relevant limitations when a verification step cannot be performed.
* MUST address regressions introduced by new changes before considering the work complete.

### 10. Backward Compatibility and Change Management

* MUST understand the existing implementation and its dependencies before modifying or removing functionality.
* MUST preserve existing user-facing behavior unless a change is explicitly requested or approved.
* MUST minimize the scope of changes and avoid unrelated refactoring.
* MUST identify potential impacts on existing pages, components, routes, translations, and integrations before implementation.
* MUST NOT delete existing features or modify deployment-critical configuration without justification and authorization.
* MUST verify that new functionality integrates with the existing application rather than creating a disconnected implementation.

### 11. Specification-Driven Development

* MUST follow the project's Spec-Driven Development workflow for significant new features and architectural changes.
* MUST define clear requirements, expected behavior, constraints, and measurable acceptance criteria before implementation.
* MUST create feature-specific specifications, technical plans, and actionable task lists using the established Spec Kit workflow.
* MUST ensure that implementation plans comply with this constitution.
* MUST identify dependencies, affected components, testing requirements, and potential regressions before implementation.
* MUST keep feature scope explicit and avoid introducing unrequested functionality.
* MUST obtain clarification when essential requirements are ambiguous or conflicting.

### 12. Documentation and Maintainability

* MUST keep documentation accurate and consistent with the actual implementation.
* MUST document architectural decisions when they materially affect future development.
* MUST maintain the constitution as the source of permanent project-wide principles.
* MUST document individual features, enhancements, and redesigns in their respective specifications rather than expanding the constitution unnecessarily.
* MUST update the constitution only when a permanent project-wide principle changes.
* MUST keep setup instructions, environment configuration guidance, and development workflows current where such documentation exists.

### 13. Implementation Discipline

* MUST inspect the repository before finalizing project-specific technical decisions.
* MUST distinguish existing capabilities from proposed improvements.
* MUST NOT invent dependencies, scripts, components, conventions, or project infrastructure that have not been verified.
* MUST prefer the simplest maintainable solution that satisfies the approved requirements.
* MUST present significant architectural changes for review before implementing them.
* MUST report completed work, verification results, known limitations, and any remaining tasks accurately.

## Governance

This constitution defines the permanent engineering, design, accessibility, and quality principles for the personal portfolio.

All specifications, technical plans, task lists, and implementations MUST comply with these principles.

If a requirement conflicts with this constitution, the conflict MUST be identified and resolved before implementation. Changes to permanent principles require an explicit constitution amendment.

Feature-specific requirements MUST remain in their corresponding specifications. The constitution MUST NOT be used as a substitute for feature requirements, technical implementation plans, or task breakdowns.

### Amendment Procedure

Proposed amendments to permanent principles MUST be documented with justification and reviewed before adoption. Upon approval, the constitution version MUST be updated according to semantic versioning rules, and `LAST_AMENDED_DATE` updated accordingly.

### Versioning Policy

- **MAJOR**: Backward incompatible governance/principle removals or redefinitions.
- **MINOR**: New principle/section added or materially expanded guidance.
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements.

### Compliance Review Expectations

All pull requests, specifications, technical plans, and implementation tasks MUST be evaluated against these principles. Non-compliance MUST be addressed prior to finalizing implementation work.

**Version**: 1.0.0 | **Ratified**: 2026-10-09 | **Last Amended**: 2026-10-09
