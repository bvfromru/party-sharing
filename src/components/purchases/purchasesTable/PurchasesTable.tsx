import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAppDispatch } from '../../../store/hooks';
import { deletePurchase } from '../../../store/mainSlice';
import { PurchaseItem } from '../../../store/models';

interface PurchasesTableProps {
  purchasesList: PurchaseItem[];
}

function PurchasesTable({ purchasesList }: PurchasesTableProps) {
  const dispatch = useAppDispatch();

  const firstColTemplate = (purchase: PurchaseItem) => {
    const { name, id } = purchase;
    return (
      <div className="flex gap-2 align-items-center">
        <Button
          icon="pi pi-times"
          className="delete-button"
          text
          severity="danger"
          size="small"
          onClick={() => dispatch(deletePurchase(id))}
        />
        {name}
      </div>
    );
  };

  return (
    <DataTable removableSort value={purchasesList} stripedRows size="small">
      <Column
        field="name"
        header="Покупка"
        sortable
        body={(purchase, { rowIndex }) => firstColTemplate(purchase)}></Column>
      <Column field="price" header="Цена" sortable body={({ price }) => `${price} руб`}></Column>
      <Column field="buyerName" header="Кто покупал" sortable></Column>
    </DataTable>
  );
}

export default PurchasesTable;
