import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Column } from 'react-table';
import { useGetBasiqUserTransactionsMutation } from '../../../app/features/api/bankApi';
import { useAppSelector } from '../../../app/hooks';

import '../../../css/style.scss';

import { Table } from '../../atoms/Table';
import { useLocation } from 'react-router';

export type TransactionPageProps = {};

export const TransactionPage: React.FC<TransactionPageProps> = ({}) => {
  const user = useAppSelector((state) => state.user);
  const [
    getTransactions,
    { isError, isLoading, isSuccess, status, data, error },
  ] = useGetBasiqUserTransactionsMutation();
  const [columns, setColumns] = useState<Column<object>[]>();
  const [columnData, setColumnData] = useState<object[]>();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');

  useEffect(() => {
    console.log('init', user);
    if (user && user.basiqId) {
      getTransactions(user.basiqId);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      let keys: string[] = Object.keys(data.data[0]);

      keys = keys.filter((e) => e !== 'links');
      keys = keys.filter((e) => e !== 'enrich');
      keys = keys.filter((e) => e !== 'subClass');
      const cols = keys.map((key) => {
        return { Header: key, accessor: key };
      });
      setColumns(cols);

      setColumnData(
        data.data.map(({ links, enrich, subClass, ...keepAttrs }) => keepAttrs),
      );
    }
  }, [data]);

  if (isError) {
    console.log({ isError, error, status });
    return <div>ERROR</div>;
  }
  if (isLoading) {
    console.log({ isLoading, status, data });
    return (
      <div className="flex align-middle justify-center h-full w-5/6 content-center fixed items-center">
        LOADING
      </div>
    );
  }

  if (columns && columnData) {
    return (
      <Table
        headings={columns}
        content={columnData}
        pageToDisplay={Number(page ?? 1)}
      />
    );
  }

  return <></>;
};
