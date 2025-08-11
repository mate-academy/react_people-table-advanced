/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export enum SortKeys {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (sortValue: string) => {
    if (sort === sortValue) {
      if (order) {
        return { sort: null, order: null };
      }

      return { sort, order: 'desc' };
    }

    return { sort: sortValue, order: null };
  };

  const getArrowClass = (sortValue: string) => {
    return classNames(
      'fas',
      {
        'fa-sort': sort !== sortValue,
      },
      { 'fa-sort-up': sort === sortValue && !order },
      {
        'fa-sort-down': sort === sortValue && order === 'desc',
      },
    );
  };

  const nameParams = getSortParams(SortKeys.name);
  const sexParams = getSortParams(SortKeys.sex);
  const bornParams = getSortParams(SortKeys.born);
  const diedParams = getSortParams(SortKeys.died);

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
              <SearchLink params={nameParams}>
                <span className="icon">
                  <i className={(() => getArrowClass(SortKeys.name))()} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sexParams}>
                <span className="icon">
                  <i className={(() => getArrowClass(SortKeys.sex))()} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={bornParams}>
                <span className="icon">
                  <i className={(() => getArrowClass(SortKeys.born))()} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={diedParams}>
                <span className="icon">
                  <i className={(() => getArrowClass(SortKeys.died))()} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
