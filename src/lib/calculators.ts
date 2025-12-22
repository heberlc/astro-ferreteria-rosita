/**
 * Material Calculators - Logic
 * Formulas based on Peruvian construction standards
 */

// ============ BRICK/WALL CALCULATOR ============

export interface BrickCalculation {
  bricks: number;
  cementBags: number;
  sandM3: number;
}

/**
 * Calculate materials needed for a brick wall
 * Based on Peruvian standards (Ladrillo King Kong 9x13x24 cm)
 * 
 * @param squareMeters - Wall area in m²
 * @returns Materials needed with 5% waste factor
 */
export function calculateBricks(squareMeters: number): BrickCalculation {
  // Standard: 38 bricks per m² + 5% waste = ~40 bricks
  const BRICKS_PER_M2 = 40;
  // Cement: 0.5 bags per m² (42.5 kg bags)
  const CEMENT_BAGS_PER_M2 = 0.5;
  // Sand: 0.05 m³ per m²
  const SAND_M3_PER_M2 = 0.05;

  return {
    bricks: Math.ceil(squareMeters * BRICKS_PER_M2),
    cementBags: Math.ceil(squareMeters * CEMENT_BAGS_PER_M2),
    sandM3: Math.round(squareMeters * SAND_M3_PER_M2 * 100) / 100,
  };
}

// ============ PAINT CALCULATOR ============

export interface PaintCalculation {
  gallons: number;
  liters: number;
}

/**
 * Calculate paint needed for walls
 * Based on Peruvian standards (Vencelatex CPP: 1 gallon = 25 m² with 2 coats)
 * 
 * @param squareMeters - Wall area in m²
 * @returns Paint needed
 */
export function calculatePaint(squareMeters: number): PaintCalculation {
  // Standard: 1 gallon covers 25 m² with 2 coats (standard in Peru)
  const M2_PER_GALLON = 25;
  const LITERS_PER_GALLON = 3.785;

  const gallons = squareMeters / M2_PER_GALLON;

  return {
    gallons: Math.ceil(gallons),
    liters: Math.round(gallons * LITERS_PER_GALLON * 10) / 10,
  };
}

// ============ HELPER FUNCTIONS ============

/**
 * Format number with thousands separator (Peru style)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('es-PE');
}
