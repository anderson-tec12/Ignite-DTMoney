import {useEffect, useState} from 'react'
import { api } from '../../services/Api';
import { Container } from "./styles";

interface Transaction{
  amount:number,
  category:string,
  createdAt: string
  id:string,
  title:string,
  type:string,
}

export function TransactionsTable(){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() =>{
    api.get('api/transactions')
    .then(resp => {      
      setTransactions(resp.data.transactions)
    })
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td >
                  {transaction.title}
                </td>
                <td className={transaction.type}>R$ {transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))
          }
          
          
        </tbody>
      </table>
    </Container>
  )
}