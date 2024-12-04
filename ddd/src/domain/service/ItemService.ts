import { Item } from '../entity/Item';

export class ItemService {
    static increaseAllPrices(items: Item[], percantage: number): void {
        for (const item of items) {
            item.updatePrice(item.price + (item.price * percantage) / 100);
        }
    }
}
