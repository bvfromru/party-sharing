import { RootState } from './store';

export const selectPeople = (state: RootState) => state.people;

export const selectPurchases = (state: RootState) => state.purchases;
