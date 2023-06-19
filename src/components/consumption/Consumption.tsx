import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeConsumption, changeRowConsumption } from '../../store/mainSlice';
import { ConsumptionColumnItem, ConsumptionRowItem } from '../../store/models';
import { selectPeople, selectPurchases } from '../../store/selectors';

function Consumption() {
  const purchasesList = useAppSelector(selectPurchases);
  const peopleList = useAppSelector(selectPeople);
  const dispatch = useAppDispatch();

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

  // console.log('Rows: ', rows);

  const handleItemChange = (personId: string, purchaseId: string, isChecked: boolean) => {
    // console.log('event: :', e, 'cell: ', cell, 'col: ', col, 'colIdx: ', colIdx);
    const value = isChecked ? 1 : 0;
    dispatch(changeConsumption({ personId, purchaseId, value }));
  };

  const handleRowChange = (purchaseId: string, isChecked: boolean) => {
    // console.log('event: :', e, 'cell: ', cell, 'col: ', col, 'colIdx: ', colIdx);
    const value = isChecked ? 1 : 0;
    dispatch(changeRowConsumption({ purchaseId, value }));
  };

  const cellTemplate = (row: ConsumptionRowItem, col: ConsumptionColumnItem) => {
    return (
      <div>
        {col.id === 'personId' ? (
          row.name
        ) : (
          <Checkbox
            checked={!!row[col.id]}
            onChange={(e) =>
              handleItemChange(row.id as string, col.id, e.checked ?? false)
            }></Checkbox>
        )}
      </div>
    );
  };

  const headerCellTemplate = (col: ConsumptionColumnItem, colIdx: number) => {
    // console.log('col: ', col);
    const purchase = purchasesList.find((purchase) => purchase.id === col.id);
    let value: boolean;
    if (purchase) {
      value = Object.values(purchase.consumers).every((value) => value);
    } else {
      value = false;
    }

    return (
      <div>
        {colIdx === 0 ? (
          'Кто'
        ) : (
          <div className="flex gap-2 flex-wrap">
            <Checkbox
              checked={value}
              onChange={(e) => handleRowChange(col.id, e.checked ?? false)}></Checkbox>
            <div>{col.name}</div>
          </div>
        )}
      </div>
    );
  };

  if (!peopleList.length || !purchasesList.length) return null;

  return (
    <div className="card">
      <h2>Таблица употребления</h2>
      <DataTable value={rows} stripedRows>
        {columns.map((col, colIdx) => (
          <Column
            key={col.id}
            // header={col.id === 'personId' ? 'Кто' : col.name}
            header={() => headerCellTemplate(col, colIdx)}
            body={(row) => cellTemplate(row, col)}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Consumption;

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
