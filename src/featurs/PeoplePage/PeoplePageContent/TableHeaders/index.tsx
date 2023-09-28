import { usePeoplePageContext } from '../../../../context/PeoplePageContext';
import { TableHeader } from './TableHeder';

export const TableHeaders = () => {
  const { sortOnClick } = usePeoplePageContext();

  return (
    <thead>
      <tr>
        <TableHeader
          name="Name"
          href="#/people?sort=name"
          className="fas fa-sort"
          onClick={() => sortOnClick('name')}
        />
        <TableHeader
          name="Sex"
          href="#/people?sort=sex"
          className="fas fa-sort"
          onClick={() => sortOnClick('sex')}

        />
        <TableHeader
          name="Born"
          href="#/people?sort=born&amp;order=desc"
          className="fas fa-sort-up"
          onClick={() => sortOnClick('born')}

        />
        <TableHeader
          name="Died"
          href="#/people?sort=died"
          className="fas fa-sort"
          onClick={() => sortOnClick('died')}

        />

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

  );
};
