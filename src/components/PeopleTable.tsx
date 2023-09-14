import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { ColumnsNames } from '../types/ColumnsNames';
import { SearchParams } from '../types/SearchParams';

type Props = {
  people: Person[],
  slug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParams.Sort);
  const order = searchParams.get(SearchParams.Order);

  const setSortParams = (sortValue: string) => {
    if (sort !== sortValue) {
      return { sort: sortValue, order: null };
    }

    if (!order) {
      return { sort: sortValue, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const isSortUp = (sortValue: string) => sort === sortValue && !order;
  const isSortDown = (sortValue: string) => sort === sortValue && order;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(ColumnsNames).map(name => {
            const isSortButtonShown
              = name !== ColumnsNames.Mother && name !== ColumnsNames.Father;

            return (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name[0].toUpperCase() + name.slice(1)}
                  {isSortButtonShown && (
                    <SearchLink
                      params={setSortParams(name)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', 'fa-sort', {
                            'fa-sort-up': isSortUp(name),
                            'fa-sort-down': isSortDown(name),
                          })}
                        />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
