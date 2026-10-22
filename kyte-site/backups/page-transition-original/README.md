# Original weighted page transition backup

Saved on 22 October 2026 before integrating the supplied stair transition. PageTransition.tsx is the complete working controller and original two-layer renderer, including current route and reduced-motion fixes. transition.css contains its exact global styles and keyframes.

To restore, copy PageTransition.tsx to src/components/PageTransition.tsx and restore transition.css in src/app/globals.css. The backup is not imported by the application. Do not delete it during routine unused-code cleanup.
