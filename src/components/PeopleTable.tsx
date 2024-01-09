import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { tableHeaders } from '../constants/SortingOption';
import { People } from './People/People';
import { preparePeople } from '../utils/peopleHelper';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const handleSetParams = (sortingOption: string) => {
    if (sort && sort !== sortingOption) {
      return {
        sort: sortingOption,
        order: null,
      };
    }

    if (!sort) {
      return {
        sort: sortingOption,
        order: null,
      };
    }

    if (sort && !order) {
      return {
        sort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const handleSetIcon = (sortingOption: string) => {
    return cn('fas',
      {
        'fa-sort': sort !== sortingOption,
        'fa-sort-down': sort === sortingOption && order === 'desc',
        'fa-sort-up': sort === sortingOption && !order,
      });
  };

  const filteredPeople = useMemo(() => {
    if (!people) {
      return null;
    }

    const tempPeople = [...people];

    const centuries = searchParams.getAll('centuries') || [];
    const centuriesAsNumbers = centuries.map(century => parseInt(century, 10));

    return preparePeople(
      tempPeople, sort, order, sex, query, centuriesAsNumbers,
    );
  }, [sort, order, people, sex, query, searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(tableHeaders).map(({ key, title, withSort }) => {
            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  {withSort && (
                    <SearchLink params={handleSetParams(key)}>
                      <span className="icon">
                        <i className={handleSetIcon(key)} />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      {filteredPeople && <People people={filteredPeople} />}

    </table>
  );
};
