import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useAppDispatch } from '../../../store/hooks';
import { addPurchase } from '../../../store/mainSlice';
import { PersonItem } from '../../../store/models';

interface PurchasesTableProps {
  peopleList: PersonItem[];
}

interface FormData {
  name: string;
  price: number | undefined;
  buyer: PersonItem | null;
}

function AddPurchaseForm({ peopleList }: PurchasesTableProps) {
  const dispatch = useAppDispatch();

  const initialValues: FormData = {
    name: '',
    price: undefined,
    buyer: null
  };

  const handleSubmit = ({ name, price, buyer }: FormData) => {
    if (name && price && buyer) {
      dispatch(addPurchase({ name, price, buyer }));
      formik.resetForm();
    }
  };

  const formik = useFormik({ initialValues, onSubmit: handleSubmit });

  return (
    <form className="card flex flex-column md:flex-row gap-3" onSubmit={formik.handleSubmit}>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-cart-plus"></i>
        </span>

        <InputText
          name="name"
          placeholder="Покупка"
          value={formik.values.name}
          onChange={(e) => {
            formik.setFieldValue('name', e.target.value);
          }}
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
        value={formik.values.price}
        onValueChange={(e) => formik.setFieldValue('price', e.value)}
        // className={classNames({ 'p-invalid': isFormFieldInvalid('city') })}
      />

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <Dropdown
          name="buyer"
          options={peopleList}
          optionLabel="name"
          placeholder="Кто покупал"
          value={formik.values.buyer}
          onChange={(e: DropdownChangeEvent) => formik.setFieldValue('buyer', e.value)}
        />
      </div>

      <Button type="submit" className="flex-initial">
        Добавить
      </Button>
    </form>
  );
}

export default AddPurchaseForm;
