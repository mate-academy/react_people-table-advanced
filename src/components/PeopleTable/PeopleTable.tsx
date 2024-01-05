import { FC } from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getLink, getSearchQuery } from './PeopleTable.helpers';
import { tableHeaders } from './PeopleTable.constants';
import { SearchParams } from '../../constants/searchParams';

type Props = {
  people: Person[]
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(SearchParams.Sort);
  const order = searchParams.get(SearchParams.Order);

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
                    <Link to={{
                      search: getSearchQuery({
                        currentSort: sort, order, searchParams, sortBy: key,
                      }),
                    }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', {
                          'fa-sort': sort !== key,
                          'fa-sort-up': sort === key && !order,
                          'fa-sort-down': sort === key && order,
                        })}
                        />
                      </span>
                    </Link>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const {
            born, died, sex, father, mother, fatherName, motherName,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td aria-label="Name">
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getLink(mother, motherName)}</td>
              <td>{getLink(father, fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
