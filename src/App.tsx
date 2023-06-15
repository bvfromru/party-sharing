import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useState } from 'react';
import Consumption from './components/consumption/Consumption';
import People from './components/people/People';
import Purchases from './components/purchases/Purchases';
import { PersonItem, PurchaseItem } from './models/models';

function App() {
  const [peopleList, setPeopleList] = useState<PersonItem[]>([]);
  const [purchasesList, setPurchasesList] = useState<PurchaseItem[]>([]);
  const [consumptionList, setConsumptionList] = useState<any>([]);

  const getPersonNameById = (id: string) => {
    const person = peopleList.find((el) => el.id === id);
    return person?.name ?? 'Not found';
  };

  const getPurchaseNameById = (id: string) => {
    const purchase = purchasesList.find((el) => el.id === id);
    return purchase?.name ?? 'Not found';
  };

  const onPersonAdd = (newPerson: PersonItem) => {
    setPeopleList([...peopleList, newPerson]);
    const newConsumptionItem: any = { personId: newPerson.id };
    for (let i = 0; i < purchasesList.length; i++) {
      newConsumptionItem[purchasesList[i].id] = 0;
    }
    setConsumptionList([...consumptionList, newConsumptionItem]);
  };

  const onPurchaseAdd = (newPurchase: PurchaseItem) => {
    setPurchasesList([...purchasesList, newPurchase]);
    // console.log('oldConsumptionList ', consumptionList);
    const newConsumptionList = [...consumptionList];
    const newKey = newPurchase.id;
    newConsumptionList.forEach((item: any) => (item[newKey] = 0));
    // console.log('newConsumptionList ', newConsumptionList);
    setConsumptionList(newConsumptionList);
  };

  const handleItemChange = (rowIdx: number, key: string, value: number) => {
    console.log(rowIdx, key, value);
    console.log(consumptionList);
    consumptionList[rowIdx - 1][key] = value;
    setConsumptionList([...consumptionList]);
  };

  return (
    <div className="m-3 ">
      <People peopleList={peopleList} onPersonAdd={onPersonAdd} />

      <Purchases
        peopleList={peopleList}
        purchasesList={purchasesList}
        onPurchaseAdd={onPurchaseAdd}
        getPersonNameById={getPersonNameById}
      />

      <Consumption
        consumptionList={consumptionList}
        onItemChange={handleItemChange}
        peopleList={peopleList}
        purchasesList={purchasesList}
        getPersonNameById={getPersonNameById}
        getPurchaseNameById={getPurchaseNameById}
      />
      <Button className="p-button-danger mt-3">Очистить</Button>
    </div>
  );
}

export default App;
