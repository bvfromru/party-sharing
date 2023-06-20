import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPurchase } from '../../store/mainSlice';
import { PersonItem } from '../../store/models';
import { selectPeople, selectPurchases } from '../../store/selectors';

function Purchases() {
  const purchasesList = useAppSelector(selectPurchases);
  const peopleList = useAppSelector(selectPeople);
  const getPersonNameById = (id: string) =>
    peopleList.find((person) => person.id === id)?.name ?? 'Not Found';

  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<string>('');
  const [price, setPrice] = useState<number | null>();
  const [buyer, setBuyer] = useState<PersonItem | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product && price && buyer) {
      const newPurchase = {
        name: product,
        price,
        buyerId: buyer.id
      };
      dispatch(addPurchase(newPurchase));
      setProduct('');
      setPrice(null);
      setBuyer(null);
    }
  };

  return (
    <div className="card">
      <h2>Список покупок</h2>
      <div className="flex flex-column gap-3">
        {!!purchasesList.length && (
          <DataTable removableSort value={purchasesList} stripedRows size="small">
            <Column
              field="name"
              header="Покупка"
              sortable
              body={({ name }, { rowIndex }) => `${rowIndex + 1}. ${name}`}></Column>
            <Column
              field="price"
              header="Цена"
              sortable
              body={({ price }) => `${price} руб`}></Column>
            <Column
              field="buyerId"
              header="Кто покупал"
              sortable
              body={({ buyerId }) => getPersonNameById(buyerId)}></Column>
          </DataTable>
        )}
        <form className="card flex flex-column md:flex-row gap-3" onSubmit={handleSubmit}>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-cart-plus"></i>
            </span>

            <InputText
              placeholder="Покупка"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>

          <InputNumber
            className="flex-1"
            placeholder="Цена"
            mode="currency"
            currency="RUB"
            locale="ru-RU"
            maxFractionDigits={0}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            step={50}
            required
            value={price}
            onChange={(e) => setPrice(e.value)}
          />

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Dropdown
              options={peopleList}
              optionLabel="name"
              placeholder="Кто покупал"
              value={buyer}
              required
              onChange={(e) => setBuyer(e.value)}
              // onChange={(e) => console.log(e)}
            />
          </div>

          <Button type="submit" className="flex-initial" disabled={!buyer}>
            Добавить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Purchases;
