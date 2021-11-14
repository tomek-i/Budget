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

  const htmlDecode = (input: any): string => {
    var e = document.createElement('div');
    console.log('INPUT:', input);
    // console.log('input.props.data[0].icon:', input.props.data[0].icon);
    console.log('e:', e);
    console.log('e.childNodes:', e.childNodes);
    console.log('e.childNodes[0].nodeValue:', e.childNodes[0]?.nodeValue);
    e.innerHTML = input.props.data[0].icon;
    return e!.innerHTML;
    //return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue!;
  };

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
                      <span
                        dangerouslySetInnerHTML={{
                          __html: htmlDecode(cell.render('Cell')),
                        }}
                      ></span>
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
