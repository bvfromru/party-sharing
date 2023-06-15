export interface PersonItem {
  id: string;
  name: string;
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  buyerId: string;
}

export interface ConsumptionItem {
  personId: string;
}
