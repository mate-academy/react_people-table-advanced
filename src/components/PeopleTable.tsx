import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useLocation } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
  updateSort: (field: SortField) => void;
};

export const PeopleTable: React.FC<Props> = ({
  updateSort,
  people,
  allPeople,
  selectedSlug,
}) => {
  const location = useLocation();

  const searchParamsObj: Record<string, string | string[] | null> = {};
  const urlParams = new URLSearchParams(location.search);

  urlParams.forEach((value, key) => {
    if (searchParamsObj[key]) {
      if (Array.isArray(searchParamsObj[key])) {
        (searchParamsObj[key] as string[]).push(value);
      } else {
        searchParamsObj[key] = [searchParamsObj[key] as string, value];
      }
    } else {
      searchParamsObj[key] = value;
    }
  });

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
              <a onClick={() => updateSort('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => updateSort('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => updateSort('born')}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => updateSort('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother =
            allPeople.find(p => p.name === person.motherName) || null;
          const father =
            allPeople.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <SearchLink
                  slug={person.slug}
                  params={searchParamsObj}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died || '-'}</td>
              <td>
                {mother ? (
                  <SearchLink
                    slug={mother.slug}
                    params={searchParamsObj}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {mother.name}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <SearchLink
                    slug={father.slug}
                    params={searchParamsObj}
                    className={classNames({
                      '-': father.sex === 'm',
                    })}
                  >
                    {father.name}
                  </SearchLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
