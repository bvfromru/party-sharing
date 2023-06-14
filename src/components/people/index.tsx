import { nanoid } from 'nanoid';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dispatch, SetStateAction, useState } from 'react';
import { Person } from '../../models/models';

interface PeopleProps {
  peopleList: Person[];
  setPeopleList: Dispatch<SetStateAction<Person[]>>;
}

function People({ peopleList, setPeopleList }: PeopleProps) {
  const [input, setInput] = useState('');

  const addPerson = () => {
    const person = { id: nanoid(), name: input };
    setPeopleList([...peopleList, person]);
    setInput('');
  };

  const clearPeopleList = () => {
    setPeopleList([]);
  };

  return (
    <div>
      <div>
        {!!peopleList.length && (
          <ul>
            {peopleList.map((el) => (
              <li key={el.id}>
                {el.name}
                {/* <Button icon="pi pi-times" className="p-button-secondary" size="small"></Button> */}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-inputgroup">
        <InputText placeholder="Имя" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button className="p-button-prime" onClick={addPerson}>
          Добавить
        </Button>
      </div>
      <Button className="p-button-danger" onClick={clearPeopleList}>
        Очистить
      </Button>
    </div>
  );
}

export default People;
