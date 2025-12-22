/**
 * Catalog Filter Engine
 * Client-side filtering for products by brand and price
 */

interface ProductData {
  slug: string;
  brand: string;
  price?: number;
}

// Store product data for filtering
let productDataCache: ProductData[] = [];

/**
 * Initialize filter engine with product data
 */
export function initFilters(products: ProductData[]): void {
  productDataCache = products;
  
  // Attach event listeners
  attachBrandFilters();
  attachPriceFilter();
}

/**
 * Attach brand checkbox event listeners
 */
function attachBrandFilters(): void {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('[data-filter="brand"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      applyFilters();
    });
  });
}

/**
 * Attach price range filter
 */
function attachPriceFilter(): void {
  const minInput = document.getElementById('price-min') as HTMLInputElement;
  const maxInput = document.getElementById('price-max') as HTMLInputElement;
  
  if (minInput && maxInput) {
    [minInput, maxInput].forEach(input => {
      input.addEventListener('change', () => {
        applyFilters();
      });
    });
  }
}

/**
 * Get selected brands from checkboxes
 */
function getSelectedBrands(): string[] {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('[data-filter="brand"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Get price range from inputs
 */
function getPriceRange(): { min: number; max: number } {
  const minInput = document.getElementById('price-min') as HTMLInputElement;
  const maxInput = document.getElementById('price-max') as HTMLInputElement;
  
  return {
    min: minInput ? parseFloat(minInput.value) || 0 : 0,
    max: maxInput ? parseFloat(maxInput.value) || Infinity : Infinity,
  };
}

/**
 * Apply all filters and show/hide products
 */
function applyFilters(): void {
  const selectedBrands = getSelectedBrands();
  const { min, max } = getPriceRange();
  
  const productCards = document.querySelectorAll<HTMLElement>('[data-product]');
  let visibleCount = 0;
  
  productCards.forEach(card => {
    const brand = card.dataset.brand || '';
    const price = parseFloat(card.dataset.price || '0');
    
    // Brand filter (if no brands selected, show all)
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
    
    // Price filter
    const matchesPrice = price >= min && price <= max;
    
    // Show or hide
    const isVisible = matchesBrand && matchesPrice;
    card.style.display = isVisible ? '' : 'none';
    
    if (isVisible) visibleCount++;
  });
  
  // Update count display
  updateProductCount(visibleCount);
}

/**
 * Update product count in the header
 */
function updateProductCount(count: number): void {
  const countEl = document.getElementById('product-count');
  if (countEl) {
    countEl.textContent = `Mostrando ${count} productos`;
  }
}

/**
 * Clear all filters
 */
export function clearFilters(): void {
  // Uncheck all brand checkboxes
  document.querySelectorAll<HTMLInputElement>('[data-filter="brand"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset price range
  const minInput = document.getElementById('price-min') as HTMLInputElement;
  const maxInput = document.getElementById('price-max') as HTMLInputElement;
  if (minInput) minInput.value = minInput.dataset.min || '0';
  if (maxInput) maxInput.value = maxInput.dataset.max || '500';
  
  applyFilters();
}
