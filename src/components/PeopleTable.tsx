import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';
import { Person } from '../types';
import { PersonLink } from './PeopleLink';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/sortType';

type Props = {
  people : Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slugPerson } = useParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const currentSortDirection = (sortMethod: string) => {
    if (sortMethod !== sort) {
      return null;
    }

    if (sortMethod === sort && order !== 'desc') {
      return 'desc';
    }

    return null;
  };

  const parentLinks = useCallback((
    parentName: string | null,
    parentInfo: Person | null,
  ) => {
    if (!parentName && !parentInfo) {
      return '-';
    }

    if (parentInfo) {
      return <PersonLink person={parentInfo} />;
    }

    return parentName;
  }, []);

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
              <SearchLink params={{
                sort: SortType.name && order ? null : SortType.name,
                order: currentSortDirection(SortType.name),
              }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.name,
                    'fa-sort-up': sort === SortType.name && !order,
                    'fa-sort-down': sort === SortType.name && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{
                sort: SortType.sex && order ? null : SortType.sex,
                order: currentSortDirection(SortType.sex),
              }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.sex,
                    'fa-sort-up': sort === SortType.sex && !order,
                    'fa-sort-down': sort === SortType.sex && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{
                sort: SortType.born && order ? null : SortType.born,
                order: currentSortDirection(SortType.born),
              }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.born,
                    'fa-sort-up': sort === SortType.born && !order,
                    'fa-sort-down': sort === SortType.born && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{
                sort: SortType.died && order ? null : SortType.died,
                order: currentSortDirection(SortType.died),
              }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortType.died,
                    'fa-sort-up': sort === SortType.died && !order,
                    'fa-sort-down': sort === SortType.died && order,
                  })}
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
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slugPerson === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {parentLinks(person.motherName, person.mother) }
              </td>
              <td>
                {parentLinks(person.fatherName, person.father) }
              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
