import type { NextPage } from 'next';
import { CellProps, Column } from 'react-table';
import React, { useEffect, useMemo, useState } from 'react';
import Table from '../src/components/molecules/Table';
import axios from 'axios';
import {
  TransactionCategory,
  TransactionType,
} from '../../common/types/transaction.type';
import { Category } from './categories';
import { column, getColumnOptions } from '../decorators';
import {
  BalanceCell,
  CategoryCell,
  CreditAmountCell,
  DebitAmountCell,
} from '../src/components/molecules/Cells/DebitAmountCell';
import CategoriesDropdown from '../src/components/atoms/CategoriesDropdown';

class Transaction implements TransactionType {
  @column({
    visible: false,
  })
  id!: string;

  @column({
    visible: false,
  })
  bankAccount!: string;
  date!: string;

  @column({
    title: 'Description',
  })
  narrative!: string;

  @column({
    title: 'Debit',
    Cell: (value: any) => <DebitAmountCell value={Number(value)} />,
  })
  debitAmount!: number;

  @column({
    title: 'Credit',
    Cell: (value: any) => <CreditAmountCell value={Number(value)} />,
  })
  creditAmount!: number;

  @column({
    visible: false,
    Cell: (value: any) => <BalanceCell value={Number(value)} />,
  })
  balance!: number;
  categories!: TransactionCategory;

  @column({
    visible: false,
  })
  serial!: string;

  @column({
    Cell: () => <CategoriesDropdown />,
  })
  category?: string;
}
const TransactionTable: NextPage = () => {
  const [columns, setColumns] = useState<Column<object>[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    createColumns();
    async function fetchData() {
      await fetchCategories();
      await fetchTransactions();
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {}, [transactions, categories]);

  const fetchCategories = async () => {
    let result = await axios.get<Category[]>(
      `${process.env.BASE_API_URL}/categories`,
    );
    setCategories(result.data);
    return result.data;
  };

  const fetchTransactions = async () => {
    let response = await axios.get<Transaction[]>(
      `${process.env.BASE_API_URL}/transactions`,
    );
    setTransactions(response.data.slice(0, 5));
    return response.data.slice(0, 5);
  };

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const createColumns = async () => {
    const dummyInstance = new Transaction();
    const dummyProperties = Object.getOwnPropertyNames(dummyInstance);

    let cols: Column<object>[] = dummyProperties.map((columnName) => {
      const columnOptions = getColumnOptions(dummyInstance, columnName);

      //NOTE: this block causes the above to be marked as  red squiggly
      if (
        columnOptions &&
        columnOptions.visible !== undefined &&
        !columnOptions.visible
      ) {
        return undefined;
      }

      //read more about: https://react-table.tanstack.com/docs/api/useTable#column-options
      let cell: Column<object> = {
        Header: columnOptions?.title ?? capitalizeFirstLetter(columnName),
        accessor: columnName,
      };
      //determines the renderer for the cell
      if (columnOptions && columnOptions.Cell) {
        cell.Cell = ({ cell: { value } }) => columnOptions.Cell?.(value);
      }

      return cell;
    });
    //filter out invisible columns :-D
    setColumns(cols.filter((item) => item));
  };

  const render = () => {
    if (loading) {
      //TODO: maybe i can display the headers already and then the table body as loading ???
      return <div>loading ...</div>;
    }

    return <Table columns={columns} data={transactions} />;
  };

  return render();
};

export default TransactionTable;
