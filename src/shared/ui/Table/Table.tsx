import type { ReactNode } from 'react';
import clsx from 'clsx';

export type TableColumn<T> = {
  key: keyof T | 'actions';
  header: string;
  render?: (row: T) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
};

type TableProps<T extends { id: number | string }> = {
  columns: TableColumn<T>[];
  rows: T[];
};

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Table = <T extends { id: number | string }>({
  columns,
  rows,
}: TableProps<T>) => (
  <table className="relative min-w-full overflow-hidden rounded-md bg-white shadow-sm outline outline-gray-200">
    <thead className="border-b border-gray-200">
      <tr>
        {columns.map((col) => (
          <th
            key={String(col.key)}
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 first:pl-6 last:pr-6"
            style={{ width: col.width ?? 'auto' }}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 bg-white">
      {rows.length ? (
        rows.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className={clsx(
                  'px-3 py-4 text-sm whitespace-nowrap text-gray-500',
                  alignClass[col.align ?? 'left'],
                  'first:pl-6 last:pr-6',
                )}
              >
                {col.render
                  ? col.render(row)
                  : col.key === 'actions'
                    ? null
                    : (row[col.key] as ReactNode)}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length}
            className="px-3 py-4 text-center font-medium whitespace-normal text-gray-500"
          >
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
