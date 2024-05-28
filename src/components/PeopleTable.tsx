import React, { useContext } from 'react';
import { StateContex } from '../context/reducer';
import { Person } from '../types';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { filterPeople } from '../utils/filterPeople';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(StateContex);

  const [searchParams, setSearchParams] = useSearchParams();

  const checkPerents = (perent: Person, sex: Sex) => {
    switch (sex) {
      case Sex.m:
        return people.find(person => person.name === perent.fatherName)!;

      case Sex.f:
        return people.find(person => person.name === perent.motherName)!;

      default:
        return perent;
    }
  };

  const handleClickFilter = (sortParam: string) => {
    if (searchParams.get('order')) {
      if (searchParams.get('sort') === sortParam) {
        return setSearchParams(
          getSearchWith(searchParams, { sort: null, order: null }),
        );
      }

      return setSearchParams(
        getSearchWith(searchParams, { sort: sortParam, order: null }),
      );
    }

    if (searchParams.get('sort') === sortParam) {
      return setSearchParams(
        getSearchWith(searchParams, { sort: sortParam, order: 'desc' }),
      );
    }

    return setSearchParams(getSearchWith(searchParams, { sort: sortParam }));
  };

  const sortPeople = filterPeople(searchParams, people);

  const filterCenturies = sortPeople.filter(p => {
    if (searchParams.get('centuries')) {
      for (const cent of searchParams.getAll('centuries')) {
        if (p.born >= (+cent - 1) * 100 && p.born <= (+cent - 1) * 100 + 99) {
          return p;
        }
      }
    }

    return;
  });

  const renderPeople = searchParams.get('centuries')
    ? filterCenturies
    : sortPeople;

  if (renderPeople.length) {
    return (
      <div className="block">
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <a onClick={() => handleClickFilter('name')}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up':
                              searchParams.get('sort') === 'name' &&
                              !searchParams.get('order'),
                            'fa-sort-down':
                              searchParams.get('order') === 'desc',
                            'fa-sort': searchParams.get('sort') !== 'name',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <a onClick={() => handleClickFilter('sex')}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up':
                              searchParams.get('sort') === 'sex' &&
                              !searchParams.get('order'),
                            'fa-sort-down':
                              searchParams.get('sort') === 'sex' &&
                              searchParams.get('order') === 'desc',
                            'fa-sort': searchParams.get('sort') !== 'sex',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <a onClick={() => handleClickFilter('born')}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up':
                              searchParams.get('sort') === 'born' &&
                              !searchParams.get('order'),
                            'fa-sort-down':
                              searchParams.get('sort') === 'born' &&
                              searchParams.get('order') === 'desc',
                            'fa-sort': searchParams.get('sort') !== 'born',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <a onClick={() => handleClickFilter('died')}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up':
                              searchParams.get('sort') === 'died' &&
                              !searchParams.get('order'),
                            'fa-sort-down':
                              searchParams.get('sort') === 'died' &&
                              searchParams.get('order') === 'desc',
                            'fa-sort': searchParams.get('sort') !== 'died',
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
              {renderPeople.map((p: Person, index) => (
                <tr
                  key={index}
                  data-cy="person"
                  className={cn({
                    'has-background-warning':
                      p.slug === searchParams.get('slug'),
                  })}
                >
                  <td>
                    <SearchLink
                      params={{ slug: p.slug }}
                      className={cn({ 'has-text-danger': p.sex === 'f' })}
                    >
                      {p.name}
                    </SearchLink>
                  </td>

                  <td>{p.sex}</td>
                  <td>{p.born}</td>
                  <td>{p.died}</td>

                  <td>
                    {checkPerents(p, Sex.f) ? (
                      <SearchLink
                        params={{ slug: checkPerents(p, Sex.f).slug }}
                        className="has-text-danger"
                      >
                        {p.motherName}
                      </SearchLink>
                    ) : (
                      <p>{p.motherName || '-'}</p>
                    )}
                  </td>

                  <td>
                    {checkPerents(p, Sex.m) ? (
                      <SearchLink
                        params={{ slug: checkPerents(p, Sex.m).slug }}
                      >
                        {p.fatherName}
                      </SearchLink>
                    ) : (
                      <p>{p.fatherName || '-'}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria
    </p>
  );
};
