import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { MainSliceState, PersonItem, PurchaseItem } from './models';

const initialState: MainSliceState = { people: [], purchases: [] };

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<string>) => {
      const newPerson: PersonItem = {
        id: nanoid(),
        name: action.payload
      };
      state.people.push(newPerson);
      state.purchases.forEach((purchase) => (purchase.consumers[newPerson.id] = 0));
    },

    deletePerson: (state, action: PayloadAction<string>) => {
      const personId = action.payload;
      state.people = state.people.filter((person) => person.id !== personId);
      state.purchases.forEach((purchase) => delete purchase.consumers[personId]);
      state.purchases = state.purchases.filter((purchase) => purchase.buyerId !== personId);
    },

    addPurchase: (
      state,
      action: PayloadAction<{ name: string; price: number; buyer: PersonItem }>
    ) => {
      const newPurchase: PurchaseItem = {
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
        buyerId: action.payload.buyer.id,
        buyerName: action.payload.buyer.name,
        consumers: {}
      };
      state.people.forEach((person) => (newPurchase.consumers[person.id] = 0));
      state.purchases.push(newPurchase);
    },

    deletePurchase: (state, action: PayloadAction<string>) => {
      const purchaseId = action.payload;
      state.purchases = state.purchases.filter((purchase) => purchase.id !== purchaseId);
    },

    // Change one cell value of Consumption table
    changeConsumption: (
      state,
      action: PayloadAction<{ personId: string; purchaseId: string; value: number }>
    ) => {
      const purchase = state.purchases.find(
        (purchase) => purchase.id === action.payload.purchaseId
      );
      if (purchase) {
        purchase.consumers[action.payload.personId] = action.payload.value;
      }
    },

    // Change consumption for whole row in Consumption table
    changeRowConsumption: (state, action: PayloadAction<{ purchaseId: string; value: number }>) => {
      const purchase = state.purchases.find(
        (purchase) => purchase.id === action.payload.purchaseId
      );
      if (purchase) {
        Object.keys(purchase.consumers).forEach(
          (key) => (purchase.consumers[key] = action.payload.value)
        );
      }
    },

    clearMainSlice: (state) => {
      state.people = [];
      state.purchases = [];
    }
  }
});

export const {
  addPerson,
  addPurchase,
  changeConsumption,
  changeRowConsumption,
  clearMainSlice,
  deletePerson,
  deletePurchase
} = mainSlice.actions;

export default mainSlice.reducer;
