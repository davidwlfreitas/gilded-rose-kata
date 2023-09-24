import { GildedRose } from '@/src/gilded-rose';
import { Item } from '@/src/gilded-rose-item';
import { MAX_ITEM_QUALITY, MIN_ITEM_QUALITY, SULFURAS_ITEM_QUALITY } from '@/src/utils/constants';

describe('GildedRose', () => {
  describe('updateQuality', () => {
    it('should decrease quality by 1 for normal items', () => {
      const items = [new Item('+5 Dexterity Vest', 10, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(9);
    });

    it('should decrease quality by 2 for conjured items', () => {
      const items = [new Item('Conjured Mana Cake', 10, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(8);
    });

    it('should increase quality by 1 for aged brie items', () => {
      const items = [new Item('Aged Brie Cheese', 10, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(11);
    });

    it('should increase quality by 2 for aged brie items after sellIn date', () => {
      const items = [new Item('Aged Brie Cheese from NZ', -1, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(12);
    });

    it('should increase quality by 3 for backstage pass items when sellIn is less than or equal to 5', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(13);
    });

    it('should increase quality by 2 for backstage pass items when sellIn is less than or equal to 10', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(12);
    });

    it('should not change quality for sulfuras items', () => {
      const items = [new Item('Sulfuras, Hand of Ragnaros', 10, SULFURAS_ITEM_QUALITY)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(SULFURAS_ITEM_QUALITY);
    });

    it('should not decrease quality below 0', () => {
      const items = [new Item('Elixir of the Mongoose', 10, MIN_ITEM_QUALITY)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(MIN_ITEM_QUALITY);
    });

    it('should decrease the sellIn of normal items by 1', () => {
      const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
    });

    it('should not decrease the quality of normal items below 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it('should increase the quality of Backstage Pass items by 1 when sellIn is greater than 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(11);
    });

    it('should set the quality of Backstage Pass items to 0 when sellIn is less than 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it('should not change the sellIn of Sulfuras items', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 13, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(13);
    });

    it('should decrease the quality of normal items by 2 after sellIn date has passed', () => {
      const items = [new Item('foo', -1, 5)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(3);
    });

    it(`should not increase the quality of Aged Brie above ${MAX_ITEM_QUALITY}`, () => {
      const items = [new Item('Aged Brie', 10, MAX_ITEM_QUALITY)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(MAX_ITEM_QUALITY);
    });

    it('should decrease the quality of Conjured items by 2', () => {
      const items = [new Item('Conjured Mana Cake', 10, 5)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(3);
    });

    it('should decrease the quality of Conjured items by 4 after sellIn date has passed', () => {
      const items = [new Item('Conjured Mana Cake', -1, 5)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(1);
    });

    it('should not decrease the quality of Conjured items below 0', () => {
      const items = [new Item('Conjured Mana Cake', 10, 0)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(0);
    });
  });
});