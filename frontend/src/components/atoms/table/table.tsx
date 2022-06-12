import { useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react';
import {
  useTable,
  Column,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';
import { Shimmer } from '../Shimmer/shimmer';
import { useDragAndDrop } from '../../../hooks/useDragAndDrop';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../Buttons/IconButton';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import '../../../css/style.scss';
import { PaginationControl } from '../../molecules/PaginationControl';
import { clamp } from '../../../utils/clamp';

interface TableProps {
  headings: Column<object>[];
  content?: object[];
  fullWidth?: boolean;

  canEdit?: boolean; //add edit button
  canDelete?: boolean; //add delete button

  multiseletc?: boolean; //add checkboxes to multi select

  loading?: boolean;

  options?: TableOptions;

  pageToDisplay?: number;
}

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

export const Table: React.FC<TableProps> = ({
  headings,
  content,
  fullWidth,

  canEdit,
  canDelete,
  multiseletc,

  loading,
  pageToDisplay = 1,
  options = {
    ResultDisplay: 'BOTH',
    PaginationControlDisplay: 'BOTH',
  },
}) => {
  const [columns, setColumns] = useState(headings);
  const { onDragEnter, onDragOver, onDragStart, onDrop, dragover } =
    useDragAndDrop(columns);

  useEffect(() => {
    setColumns(headings);
  }, [headings]);

  const data = useMemo(() => content ?? [], []);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: pageToDisplay - 1 } },
    useFilters, // Adding the useFilters Hook to the table
    useSortBy, // This plugin Hook will help to sort our table columns
    usePagination,
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );

  const {
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  console.log({ page, pageCount, pageIndex, pageSize });
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
      <span className="flex items-center col-span-3">
        Showing {(pageIndex + 1) * pageSize - (pageSize - 1)} -{' '}
        {!canNextPage ? data.length : (pageIndex + 1) * pageSize} of{' '}
        {data.length} results
      </span>
    );
  };

  return (
    <>
      <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          {/*------------------------------------*/}
          {(options?.PaginationControlDisplay === 'TOP' ||
            options?.PaginationControlDisplay === 'BOTH') && (
            <div className="border-slate-100 border-b grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              {ResultDisplay()}
              <span className="col-span-2"></span>
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <PaginationControl
                  hasNextPage={canNextPage}
                  hasPreviousPage={canPreviousPage}
                  currentPageNumber={pageIndex + 1}
                  totalPages={pageCount}
                  nextPage={nextPage}
                  gotoPage={gotoPage}
                  previousPage={previousPage}
                />
              </span>
            </div>
          )}
          {/*------------------------------------*/}
          <div className="w-full overflow-x-auto">
            <table {...getTableProps()} className={'w-full'}>
              <thead className="">
                {
                  // Loop over the header rows
                  headerGroups.map(
                    (headerGroup: any, headerGroupIndex: number) => (
                      // Apply the header row props
                      <tr
                        key={headerGroupIndex}
                        {...headerGroup.getHeaderGroupProps()}
                        className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                      >
                        {multiseletc && <th style={{ width: '20px' }}></th>}
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map(
                            (column: any, columnIndex: number) => (
                              // Apply the header cell props
                              <th
                                className="px-4 py-3"
                                id={column.Header}
                                key={columnIndex}
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps(),
                                )}
                                draggable
                                onDragStart={onDragStart}
                                onDragOver={onDragOver}
                                onDrop={(e) => {
                                  setColumns(onDrop(e));
                                }}
                                onDragEnter={onDragEnter}
                                dragover={String(column === dragover)}
                              >
                                {
                                  // Render the header
                                  column.render('Header')
                                }
                                {generateSortingIndicator(column)}
                              </th>
                            ),
                          )
                        }
                        {(canDelete || canEdit) && (
                          <th style={{ width: '20px' }}></th>
                        )}
                      </tr>
                    ),
                  )
                }
              </thead>
              {/* Apply the table body props */}
              <tbody
                className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                {...getTableBodyProps()}
              >
                {loading &&
                  headerGroups.map(
                    (headerGroup: any, headerGroupIndex: number) => (
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
                    ),
                  )}
                {!loading &&
                  // Loop over the table rows
                  page.map((row: any, rowIndex: number) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr
                        key={rowIndex}
                        {...row.getRowProps()}
                        className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                      >
                        {multiseletc && (
                          <td className="px-4 py-3">
                            <Checkbox />{' '}
                          </td>
                        )}
                        {
                          // Loop over the rows cells
                          row.cells.map((cell: any, cellIndex: number) => {
                            // Apply the cell props
                            return (
                              <td
                                className="px-4 py-3"
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
                                icon={
                                  <FontAwesomeIcon
                                    color="#33aaff"
                                    type={'edit'}
                                  />
                                }
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/*------------------------------------*/}
          {(options?.PaginationControlDisplay === 'BOTTOM' ||
            options?.PaginationControlDisplay === 'BOTH') && (
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              {ResultDisplay()}
              <span className="col-span-2"></span>
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <PaginationControl
                  hasNextPage={canNextPage}
                  hasPreviousPage={canPreviousPage}
                  currentPageNumber={pageIndex + 1}
                  totalPages={pageCount}
                  nextPage={nextPage}
                  gotoPage={gotoPage}
                  previousPage={previousPage}
                />
              </span>
            </div>
          )}
          {/*------------------------------------*/}
        </div>
      </div>
    </>
  );
};
