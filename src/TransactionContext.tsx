import {createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './services/Api'

interface Transaction{
  amount:number,
  category:string,
  createdAt: string
  id:string,
  title:string,
  type:string,
}

interface TransactionInput{
  amount:number,
  category:string,
  title:string,
  type:string,
  createdAt:Date
}

interface TransactionsProviderProps{
  children:ReactNode
}

interface TransactionsContextData{
  transactions:Transaction[], 
  createTransaction: (transaction:TransactionInput)=> Promise<void>
}

export const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionProvider({children}:TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() =>{
    api.get('api/transactions')
    .then(resp => {      
      setTransactions(resp.data.transactions)
    })
  }, [])


  async function createTransaction(transactionInput:TransactionInput){

    const response = await api.post('api/transactions', transactionInput)
    const {transaction} = response.data

    console.log(response.data)
    setTransactions([...transactions,transaction])
  }


  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}