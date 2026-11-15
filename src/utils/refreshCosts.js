// Recompute every product's moving average cost (utils/costing.js) and save
// the ones that changed as product.avgCost. Run after a purchase bill or a
// production entry is saved or deleted: those are what move the average.
// Never throws: a failure only leaves the stored averages as they were.
import { getAllProducts, getAllBills, getAllPurchases, getAllProductions, saveProduct } from '../store';
import { costLedger, avgCostUpdates } from './costing';

export async function refreshAvgCosts() {
  try {
    const [products, bills, purchases, productions] = await Promise.all([
      getAllProducts(), getAllBills(), getAllPurchases(), getAllProductions().catch(() => []),
    ]);
    const updates = avgCostUpdates(products, costLedger({ products, bills, purchases, productions }));
    for (const p of updates) await saveProduct(p);
    return updates.length;
  } catch (e) {
    console.warn('Average cost refresh failed', e);
    return 0;
  }
}
