export default function SortableTable({ columns, data, onSort }: any) {
  return (
    <table border={1}>
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key} onClick={() => onSort(col.key)}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            {columns.map((col: any) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}