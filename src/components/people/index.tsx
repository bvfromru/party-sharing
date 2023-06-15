import { nanoid } from 'nanoid';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Person } from '../../models/models';

interface PeopleProps {
  peopleList: Person[];
  setPeopleList: Dispatch<SetStateAction<Person[]>>;
}

function People({ peopleList, setPeopleList }: PeopleProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const person = { id: nanoid(), name: input };
    setPeopleList([...peopleList, person]);
    setInput('');
  };

  const stringTemplate = (person: Person) => {
    return <div className="col-12">{person.name}</div>;
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
