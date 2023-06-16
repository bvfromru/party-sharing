import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAppSelector } from '../../store/hooks';
import { ConsumptionColumnItem, ConsumptionRowItem } from '../../store/models';
import { selectPeople, selectPurchases } from '../../store/selectors';

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

function Consumption() {
  const purchasesList = useAppSelector(selectPurchases);
  const peopleList = useAppSelector(selectPeople);

  const columns: ConsumptionColumnItem[] = [
    { id: 'personId', name: 'Кто' },
    ...purchasesList.map((purchase) => {
      return {
        id: purchase.id,
        name: purchase.name
      };
    })
  ];

  const rows: ConsumptionRowItem[] = peopleList.map((person) => {
    const row: ConsumptionRowItem = { id: person.id, name: person.name };
    purchasesList.forEach((purchase) => {
      const value = purchase.consumers[person.id];
      row[purchase.id] = value;
    });
    return row;
  });

  console.log('Rows: ', rows);

  const handleItemChange = (e: any, key: string, rowIdx: number) => {
    // console.log(e, key, rowIdx);
    const value = e.checked ? 1 : 0;
    // onItemChange(rowIdx, key, value);
  };

  const tableCellTemplate = (cell: any, col: ConsumptionColumnItem, colIdx: number) => {
    console.log('cell: ', cell, 'col: ', col, 'colIdx: ', colIdx);

    return (
      <div>
        {col.id === 'personId' ? cell.name : <Checkbox checked={!!cell[col.id]}></Checkbox>}
      </div>
    );
  };

  if (!peopleList.length || !purchasesList.length) return null;

  return (
    <div className="card">
      <h2>Таблица употребления</h2>
      <DataTable value={rows} stripedRows>
        {/* <Column field="quantity" header="Кто"></Column> */}
        {columns.map((col, colIdx) => (
          <Column
            key={col.id}
            // field={col.id}
            header={col.id === 'personId' ? 'Кто' : col.name}
            body={(cell) => tableCellTemplate(cell, col, colIdx)}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Consumption;
