import type { NextPage } from 'next';
import { useTable, Column } from 'react-table';
import React, { useEffect, useState } from 'react';
import Table from '../src/components/molecules/Table';
import axios from 'axios';
import {
  TransactionCategory,
  TransactionType,
} from '../../common/types/transaction.type';

class Transaction implements TransactionType {
  id!: string;
  bankAccount!: string;
  date!: string;
  narrative!: string;
  debitAmount!: number;
  creditAmount!: number;
  balance!: number;
  categories!: TransactionCategory;
  serial!: string;
  category?: string;
}
const Transactions: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [columns, setColumns] = useState<Column<object>[]>([]);

  const [loading, setLoading] = useState(false);

  const init = async () => {
    let data = axios.get<Transaction[]>(
      `${process.env.BASE_API_URL}/transactions`,
    );
    return data;
  };

  useEffect(() => {
    setLoading(true);
    createColumns();
    async function fetchData() {
      const response = await init();
      if (response.data && response.data.length > 0) {
        setTransactions([response.data[0]]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const createColumns = () => {
    let cols: Column<object>[] = Object.getOwnPropertyNames(
      new Transaction(),
    ).map((columnName) => {
      return {
        Header: columnName.toUpperCase(),
        accessor: columnName,
      };
    });
    // cols.push({
    //   Header: 'Amount',
    //   accessor: 'amount',
    // });
    setColumns(cols);
  };

  // useEffect(()=>{
  // },[loading]);

  const render = () => {
    if (loading) {
      //TODO: maybe i can display the headers already and then the table body as loading ???
      return <div>loading ...</div>;
    }

    return <Table columns={columns} data={transactions} />;
  };

  return render();
};

export default Transactions;
