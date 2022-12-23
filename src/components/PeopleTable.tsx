import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { PersonTable } from './PersonTable';

type Props = {
  people: Person[];
};

export const PeopleTable = React.memo<Props>(({ people }) => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const titlesToSort = ['Name', 'Sex', 'Born', 'Died'];
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      return (
        (centuries.includes(`${Math.ceil(person.born / 100)}`) || centuries.length === 0)
        && (
          person.name.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase()))
        && (person.sex === sex || sex === null)
      );
    });
  }, [people, sex, centuries, query]);

  const filterSort = useMemo(() => {
    if (filteredPeople.length > 1) {
      const sorted = [...filteredPeople].sort((person1, person2) => {
        switch (sort) {
          case 'name':
            return person1.name.toLowerCase()
              .localeCompare(person2.name.toLowerCase());
          case 'sex':
            return person1.sex.toLowerCase()
              .localeCompare(person2.sex.toLowerCase());
          case 'born':
            return person1.born - person2.born;
          case 'died':
            return person1.died - person2.died;

          default:
            return 0;
        }
      });

      return order ? sorted.reverse() : sorted;
    }

    return filteredPeople;
  }, [filteredPeople, sort, order]);

  const setSortParam = (title: string) => {
    const lowerTitle = title.toLowerCase();

    switch (!!title) {
      case (!sort && !order):
      case (sort && !order && sort !== lowerTitle):
        return getSearchWith(searchParams, { sort: lowerTitle });
      case (sort && !order && sort === lowerTitle):
        return getSearchWith(searchParams, { order: 'desc' });

      default:
        return getSearchWith(searchParams, { sort: null, order: null });
    }
  };

  return (
    <>
      {!filteredPeople.length
        ? (<p>There are no people matching the current search criteria</p>)
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {titlesToSort.map(title => (
                  <th key={title}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {title}
                      <Link to={{ search: setSortParam(title) }}>
                        <span className="icon">
                          <i className={classNames(
                            'fas',
                            { 'fa-sort': sort !== title.toLowerCase() },
                            {
                              'fa-sort-up': sort === title.toLowerCase()
                              && !order,
                            },
                            {
                              'fa-sort-down': sort === title.toLowerCase()
                              && order,
                            },
                          )}
                          />
                        </span>
                      </Link>
                    </span>
                  </th>
                ))}
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {filterSort.map(person => (
                <PersonTable
                  person={person}
                  key={person.slug}
                  slug={slug}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
});
