import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Consumption from './components/consumption/Consumption';
import People from './components/people/People';
import Purchases from './components/purchases/Purchases';

function App() {
  return (
    <div className="m-3 ">
      <People />

      <Purchases />

      <Consumption />
      <Button className="p-button-danger mt-3">Очистить</Button>
    </div>
  );
}

export default App;
