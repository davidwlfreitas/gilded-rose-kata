import { Item } from './gilded-rose-item';
import { AGED_BRIE_ITEM, BACKSTAGE_PASS_ITEM, CONJURED_ITEM, MAX_ITEM_QUALITY, MIN_ITEM_QUALITY, NORMAL_ITEM, SULFURAS_ITEM, SULFURAS_ITEM_QUALITY } from './utils/constants';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const itemType = this.getItemType(item);
      if(itemType === SULFURAS_ITEM){
        item.quality = SULFURAS_ITEM_QUALITY;
      } else {
        this.updateItem(item, itemType);
      }
    }
    return this.items;
  }

  updateItem(item: Item, type: string){
    switch(type){
      case AGED_BRIE_ITEM:
        this.updateAgedBrieItem(item);
        break;
      case BACKSTAGE_PASS_ITEM:
        this.updateBackstagePassItem(item);
        break;
      case CONJURED_ITEM:
        this.updateConjuredItem(item);
        break;
      case NORMAL_ITEM:
        this.updateNormalItem(item);
        break;
    }
  }

  updateNormalItem(item: Item){
    this.decreaseItemQuality(item);
    item.sellIn--;
    if (item.sellIn < 0) {
      this.decreaseItemQuality(item);
    }
  }

  updateAgedBrieItem(item: Item){
    this.increaseItemQuality(item);
    item.sellIn--;
    if (item.sellIn < 0) {
      this.increaseItemQuality(item);
    }
  }

  updateBackstagePassItem(item: Item){
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      this.increaseItemQuality(item, 3);
    } else if (item.sellIn <= 10) {
      this.increaseItemQuality(item, 2);
    } else {
      this.increaseItemQuality(item);
    }
    item.sellIn--;
  }

  updateConjuredItem (item: Item) {
    this.decreaseItemQuality(item, 2);
    item.sellIn--;
    if (item.sellIn < 0) {
      this.decreaseItemQuality(item, 2);
    }
  };

  getItemType(item: Item) {
    if(item.name.includes(SULFURAS_ITEM)){
      return SULFURAS_ITEM;
    } else if(item.name.includes(AGED_BRIE_ITEM)){
      return AGED_BRIE_ITEM;
    } else if(item.name.includes(BACKSTAGE_PASS_ITEM)){
      return BACKSTAGE_PASS_ITEM;
    } else if(item.name.includes(CONJURED_ITEM)){
      return CONJURED_ITEM;
    } else {
      return NORMAL_ITEM;
    }
  }

  decreaseItemQuality = (item: Item, amount: number = 1) => {
    item.quality = Math.max(item.quality - amount, MIN_ITEM_QUALITY);
  };

  increaseItemQuality = (item: Item, amount: number = 1) => {
    item.quality = Math.min(item.quality + amount, MAX_ITEM_QUALITY);
  };
}
