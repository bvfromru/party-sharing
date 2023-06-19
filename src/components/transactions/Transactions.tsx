import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAppSelector } from '../../store/hooks';
import { AccountingObject } from '../../store/models';
import { selectPeople } from '../../store/selectors';

interface TransactionsProps {
  balances: AccountingObject;
}

function Transactions({ balances }: TransactionsProps) {
  const peopleList = useAppSelector(selectPeople);
  const transactions = [];
  const TOLERANCE = 1;

  const givers: AccountingObject = Object.keys(balances)
    .filter((key) => balances[key] > 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: balances[key] }), {});

  const recievers: AccountingObject = Object.keys(balances)
    .filter((key) => balances[key] < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: Math.abs(balances[key]) }), {});

  console.log('Initial Givers: ', givers);
  console.log('Initial Recievers:', recievers);

  for (const giverKey in givers) {
    for (const receiverKey in recievers) {
      const giverBalance = givers[giverKey];
      const receiverBalance = recievers[receiverKey];
      const amount = giverBalance < receiverBalance ? giverBalance : receiverBalance;
      if (amount > TOLERANCE) {
        givers[giverKey] -= amount;
        recievers[receiverKey] -= amount;
        transactions.push({ from: giverKey, to: receiverKey, amount: Math.round(amount) });
      }
    }
  }

  console.log('Transactions:', transactions);
  console.log('Givers: ', givers);
  console.log('Recievers:', recievers);

  const personTemplate = (personId: string) => {
    return <>{peopleList.find((person) => person.id === personId)?.name ?? 'Person not found'}</>;
  };

  const amountTemplate = (amount: number) => {
    return <>{amount} руб</>;
  };

  return (
    <div className="card">
      <h2>Таблица переводов</h2>
      <DataTable removableSort value={transactions} stripedRows>
        <Column
          field="from"
          header="Кто"
          sortable
          body={({ from }) => personTemplate(from)}></Column>
        <Column field="to" header="Кому" sortable body={({ to }) => personTemplate(to)}></Column>
        <Column
          field="amount"
          header="Сколько"
          sortable
          body={({ amount }) => amountTemplate(amount)}></Column>
      </DataTable>
    </div>
  );
}

export default Transactions;