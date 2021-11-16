import type { NextPage } from 'next';
import {
  Column,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/components/molecules/Table.module.css';
import Button from '../atoms/Button';
import { PaginationControl } from './PaginationControl';

interface TableSortOptions {
  id: string;
  desc: boolean;
}
interface TableStateOptions {
  hiddenColumns?: string[];
  pageSize?: number;
  sortBy?: TableSortOptions[];
}
interface TableOptions {
  state: TableStateOptions;
  ResultDisplay: 'NONE' | 'TOP' | 'BOTTOM' | 'BOTH';
  PaginationControlDisplay: 'NONE' | 'TOP' | 'BOTTOM' | 'BOTH';
}
interface Table {
  id?: string;
  columns: Column<object>[];
  data: object[];
  loading?: boolean;
  pageCount?: number;
  clearFilters?: Function;
  options?: TableOptions;
}

const Table: NextPage<Table> = ({
  id,
  columns,
  data,
  loading,
  pageCount: controlledPageCount,
  clearFilters,
  options = {
    ResultDisplay: 'BOTH',
    PaginationControlDisplay: 'BOTH',
  },
}) => {
  const [tableData, setTableData] = useState(data);
  const tableColumns = React.useMemo(() => columns, [columns]);

  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: options?.state,
    },
    useFilters, // Adding the useFilters Hook to the table
    useSortBy, // This plugin Hook will help to sort our table columns
    usePagination,
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );

  const generateSortingIndicator = (column: any) => {
    return (
      <span>
        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
      </span>
    );
  };

  //TODO: change into react component and add as atoms?
  const ResultDisplay = () => {
    return (
      <div>
        Displaying {(pageIndex + 1) * pageSize - (pageSize - 1)} -{' '}
        {!canNextPage ? data.length : (pageIndex + 1) * pageSize} of{' '}
        {data.length} results
      </div>
    );
  };

  // Render the UI for your table
  return (
    <>
      {(options?.PaginationControlDisplay === 'TOP' ||
        options?.PaginationControlDisplay === 'BOTH') &&
        PaginationControl({
          canNextPage,
          canPreviousPage,
          gotoPage,
          nextPage,
          pageCount,
          pageIndex,
          previousPage,
          rows,
        })}

      {(options?.ResultDisplay === 'TOP' ||
        options?.ResultDisplay === 'BOTH') &&
        ResultDisplay()}

      <table {...getTableProps()} className={styles.table} id={id}>
        <thead>
          {headerGroups.map((headerGroup, ix) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={ix}>
              {headerGroup.headers.map((column, thi) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={thi}
                >
                  {column.render('Header')}

                  {generateSortingIndicator(column)}
                  {/* <Filter column={column} /> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 && (
            <td className="w-full" colSpan={headerGroups[0]?.headers.length}>
              <span className="text-center my-4">Sorry no results found</span>
              <div className="text-center">
                <Button onClick={clearFilters} text={'CLEAR SEARCH'} />
              </div>
            </td>
          )}
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-default' : 'bg-alternate'}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {(options?.ResultDisplay === 'BOTTOM' ||
        options?.ResultDisplay === 'BOTH') &&
        ResultDisplay()}
      {(options?.PaginationControlDisplay === 'TOP' ||
        options?.PaginationControlDisplay === 'BOTH') &&
        PaginationControl({
          canNextPage,
          canPreviousPage,
          gotoPage,
          nextPage,
          pageCount,
          pageIndex,
          previousPage,
          rows,
        })}
    </>
  );
};

export default Table;
