import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';

const mockData = [
  {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 2
  }
];

function Consumption() {
  const [products, setProducts] = useState([]);

  return (
    <div className="card">
      <DataTable value={mockData} stripedRows tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}

export default Consumption;
