import 'primeicons/primeicons.css';
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
    <div>
      <People peopleList={peopleList} setPeopleList={setPeopleList} />
      <hr />
      <Purchases peopleList={peopleList} />
      <hr />
      <Consumption />
    </div>
  );
}

export default App;
