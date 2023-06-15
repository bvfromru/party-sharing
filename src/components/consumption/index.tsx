import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

const mockData = [
  {
    Кто: 'Виталий',
    col1: 'Col 1 Vitaliy',
    col2: 'Col 2 Vitaliy',
    col3: 'Col 3 Vitaliy'
  },
  {
    Кто: 'Олег',
    col1: 'Col 1 Oleg',
    col2: 'Col 2 Oleg',
    col3: 'Col 3 Oleg'
  }
];

const mockColumns = ['Кто', 'col1', 'col2', 'col3'];

const priceBodyTemplate = (product: any, col: string) => {
  return (
    <div>
      {product[col]}
      <Checkbox checked={false}></Checkbox>
    </div>
  );
};

function Consumption() {
  const [products, setProducts] = useState([]);

  return (
    <div className="card">
      <DataTable value={mockData} stripedRows tableStyle={{ minWidth: '50rem' }}>
        {/* <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column> */}
        {mockColumns.map((col, i) => (
          <Column
            key={col}
            field={col}
            header={col}
            body={(product) => priceBodyTemplate(product, col)}
          />
        ))}
      </DataTable>
    </div>
  );
}

export default Consumption;
