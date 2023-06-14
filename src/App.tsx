import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useState } from 'react';
import Consumption from './components/consumption';
import People from './components/people';
import Purchases from './components/purchases';
import { Person } from './models/models';

function App() {
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  return (
    <div className="m-3 ">
      <h2>Список людей</h2>
      <People peopleList={peopleList} setPeopleList={setPeopleList} />
      <h2>Список покупок</h2>
      <Purchases peopleList={peopleList} />
      <h2>Таблица употребления</h2>
      <Consumption />
      <Button className="p-button-danger mt-3">Очистить</Button>
    </div>
  );
}

export default App;
