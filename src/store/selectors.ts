import { RootState } from './store';

export const selectPeople = (state: RootState) => {
  state.main.people;
};
