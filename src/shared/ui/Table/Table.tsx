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
  <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm dark:border-white/[0.07]">
    <table className="min-w-full">
      <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/[0.07] dark:bg-[#292c33]">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className={clsx(
                'px-3 py-3.5 text-sm font-semibold',
                'text-gray-900 dark:text-zinc-200',
                'first:pl-6 last:pr-6',
                alignClass[col.align ?? 'left'],
              )}
              style={{ width: col.width ?? 'auto' }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/[0.07] dark:bg-[#24262c]">
        {rows.length ? (
          rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={clsx(
                    'px-3 py-4 text-sm',
                    'text-gray-500 dark:text-zinc-200',
                    'first:pl-6 last:pr-6',
                    alignClass[col.align ?? 'left'],
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
              className="px-3 py-8 text-center font-medium text-gray-500 dark:text-zinc-400"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
