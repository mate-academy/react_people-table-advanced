import { TableHeader } from './TableHeder';

export const TableHeaders = () => (
  <thead>
    <tr>
      <TableHeader
        name="Name"
        href="#/people?sort=name"
        className="fas fa-sort"
      />
      <TableHeader
        name="Sex"
        href="#/people?sort=sex"
        className="fas fa-sort"
      />
      <TableHeader
        name="Born"
        href="#/people?sort=born&amp;order=desc"
        className="fas fa-sort-up"
      />
      <TableHeader
        name="Died"
        href="#/people?sort=died"
        className="fas fa-sort"
      />

      <th>Mother</th>
      <th>Father</th>
    </tr>
  </thead>

);
