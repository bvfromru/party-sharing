import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ConsumptionItem, PersonItem, PurchaseItem } from '../../models/models';

// const mockData = [
//   {
//     personId: 'pnki6q3mHpstbs0Y_cVJX',
//     pnki6q3mHpstbs0Y_cVJX: 1,
//     pnki6q3mHpstbs0Y_cVJX: 0,
//     pnki6q3mHpstbs0Y_cVJX: '1'
//   },
//   {
//     personId: 'lkl345sdfsdf40Y_cDFG',
//     pnki6q3mHpstbs0Y_cVJX: 1,
//     pnki6q3mHpstbs0Y_cVJX: 0,
//     pnki6q3mHpstbs0Y_cVJX: '1'
//   }
// ];

interface ConsumptionProps {
  consumptionList: ConsumptionItem[];
  onItemChange: (rowIdx: number, key: string, value: number) => void;
  peopleList: PersonItem[];
  purchasesList: PurchaseItem[];
  getPersonNameById: (id: string) => string;
  getPurchaseNameById: (id: string) => string;
}

function Consumption({
  consumptionList,
  onItemChange,
  peopleList,
  purchasesList,
  getPersonNameById,
  getPurchaseNameById
}: ConsumptionProps) {
  const mockColumns = consumptionList.length ? Object.keys(consumptionList[0]) : [];

  const handleItemChange = (e: any, key: string, rowIdx: number) => {
    // console.log(e, key, rowIdx);
    const value = e.checked ? 1 : 0;
    onItemChange(rowIdx, key, value);
  };

  const tableCellTemplate = (item: any, key: string, rowIdx: number) => {
    console.log(item, key, rowIdx);

    return (
      <div>
        {key === 'personId' ? (
          getPersonNameById(item[key])
        ) : (
          <Checkbox
            checked={!!item[key]}
            onChange={(e) => handleItemChange(e, key, rowIdx)}></Checkbox>
        )}
      </div>
    );
  };

  if (!consumptionList.length) return null;

  return (
    <div className="card">
      <h2>Таблица употребления</h2>
      <DataTable value={consumptionList} stripedRows>
        {/* <Column field="quantity" header="Кто"></Column> */}
        {mockColumns.map((purchaseId, i) => (
          <Column
            key={purchaseId}
            field={purchaseId}
            header={purchaseId === 'personId' ? 'Кто' : getPurchaseNameById(purchaseId)}
            body={(product) => tableCellTemplate(product, purchaseId, i)}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Consumption;
