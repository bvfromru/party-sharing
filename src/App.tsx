import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useState } from 'react';
import Consumption from './components/consumption';
import People from './components/people';
import Purchases from './components/purchases';
import { Person, Purchase } from './models/models';

function App() {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [purchasesList, setPurchasesList] = useState<Purchase[]>([]);

  return (
    <div className="m-3 ">
      <People peopleList={peopleList} setPeopleList={setPeopleList} />

      <Purchases
        peopleList={peopleList}
        purchasesList={purchasesList}
        setPurchasesList={setPurchasesList}
      />
      <h2>Таблица употребления</h2>
      <Consumption />
      <Button className="p-button-danger mt-3">Очистить</Button>
    </div>
  );
}

export default App;
