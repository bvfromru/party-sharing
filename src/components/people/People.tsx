import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPerson } from '../../store/mainSlice';
import { AccountingObject, PersonItem } from '../../store/models';
import { selectPeople, selectPurchases } from '../../store/selectors';

interface PeopleProps {
  netChanges: AccountingObject;
  debts: AccountingObject;
  balances: AccountingObject;
}

function People({ netChanges, debts, balances }: PeopleProps) {
  const peopleList = useAppSelector(selectPeople);
  const purchasesList = useAppSelector(selectPurchases);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPerson(input));
    setInput('');
  };

  const stringTemplate = (person: PersonItem) => {
    return (
      <div className="col-12">
        {person.name}; Траты: {netChanges[person.id].toFixed()} руб; Долги:{' '}
        {debts[person.id].toFixed()} руб; Баланс: {balances[person.id].toFixed()} руб
      </div>
    );
  };

  return (
    <div className="card flex flex-column gap-3">
      <h2>Список людей</h2>
      <div>
        {!!peopleList.length && (
          // <ul>
          //   {peopleList.map((el, i) => (
          //     <li key={el.id}>
          //       {i + 1}. {el.name}
          //     </li>
          //   ))}
          // </ul>
          <DataView value={peopleList} itemTemplate={stringTemplate} />
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-inputgroup">
        <InputText placeholder="Имя" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type="submit" className="p-button-prime" disabled={!input}>
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default People;
