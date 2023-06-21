import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
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

  const handleMultiplierChange = (personId: string, purchaseId: string, value: number) => {
    dispatch(changeConsumption({ personId, purchaseId, value }));
  };

  const handleRowChange = (purchaseId: string, isChecked: boolean) => {
    // console.log('event: :', e, 'cell: ', cell, 'col: ', col, 'colIdx: ', colIdx);
    const value = isChecked ? 1 : 0;
    dispatch(changeRowConsumption({ purchaseId, value }));
  };

  const cellTemplate = (row: ConsumptionRowItem, col: ConsumptionColumnItem) => {
    const value = row[col.id];
    return (
      <div>
        {col.id === 'personId' ? (
          row.name
        ) : (
          <div className="flex gap-2 align-items-center">
            <Checkbox
              checked={!!value}
              onChange={(e) =>
                handleItemChange(row.id as string, col.id, e.checked ?? false)
              }></Checkbox>
            <InputNumber
              value={value ? (value as number) : 1}
              onValueChange={(e) =>
                handleMultiplierChange(row.id as string, col.id, e.value as number)
              }
              mode="decimal"
              showButtons
              min={0.25}
              max={10}
              size={1}
              step={0.25}
              disabled={!value}
              inputClassName="multiplier"
            />
          </div>
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
          <div className="flex gap-2 flex-wrap z-index">
            <Checkbox
              checked={value}
              onChange={(e) => handleRowChange(col.id, e.checked ?? false)}></Checkbox>
            <div>{col.name}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card">
      <h2>Таблица употребления</h2>
      <DataTable value={rows} stripedRows size="small" removableSort scrollable>
        {columns.map((col, colIdx) => (
          <Column
            key={col.id}
            sortField="name"
            header={() => headerCellTemplate(col, colIdx)}
            body={(row) => cellTemplate(row, col)}
            sortable={colIdx === 0}
            frozen={colIdx === 0}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Consumption;
