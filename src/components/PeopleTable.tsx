import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PeopleSortParams, Person, SortValues } from '../types';
import { getCurrentPerson, getPersonPath, getSearchWith } from '../utils';
import cn from 'classnames';

interface Props {
  people: Person[];
  peopleMap: Map<string, Person>;
}

export const PeopleTable: React.FC<Props> = ({ people, peopleMap }) => {
  const { person } = useParams();
  const currentPerson = person ? getCurrentPerson(person) : null;

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(PeopleSortParams.Sort) || '';
  const order = searchParams.get(PeopleSortParams.Order) || '';

  const getSortParams = (sortParam: SortValues) => {
    switch (true) {
      case sortParam === sort && !order:
        return getSearchWith(searchParams, { order: 'desc' });
      case sortParam === sort && !!order:
        return getSearchWith(searchParams, { order: null, sort: null });
      case sortParam !== sort && !!order:
        return getSearchWith(searchParams, { order: null, sort: sortParam });
      default:
        return getSearchWith(searchParams, { sort: sortParam });
    }
  };

  const getStylesSortParams = (sortParam: SortValues) =>
    cn('fas', {
      'fa-sort': sortParam !== sort,
      'fa-sort-up': sortParam === sort && !order,
      'fa-sort-down': sortParam === sort && order,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortValues).map(([key, value]) => {
            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <Link to={{ search: getSortParams(value) }}>
                    <span className="icon">
                      <i className={getStylesSortParams(value)} />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(({ name, born, sex, motherName, fatherName, died }) => {
          const mother = peopleMap.get(motherName || '');
          const father = peopleMap.get(fatherName || '');

          const isActive = currentPerson
            ? name.toLowerCase() === currentPerson.name &&
              born === currentPerson.born
            : false;

          return (
            <tr
              key={name + born}
              data-cy="person"
              className={cn({
                'has-background-warning': isActive,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${getPersonPath(name, born)}`,
                    search: searchParams.toString(),
                  }}
                  className={cn({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <Link
                    className="has-text-danger"
                    to={{
                      pathname: `/people/${getPersonPath(mother.name, mother.born)}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${getPersonPath(father.name, father.born)}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {father.name}
                  </Link>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
