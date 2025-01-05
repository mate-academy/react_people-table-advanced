import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SORT_BY_FIELDS } from '../constants';
import { SearchLink, Persona } from '../components';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = props => {
  const { people } = props;
  const [searchParams] = useSearchParams();

  const sortered = searchParams.get('sort') || null;
  const ordered = searchParams.get('order') || null;

  const setSorting = (sortBy: string) => {
    switch (true) {
      case !sortered && !ordered:
      case sortered !== sortBy:
        return { sort: sortBy, order: null };
      case sortered === sortBy && !ordered:
        return { sort: sortBy, order: 'desc' };
      case sortered === sortBy && !!ordered:
      default:
        return { sort: null, order: null };
    }
  };

  const setSortIcon = (value: string) => {
    switch (true) {
      case sortered === value && !ordered:
        return 'fa-sort-up';
      case sortered === value && !!ordered:
        return 'fa-sort-down';
      case sortered !== value:
      default:
        return 'fa-sort';
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY_FIELDS.map(value => {
            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={setSorting(value.toLowerCase())}>
                    <span className="icon">
                      <i className={classNames('fas', setSortIcon(value))} />
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
          return <Persona key={person.slug} person={person} people={people} />;
        })}
      </tbody>
    </table>
  );
};
