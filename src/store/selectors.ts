import { RootState } from './store';

export const selectPeople = (state: RootState) => state.people;

export const selectPurchases = (state: RootState) => state.purchases;

export const selectPersonNameById = (state: RootState, id: string): string => {
  return state.people.find((person) => person.id === id)?.name ?? 'Not Found';
};
