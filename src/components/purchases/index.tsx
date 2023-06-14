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
    <div>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-cart-plus"></i>
        </span>
        <InputText placeholder="Покупка" />
      </div>

      <InputNumber
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

      <Dropdown
        // value={selectedCity}
        // onChange={(e) => setSelectedCity(e.value)}
        options={peopleList}
        optionLabel="name"
        placeholder="Кто покупал"
        className="w-full md:w-14rem"
        disabled={!peopleList.length}
      />

      <Button>Добавить</Button>
    </div>
  );
}

export default Purchases;
