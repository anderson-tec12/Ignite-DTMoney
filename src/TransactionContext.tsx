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

interface TransactionsProviderProps{
  children:ReactNode
}

export const TransactionContext = createContext<Transaction[]>([])

export function TransactionProvider({children}:TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() =>{
    api.get('api/transactions')
    .then(resp => {      
      setTransactions(resp.data.transactions)
    })
  }, [])


  return (
    <TransactionContext.Provider value={transactions}>
      {children}
    </TransactionContext.Provider>
  )
}