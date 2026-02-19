import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { Person } from '../types';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const { slug } = useParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const searchString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  const peopleByName = useMemo(() => {
    const map: Record<string, Person[]> = {};

    people.forEach(person => {
      if (!map[person.name]) {
        map[person.name] = [];
      }

      map[person.name].push(person);
    });

    return map;
  }, [people]);

  const renderParent = (parentName: string | null, linkedParent?: Person) => {
    if (!parentName) {
      return '-';
    }

    if (linkedParent) {
      return <PersonLink person={linkedParent} search={searchString} />;
    }

    const matches = peopleByName[parentName] || [];

    if (matches.length === 0) {
      return parentName;
    }

    if (matches.length === 1) {
      return <PersonLink person={matches[0]} search={searchString} />;
    }

    return (
      <div className="is-flex is-flex-direction-column">
        {matches.map((match, index) => (
          <span key={match.slug}>
            <PersonLink person={match} search={searchString} />
            <small className="has-text-grey ml-1">
              ({match.born}–{match.died})
            </small>
            {index < matches.length - 1 && ', '}
          </span>
        ))}
      </div>
    );
  };

  const renderHeader = (field: string, label: string) => {
    const isCurrentSort = sort === field;
    const isDesc = order === 'desc';

    let nextParams: SearchParams = {};

    if (!isCurrentSort) {
      nextParams = { sort: field, order: null };
    } else if (!isDesc) {
      nextParams = { sort: field, order: 'desc' };
    } else {
      nextParams = { sort: null, order: null };
    }

    const nextSearch = getSearchWith(searchParams, nextParams);

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {label}
          <Link
            to={{
              pathname: '/people',
              search: nextSearch ? `?${nextSearch}` : '',
            }}
          >
            <span className="icon">
              <i
                className={classNames('fas', {
                  'fa-sort': !isCurrentSort,
                  'fa-sort-down': isCurrentSort && !isDesc,
                  'fa-sort-up': isCurrentSort && isDesc,
                })}
              />
            </span>
          </Link>
        </span>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderHeader('name', 'Name')}
          {renderHeader('sex', 'Sex')}
          {renderHeader('born', 'Born')}
          {renderHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} search={searchString} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName, person.mother)}</td>
              <td>{renderParent(person.fatherName, person.father)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
