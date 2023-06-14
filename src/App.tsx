import './App.css';
import logo from './logo.svg';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/arya-blue/theme.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const toastRef = useRef<Toast>(null);

  const onButtonClick = () => {
    if (text) {
      toastRef.current?.show({ severity: 'info', summary: 'Success', detail: text });
    } else {
      toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Value is required' });
    }
  };

  return (
    <div className="App">
      <Toast ref={toastRef} />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InputText value={text} onChange={(e) => setText(e.target.value)} />
        <br />
        <Button type="button" icon="pi pi-check" onClick={onButtonClick}>
          Submit
        </Button>
        {text}
      </header>
    </div>
  );
}

export default App;
