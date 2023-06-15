import { nanoid } from 'nanoid';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { PersonItem, PurchaseItem } from '../../models/models';

interface PurchasesProps {
  peopleList: PersonItem[];
  purchasesList: PurchaseItem[];
  onPurchaseAdd: (newPurchase: PurchaseItem) => void;
  getPersonNameById: (id: string) => string;
}

function Purchases({
  peopleList,
  purchasesList,
  onPurchaseAdd,
  getPersonNameById
}: PurchasesProps) {
  const [product, setProduct] = useState<string>('');
  const [price, setPrice] = useState<number | null>();
  const [buyer, setBuyer] = useState<PersonItem | null>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product && price && buyer) {
      const newPurchase: PurchaseItem = {
        id: nanoid(),
        name: product,
        price,
        buyerId: buyer.id
      };
      onPurchaseAdd(newPurchase);
    }
  };

  const stringTemplate = (purchase: PurchaseItem) => {
    return (
      <div className="col-12">
        {purchase.name} - {purchase.price} - {purchase.buyerId}
      </div>
    );
  };

  if (!peopleList.length) return null;

  return (
    <div className="card flex flex-column gap-3">
      <h2>Список покупок</h2>
      {!!purchasesList.length && (
        <div>
          <DataView value={purchasesList} itemTemplate={stringTemplate} />
        </div>
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
            onChange={(e) => setBuyer(e.value)}
            // onChange={(e) => console.log(e)}
          />
        </div>

        <Button type="submit" className="flex-initial">
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default Purchases;
