import { useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { useTable, Column } from 'react-table';
import { Shimmer } from '../Shimmer/shimmer';
import { useDragAndDrop } from '../../../hooks/useDragAndDrop';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../Buttons/IconButton';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

interface TableProps {
  headings: Column<object>[];
  content?: object[];
  fullWidth?: boolean;

  canEdit?: boolean; //add edit button
  canDelete?: boolean; //add delete button

  multiseletc?: boolean; //add checkboxes to multi select

  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  headings,
  content,
  fullWidth,

  canEdit,
  canDelete,
  multiseletc,

  loading,
}) => {
  const [columns, setColumns] = useState(headings);
  const { onDragEnter, onDragOver, onDragStart, onDrop, dragOver } =
    useDragAndDrop(columns);

  useEffect(() => {
    setColumns(headings);
  }, [headings]);

  const data = useMemo(() => content ?? [], []);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()} className={'table-auto w-full'}>
      <thead className="text-xs font-semibold uppercase text-left text-gray-400 bg-gray-50">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup: any, headerGroupIndex: number) => (
            // Apply the header row props
            <tr key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
              {multiseletc && <th style={{ width: '20px' }}></th>}
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column: any, columnIndex: number) => (
                  // Apply the header cell props

                  <th
                    className="p-2 whitespace-nowrap"
                    id={column.Header}
                    key={columnIndex}
                    {...column.getHeaderProps()}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={(e) => {
                      setColumns(onDrop(e));
                    }}
                    onDragEnter={onDragEnter}
                    dragOver={column === dragOver}
                  >
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
              {(canDelete || canEdit) && <th style={{ width: '20px' }}></th>}
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody
        className="text-sm divide-y divide-gray-100"
        {...getTableBodyProps()}
      >
        {loading &&
          headerGroups.map((headerGroup: any, headerGroupIndex: number) => (
            <>
              <tr key={headerGroupIndex}>
                <td
                  className="p-2 whitespace-nowrap"
                  colSpan={
                    headerGroup.headers.length +
                    (multiseletc ? 1 : 0) +
                    (canEdit || canDelete ? 1 : 0)
                  }
                >
                  <Shimmer type="line" width="100%" />
                </td>
              </tr>
              <tr>
                <td
                  className="p-2 whitespace-nowrap"
                  colSpan={
                    headerGroup.headers.length +
                    (multiseletc ? 1 : 0) +
                    (canEdit || canDelete ? 1 : 0)
                  }
                >
                  <Shimmer type="line" width="100%" />
                </td>
              </tr>
              <tr>
                <td
                  className="p-2 whitespace-nowrap"
                  colSpan={
                    headerGroup.headers.length +
                    (multiseletc ? 1 : 0) +
                    (canEdit || canDelete ? 1 : 0)
                  }
                >
                  <Shimmer type="line" width="100%" />
                </td>
              </tr>
            </>
          ))}
        {!loading &&
          // Loop over the table rows
          rows.map((row: any, rowIndex: number) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr key={rowIndex} {...row.getRowProps()}>
                {multiseletc && (
                  <td className="p-2 whitespace-nowrap">
                    <Checkbox />{' '}
                  </td>
                )}
                {
                  // Loop over the rows cells
                  row.cells.map((cell: any, cellIndex: number) => {
                    // Apply the cell props
                    return (
                      <td
                        className="p-2 whitespace-nowrap"
                        key={cellIndex}
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
                {(canDelete || canEdit) && (
                  <td className={'flex flex-row space-x-2'}>
                    {canDelete && (
                      <IconButton
                        className="text-red-400"
                        iconSide={'left'}
                        icon={<FontAwesomeIcon type={'trash'} />}
                      />
                    )}
                    {canEdit && (
                      <IconButton
                        iconSide={'left'}
                        icon={<FontAwesomeIcon color="#33aaff" type={'edit'} />}
                      />
                    )}
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
