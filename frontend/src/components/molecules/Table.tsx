import type { NextPage } from 'next';
import { Column, useTable } from 'react-table';
import React, { useMemo } from 'react';

interface Table {
  columns: Column<object>[];
  data: object[];
}

const Table: NextPage<Table> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, ix) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={ix}>
              {headerGroup.headers.map((column, thi) => (
                <th {...column.getHeaderProps()} key={thi}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, ix) => {
                  return (
                    <td {...cell.getCellProps()} key={ix}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
