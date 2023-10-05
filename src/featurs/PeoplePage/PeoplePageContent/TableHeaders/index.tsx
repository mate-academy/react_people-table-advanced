import { TableHeader } from './TableHeder';

export const TableHeaders = () => (
  <thead>
    <tr>
      <TableHeader
        name="Name"
      />
      <TableHeader
        name="Sex"
      />
      <TableHeader
        name="Born"
      />
      <TableHeader
        name="Died"
      />

      <th>Mother</th>
      <th>Father</th>
    </tr>
  </thead>

);
