import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  ORDER_PARAM, SORT_PARAM, Person, SortFields, OrderType,
} from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

type Column = {
  slug: string,
  title: string,
  sort?: SortFields,
};

const columns: Column[] = [
  {
    slug: 'name',
    title: 'Name',
    sort: SortFields.NAME,
  },
  {
    slug: 'sex',
    title: 'Sex',
    sort: SortFields.SEX,
  },
  {
    slug: 'born',
    title: 'Born',
    sort: SortFields.BORN,
  },
  {
    slug: 'died',
    title: 'Died',
    sort: SortFields.DIED,
  },
  {
    slug: 'mother',
    title: 'Mother',
  },
  {
    slug: 'father',
    title: 'Father',
  },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SORT_PARAM);
  const order = searchParams.get(ORDER_PARAM);
  const hasOrderDesc = order === OrderType.DESC;

  const getParamsWithSort = (sortValue: SortFields) => {
    const params = new URLSearchParams(searchParams);

    if (params.get(SORT_PARAM) === sortValue) {
      if (params.get(ORDER_PARAM) === OrderType.DESC) {
        params.delete(SORT_PARAM);
        params.delete(ORDER_PARAM);
      } else {
        params.set(ORDER_PARAM, OrderType.DESC);
      }
    } else {
      params.set(SORT_PARAM, sortValue);
      params.delete(ORDER_PARAM);
    }

    return params.toString();
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.slug}>
              {col.sort ? (
                <span className="is-flex is-flex-wrap-nowrap">
                  {col.title}
                  <Link
                    to={{
                      search: getParamsWithSort(col.sort),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== col.sort,
                          'fa-sort-up': sort === col.sort && !order,
                          'fa-sort-down': sort === col.sort && hasOrderDesc,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              ) : col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName || '-'}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
