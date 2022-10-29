import classNames from 'classnames';
import React from 'react';
import {
  Link, useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable:React.FC<Props> = ({ people }) => {
  const { slugParams } = useParams();
  const isSelected = (slug: string) => slug === slugParams;
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const sexParams = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  let newPeople = [...people];

  const filtersOnSex = () => {
    if (sexParams) {
      newPeople = newPeople.filter(person => person.sex === sexParams);
    }
  };

  const filterOnQuery = () => {
    newPeople = newPeople.filter(
      person => {
        const includesName = person.name.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
        const includesMotherName = person.motherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
        const includesFatherName = person.fatherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());

        return includesName || includesMotherName || includesFatherName;
      },
    );
  };

  const filterOnCentury = () => {
    if (centuries.length > 0) {
      newPeople = newPeople.filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
    }
  };

  const sortByParams = () => {
    switch (sort) {
      case 'name':
        newPeople = newPeople.sort(
          (person1, person2) => person1.name.localeCompare(person2.name),
        );

        return;

      case 'sex':
        newPeople = newPeople.sort(
          (person1, person2) => person1.sex.localeCompare(person2.sex),
        );

        return;

      case 'born':
        newPeople = newPeople.sort(
          (person1, person2) => Number(person1.born) - Number(person2.born),
        );

        return;

      case 'died':
        newPeople = newPeople.sort(
          (person1, person2) => Number(person1.died) - Number(person2.died),
        );

        break;
      default:
    }
  };

  const sortPeople = () => {
    if (sort && order === null) {
      sortByParams();
    }

    if (sort && order === 'desc') {
      sortByParams();
      newPeople = newPeople.reverse();
    }
  };

  sortPeople();

  filterOnCentury();
  filtersOnSex();
  filterOnQuery();

  if (newPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <SearchLink
                params={{
                  sort: sort === 'name' && order === 'desc' ? null : 'name',
                  order: sort === 'name' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'name' && !order },
                      { 'fa-sort-down': sort === 'name' && order === 'desc' },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sort === 'sex' && order === 'desc' ? null : 'sex',
                  order: sort === 'sex' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'sex' && !order },
                      { 'fa-sort-down': sort === 'sex' && order === 'desc' },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sort === 'born' && order === 'desc' ? null : 'born',
                  order: sort === 'born' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'born' && !order },
                      { 'fa-sort-down': sort === 'born' && order === 'desc' },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sort === 'died' && order === 'desc' ? null : 'died',
                  order: sort === 'died' && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'fa fa-sort',
                      { 'fa-sort-up': sort === 'died' && !order },
                      { 'fa-sort-down': sort === 'died' && order === 'desc' },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {newPeople.map(({
          slug,
          name,
          sex,
          motherName,
          mother,
          fatherName,
          father,
          died,
          born,
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames(
              { 'has-background-warning': isSelected(slug) },
            )}
          >
            <td>
              <Link
                className={classNames({ 'has-text-danger': sex === 'f' })}
                to={{
                  pathname: `/people/${slug}`,
                  search: location.search,
                }}
              >
                {name}
              </Link>
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>{mother ? <Link className="has-text-danger" to={`/people/${mother.slug}`}>{motherName}</Link> : motherName || '-'}</td>
            <td>{father ? <Link to={`/people/${father.slug}`}>{fatherName}</Link> : fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
