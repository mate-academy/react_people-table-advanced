import { usePeoplePageContext } from '../../../../context/PeoplePageContext';
import { TableHeader } from './TableHeder';

export const TableHeaders = () => {
  const { sortOnClick } = usePeoplePageContext();

  return (
    <thead>
      <tr>
        <TableHeader
          name="Name"
          onClick={() => sortOnClick('name')}
        />
        <TableHeader
          name="Sex"
          onClick={() => sortOnClick('sex')}
        />
        <TableHeader
          name="Born"
          onClick={() => sortOnClick('born')}
        />
        <TableHeader
          name="Died"
          onClick={() => sortOnClick('died')}
        />

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

  );
};
