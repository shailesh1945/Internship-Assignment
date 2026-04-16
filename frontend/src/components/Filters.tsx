export default function Filters({ filters, setFilters }: any) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        placeholder="Name"
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
      />
      <input
        placeholder="Address"
        onChange={(e) => setFilters({ ...filters, address: e.target.value })}
      />
    </div>
  );
}