import { useAppSelector } from '../../store/hooks';
import { selectPeople, selectPurchases } from '../../store/selectors';
import AddPurchaseForm from './addPurchaseForm/AddPurchaseForm';
import PurchasesTable from './purchasesTable/PurchasesTable';

function Purchases() {
  const purchasesList = useAppSelector(selectPurchases);
  const peopleList = useAppSelector(selectPeople);

  return (
    <div className="card">
      <h2>Список покупок</h2>
      <div className="flex flex-column gap-3">
        {!!purchasesList.length && <PurchasesTable purchasesList={purchasesList} />}
        <AddPurchaseForm peopleList={peopleList} />
      </div>
    </div>
  );
}

export default Purchases;
