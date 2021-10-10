import React from 'react'
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
  useFilters,
  useRowSelect
} from 'react-table'

import { Button, PageButton } from '../../shared/Button'
import { classNames } from '../../shared/Utils'

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/solid'



export function StatusPill ({ value }: any) {
  const score = value

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        score >= 8 ? 'bg-green-100 text-green-700' : null,
        score <= 7 ? 'bg-yellow-100 text-yellow-700' : null,
        score < 5 ? 'bg-red-100 text-red-700' : null
      )}
    >
      {score}
    </span>
  )
}

function BasicTable ({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  }: any = useTable(
    {
      columns,
      data,
      stateReducer: (newState: any, action: any) => {
        if (action.type === 'toggleRowSelected') {
          newState.selectedRowIds = {
            [action.id]: true
          }
        }

        return newState
      }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  )

  // Render the UI for your table
  return (
    <>
      <div className='flex w-full justify-between'></div>
      <div className='mt-2 flex flex-col'>
        <div className='-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table
                {...getTableProps()}
                className='min-w-full divide-y divide-gray-200'
              >
                <thead className='bg-gray-50'>
                  {headerGroups.map((headerGroup: any) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup}
                    >
                      {headerGroup.headers.map((column: any) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          key={column.column}
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render('Header')}
                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' ▼'
                                : ' ▲'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className='bg-white divide-y divide-gray-200'
                >
                  {page.map((row: any, i: any) => {
                    // new
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} key={row.getKey}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              key={cell.getKey}
                              {...cell.getCellProps()}
                              className='px-6 py-4 whitespace-nowrap'
                            >
                              {cell.render('Cell')}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {/* <pre>
                <code>
                  {JSON.stringify(
                    {
                      selectedRowIds: selectedRowIds,
                      'selectedFlatRows[].original': selectedFlatRows.map(
                        (d: any) => d.original.SCORE
                      )
                    },
                    null,
                    2
                  )}
                </code>
              </pre> */}
            </div>
          </div>
        </div>
      </div>
      <div className='py-3 flex items-center justify-between'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div className='flex gap-x-2'>
            <span className='text-sm text-gray-700'>
              Página <span className='font-medium'>{state.pageIndex + 1}</span>{' '}
              de <span className='font-medium'>{pageOptions.length}</span>
            </span>
            <select
              value={state.pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
              className='inline-flex justify-center w-full min-w-max rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
            >
              {[5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize} className=''>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <PageButton
                className='rounded-l-md'
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className='sr-only'>Primera</span>
                <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className='sr-only'>Anterior</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className='sr-only'>Siguiente</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </PageButton>
              <PageButton
                className='rounded-r-md'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className='sr-only'>Última</span>
                <ChevronDoubleRightIcon
                  className='h-5 w-5'
                  aria-hidden='true'
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicTable
