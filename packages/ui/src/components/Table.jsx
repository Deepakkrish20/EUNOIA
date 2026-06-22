import React from 'react';

/**
 * Premium Grid Table component.
 */
export function Table({ 
  headers = [], 
  rows = [], 
  className = '' 
}) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border bg-card/60 shadow-xl ${className}`}>
      <table className="w-full text-sm text-left text-foreground border-collapse">
        <thead className="bg-popover text-xs font-semibold uppercase tracking-wider text-muted border-b border-border/80">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4.5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center text-muted">
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-secondary/5 transition-colors duration-200"
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4.5 text-secondary">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
