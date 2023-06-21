import { PersonItem } from '../store/models';

export const getPersonNameById = (peopleList: PersonItem[], personId: string) =>
  peopleList.find((person) => person.id === personId)?.name ?? 'Person not Found';
