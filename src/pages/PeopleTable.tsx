import { Person } from '../types';
import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { findPersonSlugByName } from '../helpers/helpers';
import { PersonLink } from './PersonLink';
// eslint-disable-next-line max-len
import { PersonRelationItem } from '../components/PersonRelationItem/PersonRelationItem';
import { SortTypes } from '../enums/SortTypes';
import { SearchLink } from '../components/SearchLink';
import classNames from 'classnames';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order') || '';

  const getIconClass = (sortParam: string) =>
    classNames('fas', {
      'fa-sort': sortField !== sortParam,
      'fa-sort-up': sortField === sortParam && !sortOrder,
      'fa-sort-down': sortField === sortParam && !!sortOrder,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={{
                    sort: !sortOrder || sortField !== value ? value : null,
                    order: !sortOrder && sortField === value ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i className={getIconClass(value)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => {
          const woman = findPersonSlugByName(person.motherName, peopleList);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  <PersonRelationItem
                    keyValue={person.motherName}
                    peopleList={peopleList}
                    woman={woman}
                  />
                }
              </td>
              <td>
                {
                  <PersonRelationItem
                    keyValue={person.fatherName}
                    peopleList={peopleList}
                  />
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
