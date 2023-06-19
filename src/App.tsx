import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Consumption from './components/consumption/Consumption';
import People from './components/people/People';
import Purchases from './components/purchases/Purchases';
import Transactions from './components/transactions/Transactions';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { clearMainSlice } from './store/mainSlice';
import { AccountingObject, PurchaseItem } from './store/models';
import { selectPeople, selectPurchases } from './store/selectors';
// import 'primereact/resources/themes/nano/theme.css';

function App() {
  const dispatch = useAppDispatch();
  const peopleList = useAppSelector(selectPeople);
  const purchasesList = useAppSelector(selectPurchases);
  const netChanges: AccountingObject = {};
  const debts: AccountingObject = {};
  const balances: AccountingObject = {};

  // Сalculates person's total expenses
  const calculateNetChangeById = (personId: string) => {
    let netChange = 0;
    purchasesList.forEach((purchase) => {
      if (purchase.buyerId === personId) {
        netChange += purchase.price;
      }
    });
    return netChange;
  };

  // Calculates payment amount for one particular purchase of one person
  const calculatePaymentForOnePurchase = (purchase: PurchaseItem, buyerId: string) => {
    const divider = Object.values(purchase.consumers).reduce((a, b) => a + b, 0);
    const onePortionPrice = purchase.price / divider;
    const multiplier = purchase.consumers[buyerId];
    return onePortionPrice * multiplier;
  };

  // Calculates person's total debts
  const calculateDebtsById = (personId: string) => {
    let debts = 0;
    purchasesList.forEach((purchase) => {
      if (purchase.consumers[personId] !== 0) {
        debts += calculatePaymentForOnePurchase(purchase, personId);
      }
    });
    return debts;
  };

  const calculateAccounting = () => {
    peopleList.forEach((person) => {
      const { id } = person;
      netChanges[id] = calculateNetChangeById(id);
      debts[id] = calculateDebtsById(id);
      balances[id] = debts[id] - netChanges[id];
    });
  };

  calculateAccounting();

  return (
    <div className="m-3 ">
      <People netChanges={netChanges} debts={debts} balances={balances} />

      <Purchases />

      <Consumption />

      <Transactions balances={balances} />

      <Button
        className="p-button-danger mt-3"
        type="button"
        onClick={() => dispatch(clearMainSlice)}>
        Очистить
      </Button>
    </div>
  );
}

export default App;
