import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useState } from 'react';
import { DEFAULT_TOLERANCE } from '../../helpers/constants';

function Settings() {
  const [value, setValue] = useState<number>(DEFAULT_TOLERANCE);
  return (
    <div>
      Сколько готовы простить друг другу:{' '}
      <InputNumber
        inputId="integeronly"
        value={value}
        onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value as number)}
      />
    </div>
  );
}

export default Settings;
