import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addPurchase } from '../../../store/mainSlice';
import { PersonItem } from '../../../store/models';

interface PurchasesTableProps {
  peopleList: PersonItem[];
}

function AddPurchaseForm({ peopleList }: PurchasesTableProps) {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | null>();
  const [buyer, setBuyer] = useState<PersonItem | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && price && buyer) {
      const newPurchase = {
        name,
        price,
        buyer
      };
      dispatch(addPurchase(newPurchase));
      setName('');
      setPrice(null);
      setBuyer(null);
      inputRef.current?.focus();
    }
  };

  return (
    <form className="card flex flex-column md:flex-row gap-3" onSubmit={handleSubmit}>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-cart-plus"></i>
        </span>

        <InputText
          placeholder="Покупка"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          ref={inputRef}
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
        />
      </div>

      <Button type="submit" className="flex-initial" disabled={!buyer}>
        Добавить
      </Button>
    </form>
  );
}

export default AddPurchaseForm;
