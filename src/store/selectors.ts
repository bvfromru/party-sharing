import { RootState } from './store';

export const selectPeople = (state: RootState) => state.main.people;

export const selectPurchases = (state: RootState) => state.main.purchases;

export const selectPersonNameById = (state: RootState, id: string): string => {
  return state.main.people.find((person) => person.id === id)?.name ?? 'Not Found';
};
