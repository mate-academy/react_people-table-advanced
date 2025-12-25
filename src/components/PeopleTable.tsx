import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

type ParamsToUpdateSortType = {
  sort: null | string;
  order: null | string;
};

function prepareVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  let visiblePeople = [...people];
  const normalizedQuery = searchParams.get('query')?.trim().toLowerCase();

  if (normalizedQuery) {
    visiblePeople = visiblePeople.filter((person: Person) => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  const sex = searchParams.get('sex');

  if (sex) {
    visiblePeople = visiblePeople.filter(
      (person: Person) => person.sex === sex,
    );
  }

  const centuries = searchParams.getAll('centuries') || [];

  if (centuries.length) {
    visiblePeople = visiblePeople.filter((person: Person) => {
      for (const century of centuries) {
        const y = +century * 100;

        if (person.born > y && person.born <= y + 100) {
          return true;
        }
      }

      return false;
    });
  }

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  if (sort) {
    visiblePeople = visiblePeople.sort((p1, p2) => {
      if (sort === 'name' || sort === 'sex') {
        if (order === 'desc') {
          return p2[sort].localeCompare(p1[sort]);
        } else {
          return p1[sort].localeCompare(p2[sort]);
        }
      }

      if (sort === 'born' || sort === 'died') {
        if (order === 'desc') {
          return p2[sort] - p1[sort];
        } else {
          return p1[sort] - p2[sort];
        }
      }

      return 0;
    });
  }

  return visiblePeople;
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = people.map((person, index, all) => {
    return {
      ...person,
      mother: person.motherName
        ? all.find(p => p.name === person.motherName)
        : undefined,
      father: person.fatherName
        ? all.find(p => p.name === person.fatherName)
        : undefined,
    };
  });

  const visiblePeople = prepareVisiblePeople(preparedPeople, searchParams);

  function getSearchSortWith(fieldName: string) {
    const paramsToUpdate: ParamsToUpdateSortType = { sort: null, order: null };

    if (fieldName !== sort) {
      paramsToUpdate.sort = fieldName;
    } else if (!order) {
      paramsToUpdate.sort = fieldName;
      paramsToUpdate.order = 'desc';
    }

    return getSearchWith(searchParams, paramsToUpdate);
  }

  function getClassNameSortField(fieldName: string) {
    return classNames('fas', {
      'fa-sort': sort !== fieldName,
      'fa-sort-up': sort === fieldName && order !== 'desc',
      'fa-sort-down': sort === fieldName && order === 'desc',
    });
  }

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
              <Link to={{ search: getSearchSortWith('name') }}>
                <span className="icon">
                  <i className={getClassNameSortField('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSearchSortWith('sex') }}>
                <span className="icon">
                  <i className={getClassNameSortField('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSearchSortWith('born') }}>
                <span className="icon">
                  <i className={getClassNameSortField('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSearchSortWith('died') }}>
                <span className="icon">
                  <i className={getClassNameSortField('died')} />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <PersonLink person={person.mother} />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}

            {person.father ? (
              <td>
                <PersonLink person={person.father} />
              </td>
            ) : (
              <td>{person.fatherName ?? '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
