import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPerson, deletePerson } from '../../store/mainSlice';
import { AccountingObject, PersonItem } from '../../store/models';
import { selectPeople } from '../../store/selectors';

interface PeopleProps {
  netChanges: AccountingObject;
  debts: AccountingObject;
  balances: AccountingObject;
}

function People({ netChanges, debts, balances }: PeopleProps) {
  const peopleList = useAppSelector(selectPeople);
  // const purchasesList = useAppSelector(selectPurchases);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPerson(input));
    setInput('');
  };

  const colTemplate = (person: PersonItem) => {
    const { name, id } = person;
    return (
      <div className="flex gap-2 align-items-center">
        <Button
          icon="pi pi-times"
          className="delete-button"
          text
          severity="danger"
          size="small"
          onClick={() => dispatch(deletePerson(id))}
        />
        {name} (траты: {netChanges[id].toFixed()} руб; долги: {debts[id].toFixed()} руб; баланс:{' '}
        {balances[id].toFixed()} руб)
      </div>
    );
  };

  return (
    <div className="card">
      <h2>Список людей</h2>
      <div className="flex flex-column gap-3">
        <div>
          {!!peopleList.length && (
            <DataTable removableSort value={peopleList} stripedRows size="small">
              <Column
                field="name"
                header="Кто"
                sortable
                body={(person) => colTemplate(person)}></Column>
            </DataTable>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-inputgroup">
          <InputText placeholder="Имя" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" className="p-button-prime" disabled={!input}>
            Добавить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default People;
