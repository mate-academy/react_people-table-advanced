import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Persona } from '../Persona/Persona';
import { TableHeadLink } from '../TableHeadLink';

type Props = {
  filteredPeopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeopleList,
}) => {
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || '';
  const sortReverse = searchParams.get('order') || '';
  const [
    visiblePeopleList,
    setVisiblePeopleList,
  ] = useState<Person[]>(filteredPeopleList);

  const tableHeadFilter = async () => {
    let filteredPeople: Person[] = [...filteredPeopleList].sort((
      personA: Person,
      personB: Person,
    ) => {
      switch (sortColumn) {
        case 'name':
        case 'sex':
          return personA[sortColumn].localeCompare(personB[sortColumn]);

        case 'born':
        case 'died':
          return personA[sortColumn] - personB[sortColumn];

        default:
          return 0;
      }
    });

    if (sortReverse === 'desc') {
      filteredPeople = filteredPeople.reverse();
    }

    setVisiblePeopleList(filteredPeople);
  };

  useEffect(() => {
    tableHeadFilter();
  }, [filteredPeopleList, searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <TableHeadLink title="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <TableHeadLink title="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <TableHeadLink title="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <TableHeadLink title="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeopleList.map(person => (
          <Persona
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
