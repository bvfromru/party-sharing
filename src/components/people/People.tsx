import { nanoid } from 'nanoid';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { PersonItem } from '../../models/models';

interface PeopleProps {
  peopleList: PersonItem[];
  onPersonAdd: (newPerson: PersonItem) => void;
}

function People({ peopleList, onPersonAdd }: PeopleProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPerson: PersonItem = { id: nanoid(), name: input };
    onPersonAdd(newPerson);
    setInput('');
  };

  const stringTemplate = (person: PersonItem) => {
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
