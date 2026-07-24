# Maylen Aguedo — Sistema de diseño

> Fuente única de verdad. Los tokens viven en `app/globals.css` (`@theme`);
> este documento explica **por qué** son así.

---

## 1. Punto de vista

**"El aire entre las posturas."**

El sitio es un **programa impreso**, no una landing de gimnasio: retícula
asimétrica, filetes de 1px que ordenan la página, índices numerados (01–04) y
una tipografía display con mucho aire. La calidez viene del color y del papel
(grano sutil); la fuerza —acroyoga, pilates— viene de la estructura rígida de la
retícula y de los números, no de fotos "dinámicas" ni de gradientes.

**Motivo estructural: el arco.** Toda zona fotográfica está enmarcada en un arco
(puerta/nicho/retroflexión), con un segundo contorno de filete desplazado. Se
repite en la marca (`ArcMark`), en las formas fantasma del fondo y en las
miniaturas de Instagram del pie. Es lo que hace que el sitio no se parezca a
una plantilla.

**Los arcos decorativos de fondo usan `.veil`, nunca un bloque sólido.** Un
bloque se recorta contra el viewport y deja una arista recta: a 768px cortaba
el párrafo del hero por la mitad y se leía como un fallo de renderizado. `.veil`
difumina todos los bordes con una máscara radial.

**Decisiones deliberadas**
- Sin tarjetas con sombra: la jerarquía la hacen el filete, el número y el aire.
- Sin espejos, sin stock de yoga genérico: los huecos de foto son marcadores
  tipográficos que describen la foto que falta.
- La cursiva de Cormorant es el único "acento" — se reserva para 1 palabra o 1
  línea por bloque. Si aparece en todos lados, deja de significar algo.

---

## 2. Color

Paleta de 5 familias. **Todos los pares están medidos**, no estimados.

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `sand` | `#F7F3EC` | Fondo de página | — |
| `sand-veil` | `#FBF9F5` | Superficie elevada | — |
| `sand-deep` | `#EDE5D8` | Banda alterna | — |
| `bark` | `#3A312A` | Títulos y cuerpo | **11.49:1** sobre sand · AAA |
| `bark-soft` | `#6B5F54` | Texto secundario | **5.60:1** sobre sand · AA |
| `sage` | `#7C8F72` | **Sólo** filetes, iconos y rellenos | 3.15:1 — nunca texto pequeño |
| `sage-deep` | `#556B4F` | Sage cuando es texto | **5.27:1** sobre sand · AA |
| `sage-veil` | `#E5E9DF` | Banda tintada | — |
| `sage-light` | `#A8BA9C` | Sage sobre bark (pie) | **6.15:1** sobre bark · AA |
| `terra` | `#B4573A` | Relleno de botón | blanco encima **4.81:1** · AA |
| `terra-deep` | `#9C4630` | Terracota como texto | **5.70:1** sobre sand · AA |
| `terra-light` | `#DD9678` | Terracota sobre bark | **5.27:1** sobre bark · AA |

### Reglas que no se rompen
1. **`sage` y `terra` planos nunca son texto pequeño.** Usa `sage-deep` /
   `terra-deep`. Es el error más fácil de cometer aquí.
2. **Sobre `bark` (pie y cierres) nunca uses `terra`**: da 2.64:1. Usa
   `terra-light`.
3. **Nada de blanco translúcido sobre `terra`.** `white/75` cae a 3.43:1. Sobre
   terracota el texto es blanco pleno; la jerarquía se hace con tamaño y
   tracking, no con opacidad.

---

## 3. Tipografía

**Cormorant Garamond** (display) + **Work Sans** (cuerpo). Ambas variables,
autoalojadas por `next/font` — cero peticiones a Google en producción.

| Rol | Fuente | Ajustes |
|---|---|---|
| Hero | Cormorant 300 | `clamp(3rem, 1.2rem + 8.4vw, 7.5rem)`, `line-height: .92` |
| Display | Cormorant 300 | `clamp(2.25rem, 1.1rem + 5vw, 4.5rem)` |
| Title | Cormorant 300 | `clamp(1.75rem, 1.15rem + 2.6vw, 3rem)` |
| Lead | Work Sans 300 | `clamp(1.125rem, 1.02rem + .45vw, 1.375rem)`, `lh 1.65` |
| Cuerpo | Work Sans 400 | 16px, `lh 1.6` |
| Etiqueta | Work Sans 500 | 11–13px, `uppercase`, `tracking .18–.26em` |

- Cormorant siempre en **300**. En negrita pierde toda la elegancia.
- Las etiquetas (`Eyebrow`) siempre llevan el filete corto delante. Es el gesto
  que se repite en todo el sitio.
- **No usar `text-rendering: optimizeLegibility`**: fuerza una ruta de
  composición lenta a tamaños display y los navegadores ya aplican kerning.
- ⚠️ **Cormorant usa cifras elzevirianas: el «1» se lee como una «I».**
  Un teléfono en la display se leía `+5I 999 999 999`. Reglas:
  - Teléfonos → `font-sans tabular-nums` (nunca la display).
  - Precios y cifras dentro de la display → añadir `lining-nums`
    (Cormorant Garamond sí trae la característica `lnum`; verificado).

---

## 4. Movimiento — nivel "susurro"

Todo vive en CSS; el JS (`components/reveal.tsx`) sólo escribe `data-visible`
sobre el DOM vía IntersectionObserver. Sin estado de React, sin re-render.

| Variante | Gesto | Duración |
|---|---|---|
| `wipe` (por defecto) | Máscara `clip-path` que se levanta + 14px de asiento | 1.1s |
| `fade` | Igual sin máscara — para lo que pinta fuera de su caja | 1.1s |
| `rule` | El filete se dibuja de izquierda a derecha (`scaleX`) | 1.2s |
| arco interior | El campo de la foto asienta desde `scale(1.08)` | 1.7s |

