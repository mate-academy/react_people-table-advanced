/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SortType } from '../../types';
import { PersonItem } from '../personItem';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleList = ({ people }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (param: string) => {
    if (param === sort && !order) {
      return { sort: param, order: SortType.DESC };
    }

    if (param === sort && order) {
      return { sort: null, order: null };
    }

    return { sort: param, order: null };
  };

  const getClassLink = (param: string) => classNames(
    'fas',
    { 'fa-sort': param !== sort },
    { 'fa-sort-up': sort && sort === param && !order },
    { 'fa-sort-down': sort && sort === param && order === SortType.DESC },
  );

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {(Object.keys(SortType) as (keyof typeof SortType)[])
              .map((key) => {
                if (key === 'DESC') {
                  return null;
                }

                return (
                  <th key={SortType[key]}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {`${key.charAt(0) + key.slice(1).toLowerCase()}`}
                      <SearchLink
                        params={getSortParams(SortType[key])}
                      >
                        <span className="icon">
                          <i className={getClassLink(SortType[key])} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                );
              })}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => {
            return (
              <PersonItem
                person={person}
                key={person.slug}
              />
            );
          })}

        </tbody>
      </table>
    </>
  );
};
