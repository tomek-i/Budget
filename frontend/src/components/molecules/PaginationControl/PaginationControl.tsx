import React, { useEffect } from 'react';
import '../../../css/style.scss';
import { clamp } from '../../../utils/clamp';

export type PaginationControlProps = {
  currentPageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  previousPage: () => void;
  nextPage: () => void;
  gotoPage: (page: number) => void;
};

export const PaginationControl: React.FC<PaginationControlProps> = ({
  hasPreviousPage,
  hasNextPage,
  currentPageNumber,
  totalPages,
  previousPage,
  nextPage,
  gotoPage,
}) => {
  return (
    <nav aria-label="Table navigation">
      <ul className="inline-flex items-center">
        {/* TODO: maybe leave it disabled instead? */}
        {hasPreviousPage && (
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                previousPage?.();
              }}
              className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
              aria-label="Previous"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        )}

        {currentPageNumber > 3 && (
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                //offset for index
                gotoPage(0);
              }}
              className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            >
              {1}
            </button>
          </li>
        )}
        {currentPageNumber > 4 && (
          <li>
            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
              ...
            </button>
          </li>
        )}
        {[
          ...new Set(
            [-2, -1, 0, 1, 2].map((offset) =>
              clamp(currentPageNumber + offset, 1, totalPages),
            ),
          ),
        ].map((pageNumber, i) => {
          return (
            <li key={i}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //offset for index
                  gotoPage(pageNumber - 1);
                }}
                className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                  currentPageNumber === pageNumber
                    ? 'text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100'
                    : ''
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {currentPageNumber < totalPages - 3 && (
          <li>
            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
              ...
            </button>
          </li>
        )}
        {currentPageNumber < totalPages - 2 && (
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                //offset for index
                gotoPage(totalPages - 1);
              }}
              className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            >
              {totalPages}
            </button>
          </li>
        )}

        {/* TODO: maybe leave it disabled instead? */}
        {hasNextPage && (
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextPage?.();
              }}
              className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
              aria-label="Next"
            >
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
