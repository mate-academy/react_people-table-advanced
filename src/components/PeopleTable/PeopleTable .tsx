import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { SortKey } from '../../types/Sort';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const [filtredPeople, setFiltredPeople] = useState<Person[]>(people);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filterByQuery = (allPeople: Person[]): Person[] => {
    const lowerQuery = query.toLowerCase();

    return allPeople.filter(
      item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.fatherName?.toLowerCase().includes(lowerQuery) ||
        item.motherName?.toLowerCase().includes(lowerQuery),
    );
  };

  const filterBySex = (allPeople: Person[]): Person[] => {
    return allPeople.filter(item => item.sex === sex);
  };

  const filterByCenturies = (allPeople: Person[]): Person[] => {
    return allPeople.filter(item => {
      const century = Math.ceil(item.born / 100).toString();

      return centuries.includes(century);
    });
  };

  const filterPeople = (allPeople: Person[]): Person[] => {
    let filteredPeople = allPeople;

    if (query) {
      filteredPeople = filterByQuery(filteredPeople);
    }

    if (sex) {
      filteredPeople = filterBySex(filteredPeople);
    }

    if (centuries.length > 0) {
      filteredPeople = filterByCenturies(filteredPeople);
    }

    return filteredPeople;
  };

  const sortPeople = (allPeople: Person[]): Person[] => {
    if (!currentSort) {
      return allPeople;
    }

    const key = currentSort as keyof Person;
    const multiplier = currentOrder === 'desc' ? -1 : 1;

    return [...allPeople].sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return (a[key] as string).localeCompare(b[key] as string) * multiplier;
      }

      return ((a[key] as number) - (b[key] as number)) * multiplier;
    });
  };

  useEffect(() => {
    let updatedPeople = filterPeople(people);

    updatedPeople = sortPeople(updatedPeople);

    setFiltredPeople(updatedPeople);
  }, [people, query, sex, centuries, currentSort, currentOrder]);

  const toggleSort = (event: React.MouseEvent, key: SortKey) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (!currentSort) {
      params.set('sort', key);
    } else if (currentSort === key && !currentOrder) {
      params.set('order', 'desc');
    } else if (currentSort === key && currentOrder) {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', key);
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIconClass = (key: SortKey) => {
    return classNames('fas', {
      'fa-sort-up': currentSort === key && currentOrder !== 'desc',
      'fa-sort-down': currentSort === key && currentOrder === 'desc',
      'fa-sort': currentSort !== key,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table
    is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <NavLink to={`#`}>
                <span
                  className="icon"
                  onClick={event => toggleSort(event, SortKey.name)}
                >
                  <i className={getSortIconClass(SortKey.name)} />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink to={`#`}>
                <span
                  className="icon"
                  onClick={event => toggleSort(event, SortKey.sex)}
                >
                  <i className={getSortIconClass(SortKey.sex)} />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink to={`#`}>
                <span
                  className="icon"
                  onClick={event => toggleSort(event, SortKey.born)}
                >
                  <i className={getSortIconClass(SortKey.born)} />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink to={`#`}>
                <span
                  className="icon"
                  onClick={event => toggleSort(event, SortKey.died)}
                >
                  <i className={getSortIconClass(SortKey.died)} />
                </span>
              </NavLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filtredPeople.map(person => {
          return <PeopleLink key={person.slug} {...person} />;
        })}
      </tbody>
    </table>
  );
};
