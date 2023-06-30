import classNames from 'classnames';
import { Person } from '../types';
import { PersonCard } from './PersonCard';
import { SearchLink } from './SearchLink';

type Props = {
  peopleList: Person[],
  selectedSlug: string | undefined,
  sort: string | null,
  order: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  peopleList,
  selectedSlug,
  sort,
  order,
}) => {
  const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

  const checkSortParam = (sortValue: string | null, sortTypeValue: string) => {
    if (sortValue === sortTypeValue.toLocaleLowerCase() && order) {
      return null;
    }

    return sortTypeValue.toLocaleLowerCase();
  };

  const checkOrderParam = (sortValue: string | null, sortTypeValue: string) => {
    if (sortValue === sortTypeValue.toLocaleLowerCase() && !order) {
      return 'desc';
    }

    return null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTypes.map(type => (
            <th key={type}>
              <span className="is-flex is-flex-wrap-nowrap">
                {type}
                <SearchLink
                  params={{
                    sort: (checkSortParam(sort, type)),
                    order: (checkOrderParam(sort, type)),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas fa-sort', {
                        'fa-sort-up': (sort === type.toLocaleLowerCase()
                          && !order),
                        'fa-sort-down': (sort === type.toLocaleLowerCase()
                          && order),
                      })}
                    />
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
        {peopleList.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning':
                selectedSlug === person.slug,
            })}
          >
            <PersonCard
              person={person}
              peopleList={peopleList}
            />
          </tr>
        ))}

      </tbody>
    </table>
  );
};
