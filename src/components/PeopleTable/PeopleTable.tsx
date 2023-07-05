import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from 'types';
import { getSearchWith } from 'utils/searchHelper';
import { Sort } from 'enums/Sort';

import { RelativeLink } from './RelativeLink';

type Props = {
  filteredPeople: Person[];
  peopleFromServer: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({
  filteredPeople,
  peopleFromServer,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug: selected } = useParams();
  const sort = searchParams.get('sort') as Sort;
  const order = searchParams.get('order');

  useEffect(() => {
    if (order) {
      setSearchParams(getSearchWith(searchParams, { order: null }));
    }
  }, [sort]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sortValue: string,
  ) => {
    e.preventDefault();

    setSearchParams(
      getSearchWith(searchParams, { sort: sortValue }),
    );

    if (sortValue === sort) {
      const value = order === 'desc' ? null : 'desc';

      setSearchParams(getSearchWith(searchParams, { order: value }));
    } else {
      return;
    }

    if (sort && order) {
      setSearchParams(getSearchWith(searchParams, {
        order: null,
        sort: null,
      }));
    }
  };

  const sortedPeople: Person[] = useMemo(() => (
    [...filteredPeople].sort(
      (personA: Person, personB: Person) => {
        switch (sort) {
          case Sort.Born:
            return order === 'desc'
              ? personB.born - personA.born
              : personA.born - personB.born;

          case Sort.Died:
            return order === 'desc'
              ? personB.died - personA.died
              : personA.died - personB.died;

          case Sort.Name:
            return order === 'desc'
              ? personB.name.localeCompare(personA.name)
              : personA.name.localeCompare(personB.name);

          case Sort.Sex:
            return order === 'desc'
              ? personB.sex.localeCompare(personA.sex)
              : personA.sex.localeCompare(personB.sex);

          default:
            return 0;
        }
      },
    )
  ), [filteredPeople, sort, order]);

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
              <a href="/" onClick={(e) => handleAnchorClick(e, Sort.Name)}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== Sort.Name,
                      'fa-sort-up': sort === Sort.Name && !order,
                      'fa-sort-down': sort === Sort.Name && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="/" onClick={(e) => handleAnchorClick(e, Sort.Sex)}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== Sort.Sex,
                      'fa-sort-up': sort === Sort.Sex && !order,
                      'fa-sort-down': sort === Sort.Sex && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="/" onClick={(e) => handleAnchorClick(e, Sort.Born)}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== Sort.Born,
                      'fa-sort-up': sort === Sort.Born && !order,
                      'fa-sort-down': sort === Sort.Born && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="/"
                onClick={(e) => handleAnchorClick(e, Sort.Died)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== Sort.Died,
                      'fa-sort-up': sort === Sort.Died && !order,
                      'fa-sort-down': sort === Sort.Died && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
          slug,
        }) => (
          <tr
            key={slug}
            data-cy="person"
            className={cn(
              { 'has-background-warning': selected === slug },
            )}
          >
            <RelativeLink
              peopleFromServer={peopleFromServer}
              fullName={name}
              slug={slug}
              sex={sex}
            />
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>

            <RelativeLink
              peopleFromServer={peopleFromServer}
              parentName={motherName}
            />

            <RelativeLink
              peopleFromServer={peopleFromServer}
              parentName={fatherName}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
});
