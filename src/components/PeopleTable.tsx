import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  peoples: Person[];
  originalPeoples: Person[];
}

export const PeopleTable = ({ peoples, originalPeoples }: Props) => {
  const { newId } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const filteredPeoples = () => {
    const sortedPeoples = [...peoples];

    sortedPeoples.sort((people1: Person, people2: Person) => {
      let result = 0;

      switch (currentSort) {
        case 'name':
          result = people1.name.localeCompare(people2.name);
          break;
        case 'sex':
          result = people1.sex.localeCompare(people2.sex);
          break;
        case 'born':
          result = people1.born - people2.born;
          break;
        case 'died':
          result = people1.died - people2.died;
          break;
        default:
          result = 1;
      }

      if (currentOrder === 'desc') {
        result *= -1;
      }

      return result;
    });

    return sortedPeoples;
  };

  const filteredAndSortedPeoples = filteredPeoples();

  const getNextSearchParams = (
    searchParamses: URLSearchParams,
    key: string,
  ) => {
    if (currentOrder === 'desc' && currentSort === key) {
      return getSearchWith(searchParamses, { sort: null, order: null });
    }

    if (currentSort === key) {
      return getSearchWith(searchParamses, { sort: key, order: 'desc' });
    }

    return getSearchWith(searchParamses, { sort: key, order: null });
  };

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
              <Link to={{ search: getNextSearchParams(searchParams, 'name') }}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': currentSort !== 'name' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'name' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'name' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getNextSearchParams(searchParams, 'sex') }}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': currentSort !== 'sex' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'sex' && !currentOrder },
                      { 'fa-sort-down': currentSort === 'sex' && currentOrder },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getNextSearchParams(searchParams, 'born') }}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': currentSort !== 'born' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'born' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'born' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getNextSearchParams(searchParams, 'died') }}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': currentSort !== 'died' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'died' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'died' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredAndSortedPeoples.map(people => (
          <tr
            data-cy="person"
            key={people.name}
            className={cn({
              'has-background-warning': people.slug === newId,
            })}
          >
            <td>
              <PersonLink
                slug={people.slug}
                name={people.name}
                isDangerous={people.sex === 'f'}
              />
            </td>
            <td>{people.sex}</td>
            <td>{people.born}</td>
            <td>{people.died}</td>
            <td>
              {people.motherName ? (
                <PersonLink
                  slug={
                    originalPeoples.find(p => p.name === people.motherName)
                      ?.slug || ''
                  }
                  name={people.motherName}
                  isDangerous={true}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {people.fatherName ? (
                <PersonLink
                  slug={
                    originalPeoples.find(p => p.name === people.fatherName)
                      ?.slug || ''
                  }
                  name={people.fatherName}
                  isDangerous={false}
                />
              ) : (
                ''
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
