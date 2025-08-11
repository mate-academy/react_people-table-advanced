import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SortParams } from '../types/Enums';
import { SearchLink } from './SearchLink';
import { PersonPage } from './PersonPage';

type Props = {
  people: Person[];
  activeSort: string | null;
  isDesc: string | null;
};

export const PeopleTable = ({ people, activeSort, isDesc }: Props) => {
  const { selectedPersonSlug } = useParams();

  const getSortParam = (sortParam: string) => {
    if (isDesc) {
      return { sort: null, order: null };
    }

    if (sortParam === activeSort) {
      return { sort: sortParam, order: 'desc' };
    }

    return { sort: sortParam, order: null };
  };

  const getIconClass = (sortParam: string) => {
    return classNames('fas', {
      'fa-sort': activeSort !== sortParam,
      'fa-sort-up': activeSort === sortParam && isDesc === null,
      'fa-sort-down': activeSort === sortParam && isDesc,
    });
  };

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
              <SearchLink params={getSortParam(SortParams.Name)}>
                <span className="icon">
                  <i className={getIconClass(SortParams.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParam(SortParams.Sex)}>
                <span className="icon">
                  <i className={getIconClass(SortParams.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParam(SortParams.Born)}>
                <span className="icon">
                  <i className={getIconClass(SortParams.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParam(SortParams.Died)}>
                <span className="icon">
                  <i className={getIconClass(SortParams.Died)} />
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
          <PersonPage
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
