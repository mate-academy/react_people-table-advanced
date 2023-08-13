import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { SORT_PARAMS } from '../utils/constants';
import { PersonLink } from './PersonRow';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getCentury = (year: number) => {
    return Math.ceil(year / 100).toString();
  };

  const filteredListOfPeope: Person[] = useMemo(
    () => (() => {
      let filteredPeople = [...people];

      if (sex !== '') {
        filteredPeople = filteredPeople.filter((pr) => pr.sex === sex);
      }

      if (query) {
        const normQuery = query.trim().toLowerCase();

        filteredPeople = filteredPeople.filter(
          (pr) => pr.name.toLowerCase().includes(normQuery)
            || pr.motherName?.toLowerCase().includes(normQuery)
            || pr.fatherName?.toLowerCase().includes(normQuery),
        );
      }

      if (centuries.length > 0) {
        filteredPeople = filteredPeople.filter(
          (pr) => centuries.includes(getCentury(pr.born)),
        );
      }

      if (sort) {
        filteredPeople = filteredPeople.sort((a, b) => {
          switch (sort) {
            case 'Name':
              return a.name.localeCompare(b.name);
            case 'Sex':
              return a.sex.localeCompare(b.sex);
            case 'Born':
              return a.born - b.born;
            case 'Died':
              return a.died - b.died;
            default:
              return 0;
          }
        });
      }

      if (order === 'desc') {
        filteredPeople = filteredPeople.reverse();
      }

      return filteredPeople;
    })(),
    [people, sex, query, centuries, sort, order],
  );

  const tableIsShown = filteredListOfPeope.length > 0;

  const setOrder = (value: string) => {
    if (sort === value) {
      return order ? '' : 'desc';
    }

    return '';
  };

  const setSort = (value: string) => {
    if (sort === value && order === 'desc') {
      return '';
    }

    return value;
  };

  return (
    <>
      {tableIsShown ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {SORT_PARAMS.map((param) => (
                <th key={param}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {param}
                    <SearchLink
                      params={{
                        sort: setSort(param) || null,
                        order: setOrder(param) || null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort-down': sort === param && order === 'desc',
                            'fa-sort-up': sort === param && order !== 'desc',
                            'fa-sort': sort !== param,
                          })}
                        />
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
            {filteredListOfPeope.map((person: Person) => (
              <PersonLink person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
