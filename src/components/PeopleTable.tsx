/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortFields } from '../types/SortField';
import { filterPeople, sortPeople } from '../utils/people';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') as SortFields;
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries').map(Number) || [];
  const sex = searchParams.get('sex') || '';

  const filterSettings = {
    query,
    sex,
    centuries,
  };

  const handleSortChange = (sortValue: SortFields) => {
    if (sortBy === sortValue && order) {
      return { sort: null, order: null };
    }

    if (sortBy === sortValue) {
      return { sort: sortValue, order: 'desc' };
    }

    return { sort: sortValue, order: null };
  };

  const applyArrowStyles = (arrowValue: string) => {
    if (arrowValue === sortBy) {
      return cn('fas', {
        'fa-sort-up': !!sortBy && !order,
        'fa-sort-down': !!order,
      });
    }

    return cn('fas fa-sort');
  };

  const filteredPeople = sortBy
    ? filterPeople(sortPeople(people, sortBy, order), filterSettings)
    : filterPeople(people, filterSettings);

  return filteredPeople.length ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={handleSortChange(SortFields.Name)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortChange(SortFields.Sex)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortChange(SortFields.Born)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortChange(SortFields.Died)}>
                <span className="icon">
                  <i className={applyArrowStyles(SortFields.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink person={person} key={person.name} people={people} />
        ))}
      </tbody>
    </table>
  ) : (
    <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria
    </p>
  );
};
