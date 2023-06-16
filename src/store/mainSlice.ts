import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { mockState } from './mockState';
import { MainSliceState, PersonItem, PurchaseItem } from './models';

const initialState: MainSliceState = mockState;

export const tasksSlice = createSlice({
  name: 'main',
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

    addPurchase: (
      state,
      action: PayloadAction<{ name: string; price: number; buyerId: string }>
    ) => {
      const newPurchase: PurchaseItem = {
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
        buyerId: action.payload.buyerId,
        consumers: {}
      };
      state.people.forEach((person) => (newPurchase.consumers[person.id] = 0));
      state.purchases.push(newPurchase);
    }
  }
});

export const { addPerson, addPurchase } = tasksSlice.actions;

export default tasksSlice.reducer;
