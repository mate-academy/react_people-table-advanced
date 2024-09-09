/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleRow } from '../PersonRow';
import { useMemo } from 'react';
import { SearchParamsForFilter } from '../../types/SearchParamsForFilter';
import { SortParams } from '../../types/SortParams';
import { Order } from '../../types/Order';
import classNames from 'classnames';
import { Param } from '../../types/Param';

type Props = {
  people: Person[];
};

function filterPeopleBySearchParams(
  peopleList: Person[],
  { queryParam, centuriesParam, peopleSexParam }: SearchParamsForFilter,
) {
  const queryInLowerCase = queryParam.toLowerCase();

  return peopleList.filter(person => {
    const personCentury = Math.ceil(person.born / 100)
      .toString()
      .toString();

    return (
      person.name.toLowerCase().includes(queryInLowerCase) &&
      person.sex.includes(peopleSexParam) &&
      (centuriesParam.length > 0
        ? centuriesParam.includes(personCentury)
        : true)
    );
  });
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const peopleSex = searchParams.get(Param.Sex) || '';
  const centuries = searchParams.getAll(Param.Centuries) || [];
  const query = searchParams.get(Param.Query) || '';
  const sort = searchParams.get(Param.Sort) || '';
  const order = searchParams.get(Param.Order) || Order.Ascending;

  const filteredPeople = useMemo(() => {
    return filterPeopleBySearchParams(people, {
      queryParam: query,
      centuriesParam: centuries,
      peopleSexParam: peopleSex,
    });
  }, [centuries, people, peopleSex, query]);

  const handleSorting = (sortParam: SortParams) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get(Param.Sort);
    const currentOrder = params.get(Param.Order);

    if (currentSort === sortParam) {
      if (currentOrder === Order.Ascending) {
        params.set(Param.Order, Order.Descending);
      } else if (currentOrder === Order.Descending) {
        params.delete(Param.Sort);
        params.delete(Param.Order);
      }
    } else {
      params.set(Param.Sort, sortParam);
      params.set(Param.Order, Order.Ascending);
    }

    return params.toString();
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      const aValue = a[sort as keyof Person] ?? '';
      const bValue = b[sort as keyof Person] ?? '';

      if (aValue < bValue) {
        return order === Order.Ascending
          ? Order.DescendingNum
          : Order.AscendingNum;
      }

      if (aValue > bValue) {
        return order === Order.Ascending
          ? Order.AscendingNum
          : Order.DescendingNum;
      }

      return 0;
    });

    return sorted;
  }, [filteredPeople, sort, order]);

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
              <Link to={{ search: handleSorting(SortParams.ByName) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up':
                        sort === SortParams.ByDied && order === Order.Ascending,
                      'fa-sort-down':
                        sort === SortParams.ByDied &&
                        order === Order.Descending,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting(SortParams.BySex) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up':
                        sort === SortParams.BySex && order === Order.Ascending,
                      'fa-sort-down':
                        sort === SortParams.BySex && order === Order.Descending,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting(SortParams.ByBorn) }}>
                <span className="icon">
                  <i
                    id="born"
                    className={classNames('fas', {
                      'fa-sort-up':
                        sort === SortParams.ByBorn && order === Order.Ascending,
                      'fa-sort-down':
                        sort === SortParams.ByBorn &&
                        order === Order.Descending,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting(SortParams.ByDied) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up':
                        sort === SortParams.ByDied && order === Order.Ascending,
                      'fa-sort-down':
                        sort === SortParams.ByDied &&
                        order === Order.Descending,
                    })}
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
        {sortedPeople.map(person => (
          <PeopleRow
            personToRender={person}
            people={people}
            slug={slug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
