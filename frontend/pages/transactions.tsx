import type { NextPage } from 'next';
import { useTable, Column } from 'react-table';
import React, { useEffect, useState } from 'react';
import Table from '../src/components/molecules/Table';
import axios from 'axios';

class Transaction {
  id!: string;
  balance!: number;
  bankAccount!: string;
  categories!: string;
  creditAmount!: number;
  date!: string;
  debitAmount!: number;
  narrative!: string;
  serial!: string;
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
        setTransactions(response.data);
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
        accessor: columnName.toLowerCase(),
      };
    });
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