- Easing: `cubic-bezier(.16, 1, .3, 1)` — sale rápido, aterriza lento.
- Escalonado en incrementos de **60–90ms**. Más y se lee como una lista
  cargando; menos y no se percibe.
- Los elementos **sólo se revelan, nunca se vuelven a ocultar**: nada parpadea
  al subir el scroll.
### Tres trampas ya pagadas — no reintroducirlas

1. **`inset()` no admite valores negativos.** Un `inset(0 0 -12% 0)` invalida la
   declaración entera y deja el elemento tapado.
2. **El `threshold` del observer debe ser 0.** Chromium aplica el `clip-path`
   del propio elemento al calcular el rectángulo de intersección: mientras está
   oculto su `intersectionRatio` es exactamente 0, así que cualquier umbral
   mayor que 0 es inalcanzable y el contenido no aparece nunca. `isIntersecting`
   sí es `true` con ratio 0. El punto de disparo se ajusta con `rootMargin`.
3. **Lo anidado hereda del padre.** Un elemento dentro de otro que se revela
   queda recortado por el `clip-path` del padre → intersección 0 → su observer
   nunca dispara, y una transición de `clip-path` no vuelve a evaluar el
   observer. Por eso `[data-visible="true"] [data-rule]` y su equivalente para
   `[data-reveal]` existen en `globals.css`.

Las tres fallan **en silencio**: el marcado se ve correcto en el DOM mientras el
visitante no ve nada. Por eso `scripts/shoot.mjs` mide el resultado renderizado
(opacidad y `clip-path` calculados, no el atributo `data-visible`) y termina con
código 1 si algo no llegó a verse.

- `prefers-reduced-motion` recibe el estado final sin transición, y un
  `<noscript>` en el layout garantiza el contenido si el JS falla.

---

## 5. Móvil

Diseñado en sus propios términos, no reducido desde escritorio.

- **Menú**: panel a pantalla completa con los enlaces en Cormorant 30px y
  numerados — es una página, no un desplegable. Bloqueo de scroll, foco
  atrapado, `Escape` cierra, `env(safe-area-inset-bottom)` en el CTA.
- **Contacto**: filas de ≥88px de alto y ancho completo; WhatsApp destacado en
  terracota. El pulgar no tiene que apuntar.
- **Clases**: índice vertical con filetes en móvil; zigzag asimétrico a partir
  de `lg`.
- Todos los objetivos táctiles ≥44px (verificado en el DOM, no a ojo).

---

## 6. Fotografía

Las zonas están marcadas con `data-photo-slot` y describen la foto que falta.

```tsx
// Antes
<PhotoSlot caption="Retrato de Maylen en el estudio…" ratio="aspect-[4/5]" />

// Después: guardar en /public/fotos/ y añadir src + alt
<PhotoSlot src="/fotos/maylen-estudio.jpg" alt="Maylen en su estudio"
           caption="Retrato de Maylen en el estudio…" ratio="aspect-[4/5]" />
```

El marco de arco, la máscara y la animación siguen funcionando igual.
Buscar `<PhotoSlot` o `data-photo-slot` lista todas las zonas pendientes.

**La proporción debe coincidir con el pie.** Cada clase declara su `aspect` en
`lib/content.ts` junto a la descripción de la foto. Si el pie dice «horizontal
4:3» y el marco es vertical, la página se descuadra el día que llegue la foto
real. Los cuatro tonos (`sage`, `terra`, `dusk`, `sand`) cambian la **dirección**
del degradado y la posición de la marca, no sólo el matiz: con una variación
sólo de color, cuatro huecos seguidos parecían cuatro cajas vacías iguales.

## 6b. Verificación

```bash
npm run build && npx next start -p 3001
npm run shoot     # capturas + reveals
npm run a11y      # contraste, objetivos táctiles, semántica
```

- **`npm run shoot`** captura 4 rutas × 3 anchos (375 / 768 / 1440) en
  `screenshots/` y **falla con código 1 si algún reveal no llegó a verse**.
- **`npm run a11y`** recorre las mismas 12 combinaciones y **falla con código 1**
  ante contraste por debajo de AA, objetivos táctiles menores de 44px, saltos de
  encabezado, desbordamiento horizontal, imágenes sin `alt` o enlaces externos
  sin `rel="noopener"`. Verificado en negativo: al degradar `--color-bark-soft`
  a propósito, detecta el fallo y sale con error.
- `scripts/shoot-sections.mjs <ruta> <ancho>` recorta sección por sección cuando
  hace falta detalle; `scripts/debug-motion.mjs` muestrea la transición en el
  tiempo para comprobar que anima de verdad y no salta.

⚠️ **Siempre contra el servidor de producción, y comprobando que arranca.** En
desarrollo Next dibuja su indicador encima del CTA del hero. Y si el puerto ya
está ocupado, `next start` muere con `EADDRINUSE` mientras el proceso viejo
sigue sirviendo el HTML nuevo con un manifiesto antiguo: el CSS da 404 y las
capturas salen sin estilos (páginas 6× más altas). Ante una captura rara,
comprobar primero que la hoja de estilos responde 200.

---

## 7. Antipatrones

- Sombras difusas y tarjetas flotantes → aquí ordena el filete.
- Cursiva de Cormorant en párrafos largos.
- Verde y terracota juntos y saturados: la terracota es **acento**, aparece una
  vez por sección.
- Emojis como iconos → SVG en línea (`components/icons.tsx`).
- Quitar el anillo de foco.
- Animar `width`/`height` → sólo `transform`, `opacity` y `clip-path`.
