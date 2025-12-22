# Calculadoras de Materiales

Herramientas interactivas para calcular materiales de construcción basadas en estándares peruanos.

## Acceso

**URL**: `/calculadoras`  
**Navegación**: Disponible en el menú principal (desktop y móvil)

---

## Calculadora de Ladrillos

**Propósito**: Calcular materiales para construir un muro de ladrillo.

### Entrada
- Área del muro en metros cuadrados (m²)

### Salida
- **Ladrillos King Kong** (9x13x24 cm)
- **Bolsas de cemento** (42.5 kg)
- **Arena** (m³)

### Fórmulas (Estándares Peruanos)
| Material | Fórmula | Fuente |
|----------|---------|--------|
| Ladrillos | 40 unidades/m² | Aceros Arequipa (incluye 5% desperdicio) |
| Cemento | 0.5 bolsas/m² | Norma técnica peruana |
| Arena | 0.05 m³/m² | ConstruyendoSeguro |

### Ejemplo
- **Input**: 50 m²
- **Output**: 2,000 ladrillos, 25 bolsas cemento, 2.5 m³ arena

---

## Calculadora de Pintura

**Propósito**: Calcular galones de pintura látex necesarios.

### Entrada
- Área a pintar en metros cuadrados (m²)

### Salida
- **Galones** necesarios
- **Litros** (aproximado)

### Fórmulas (Estándares Peruanos)
| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Rendimiento | 25 m² por galón (2 manos) | CPP Vencelatex |
| Conversión | 1 galón = 3.785 litros | Estándar |

### Ejemplo
- **Input**: 100 m²
- **Output**: 4 galones, 15.1 litros

---

## Archivos Relacionados

| Archivo | Descripción |
|---------|-------------|
| `src/pages/calculadoras/index.astro` | Página con UI de calculadoras |
| `src/lib/calculators.ts` | Lógica de cálculo |

---

## Extensión Futura

Posibles calculadoras adicionales:
- **Calculadora de Cerámica/Mayólica** (m² → cajas)
- **Calculadora de Cemento** (volumen → bolsas)
- **Calculadora de Varillas** (columnas → cantidad)
