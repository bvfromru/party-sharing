export interface MainSliceState {
  people: PersonItem[];
  purchases: PurchaseItem[];
}

export interface PersonItem {
  id: string;
  name: string;
}

// consumers - объект с ключами в виде id пользователей
export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  buyerId: string;
  consumers: Record<string, number>;
}

export interface ConsumptionItem {
  personId: string;
}

export interface ConsumptionColumnItem {
  id: string;
  name: string;
}

export interface ConsumptionRowItem {
  [key: string]: string | number;
}

export interface AccountingObject {
  [key: string]: number;
}
