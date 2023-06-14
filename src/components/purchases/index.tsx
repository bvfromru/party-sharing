import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Person } from '../../models/models';

interface PurchasesProps {
  peopleList: Person[];
}

function Purchases({ peopleList }: PurchasesProps) {
  return (
    <div className="card flex flex-column md:flex-row gap-3">
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-cart-plus"></i>
        </span>
        <InputText placeholder="Покупка" />
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
      />

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <Dropdown
          // value={selectedCity}
          // onChange={(e) => setSelectedCity(e.value)}
          options={peopleList}
          optionLabel="name"
          placeholder="Кто покупал"
          disabled={!peopleList.length}
        />
      </div>

      <Button className="flex-initial">Добавить</Button>
    </div>
  );
}

export default Purchases;
