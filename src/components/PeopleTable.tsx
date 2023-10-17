import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePeopleContext } from '../providers/AppProvider';
import { PersonLink } from './PersonLink';
import { getPeopleFiltered } from '../utils/Filters';
import { Sort } from './Sort';

export const PeopleTable = () => {
  const { people } = usePeopleContext();
  const [searchParams] = useSearchParams();

  const filter = useMemo(() => {
    return getPeopleFiltered(
      people,
      searchParams.get('sex'),
      searchParams.get('query'),
      searchParams.getAll('centuries'),
      searchParams.get('sortBy'),
      searchParams.get('sortOrder'),
    );
  }, [
    searchParams.get('sex'),
    searchParams.get('query'),
    searchParams.get('centuries'),
    searchParams.get('sortBy'),
    searchParams.get('sortOrder'),
  ]);

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
              <Sort sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Sort sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Sort sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Sort sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filter.map(person => (
          <PersonLink
            key={person.slug}
            personLink={person}
            people={people}
          />
        ))}

      </tbody>
    </table>
  );
};
