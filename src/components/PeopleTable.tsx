/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Human } from './Human';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface PeopleTableProps {
  people: Person[];
}

const SORT_FIELDS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (sortBy: string): SearchParams => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!order) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortIconClass = (sortBy: string): string => {
    return classNames('fas', {
      'fa-sort': sort !== sortBy,
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
    });
  };

  const personCenturies = (person: Person): string[] => {
    return [
      Math.ceil(person.born / 100).toString(),
      Math.ceil(person.died / 100).toString(),
    ];
  };

  const filterHelper = (): Person[] => {
    return people
      .filter((person) => (sex && person.sex === sex) || !sex)
      .filter((person) => (query && person.name.includes(query)) || !query)
      .filter(
        (person) => {
          return centuries.includes(personCenturies(person)[0])
          || centuries.includes(personCenturies(person)[1])
          || centuries.length === 0;
        },
      );
  };

  console.log(sort);

  const sortHelper = (peoples: Person[]): Person[] => {
    if (!sort) {
      return [...peoples];
    }

    const sorted = [...peoples];

    sorted.sort((a, b) => {
      switch (sort) {
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  };

  const preparedPeople = sortHelper(filterHelper());

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_FIELDS.map(sortField => (
            <th key={sortField}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortField}
                <SearchLink
                  params={sortParams(sortField.toLowerCase())}
                >
                  <span className="icon">
                    <i className={sortIconClass(sortField.toLowerCase())} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning active': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                <Human person={person} />
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.mother && <Human person={person.mother} />}
                </Link>
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.father && <Human person={person.father} />}
                </Link>
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
