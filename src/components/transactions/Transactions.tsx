import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { getPersonNameById } from '../../helpers/utils';
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

  // console.log('Initial Givers: ', givers);
  // console.log('Initial Recievers:', recievers);

  for (const giverKey in givers) {
    for (const receiverKey in recievers) {
      const giverBalance = givers[giverKey];
      const receiverBalance = recievers[receiverKey];
      const amount = giverBalance < receiverBalance ? giverBalance : receiverBalance;
      if (amount > TOLERANCE) {
        givers[giverKey] -= amount;
        recievers[receiverKey] -= amount;
        transactions.push({
          from: getPersonNameById(peopleList, giverKey),
          to: getPersonNameById(peopleList, receiverKey),
          amount: Math.round(amount)
        });
      }
    }
  }

  // console.log('Transactions:', transactions);
  // console.log('Givers: ', givers);
  // console.log('Recievers:', recievers);

  return (
    <div className="card">
      <h2>Таблица переводов</h2>
      {transactions.length ? (
        <DataTable removableSort value={transactions} stripedRows size="small">
          <Column field="from" header="Кто" sortable></Column>
          <Column field="to" header="Кому" sortable></Column>
          <Column
            field="amount"
            header="Сколько"
            sortable
            body={({ amount }) => <>{amount} руб</>}></Column>
        </DataTable>
      ) : (
        <h3>Никто никому не должен!</h3>
      )}
    </div>
  );
}

export default Transactions;
