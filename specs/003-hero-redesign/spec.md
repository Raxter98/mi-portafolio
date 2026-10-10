# Especificación de Rediseño de Hero (Fase 2)

## 1. Objetivos del Rediseño
- Rediseñar la sección "Hero" inicial (`Welcome`) para garantizar visibilidad óptima en modo claro y oscuro.
- Eliminar los saltos visuales y superposiciones en el texto animado (typewriter original fallaba y no era responsive).
- Proporcionar un diseño moderno, distintivo y elegante.

## 2. Componentes Auditados (Fase 1)
- `app/page.tsx`: Contenía un gradiente oscuro forzado incluso en modo claro (`bg-[radial-gradient(...)]` con colores fijos en hexadecimal oscuro). Esto provocaba que en modo claro el texto se volviera oscuro (text-zinc-900) sobre un fondo que seguía siendo negro.
- `components/welcome/page.tsx`: Implementaba un efecto "typewriter" letra a letra mediante temporizadores que reescribía el DOM entero varias veces, rompiendo el flujo del contenedor, especialmente con textos multilínea en móviles.

## 3. Plan de Implementación (Fase 3)
1. Modificar `app/page.tsx` añadiendo prefijos `dark:` a los fondos radiales oscuros, y usando fondos claros/neutros en su defecto.
2. Actualizar estilos de los botones (WhatsApp) en `app/page.tsx` para asegurar el contraste en ambos temas.
3. Reescribir `components/welcome/page.tsx`:
   - Eliminar el "typewriter" complejo.
   - Utilizar CSS `inline-grid` apilando las especialidades de la matriz `t.welcome.speaking` con opacidad y traslación vertical controlada por un índice reactivo (`activeIndex`). Esto mantiene la altura 100% estable.
   - Modernizar la tipografía y disposición con íconos de Lucide-React.
   - Refinar paletas de colores de enlaces y etiquetas usando `zinc` y `red`.

## 4. Criterios de Aceptación (Fase 4 - Validación)
- [x] El fondo en modo claro es claro y el texto es legible.
- [x] El fondo en modo oscuro es oscuro y el texto es legible.
- [x] Las transiciones de texto mantienen estable el tamaño del contenedor, sin empujar elementos adyacentes.
- [x] Diseño adaptativo (móvil, tablet, escritorio).
- [x] Accesibilidad (todos los botones/enlaces tienen contraste WCAG AA+).
