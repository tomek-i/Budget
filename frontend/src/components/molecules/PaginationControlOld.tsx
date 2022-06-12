import React from 'react';
import PaginationButton from '../atoms/PaginationButtonOld';

interface PaginationOptions {
  pageCount: number;
  rows: any[];
  pageIndex: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  gotoPage: (page: number) => void;
}
//TODO: change into React Component not function
export const PaginationControlOld = (options: PaginationOptions) => {
  return (
    <div
      className={`${
        options.pageCount === 1 && 'hidden'
      } pagination flex flex-row pt-8 ${options.rows.length === 0 && 'hidden'}`}
    >
      <PaginationButton
        type="previous"
        onClick={() => options.previousPage()}
        disabled={!options.canPreviousPage}
      />{' '}
      <div className="flex-grow">
        <div className="flex flex-row mx-auto items-center justify-center space-x-4">
          {[...Array(options.pageCount)].map((e, i) => {
            return (
              <PaginationButton
                key={i + 1}
                type="default"
                number={i + 1}
                current={options.pageIndex === i}
                onClick={() => options.gotoPage(i)}
              />
            );
          })}
        </div>
      </div>
      <PaginationButton
        type="next"
        onClick={() => options.nextPage()}
        disabled={!options.canNextPage}
      />
    </div>
  );
};
