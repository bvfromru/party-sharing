import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { PersonItem } from '../models/models';

export interface MainSliceState {
  people: PersonItem[];
}

const initialState = {
  people: [
    { id: 'dfkjf', name: 'Виталий' },
    { id: 'kjdkjsfd', name: 'Олег' }
  ]
};

export const tasksSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<string>) => {
      const newPerson = {
        id: nanoid(),
        name: action.payload
      };
      state.people.push(newPerson);
    }
  }
});

export const { addPerson } = tasksSlice.actions;

export default tasksSlice.reducer;
