/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLine } from './PersonLine';
import { getSearchWith } from '../utils/getSearchWith';
import { SortParams } from '../types/sortParams';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortParams;
  const order = searchParams.get('order');
  const sortParams = [
    SortParams.Name,
    SortParams.Sex,
    SortParams.Born,
    SortParams.Died,
  ];

  function getSortLink(title: string) {
    if (order) {
      return {
        search: getSearchWith({ sort: null, order: null }, searchParams),
      };
    }

    if (sort === title) {
      return {
        search: getSearchWith({ order: 'desc' }, searchParams),
      };
    }

    return { search: getSearchWith({ sort: title }, searchParams) };
  }

  function getIconClassName(title: SortParams) {
    if (title === sort) {
      return classNames('fas', {
        'fa-sort-up': title === sort && !order,
        'fa-sort-down': order,
      });
    }

    return 'fas fa-sort';
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortParams.map(title => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {title[0].toUpperCase() + title.slice(1)}
                <Link to={getSortLink(title)}>
                  <span className="icon">
                    <i className={getIconClassName(title)} />
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
        {people.map(person => (
          <PersonLine person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
