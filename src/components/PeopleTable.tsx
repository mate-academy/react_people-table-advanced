import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortType } from './enums/SortType';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: React.FC<Props> = ({
  people, selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getSortType = (sortType: SortType) => {
    return {
      sort: sort === sortType && order ? null : sortType,
      order: sort === sortType && !order ? 'desc' : null,
    };
  };

  const classNamesSort = (sortType: SortType) => (
    classNames(
      'fas', {
        'fa-sort': sort !== sortType,
        'fa-sort-up': sort === sortType && !order,
        'fa-sort-down': sort === sortType && order,
      },
    )
  );

  return (
    <table
      data-cy="peopleTable"
      className="table
          is-striped
          is-hoverable
          is-narrow
          is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={
                getSortType(SortType.Name)
              }
              >
                <span className="icon">
                  <i className={classNamesSort(SortType.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={
                getSortType(SortType.Sex)
              }
              >
                <span className="icon">
                  <i className={classNamesSort(SortType.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={
                getSortType(SortType.Born)
              }
              >
                <span className="icon">
                  <i className={classNamesSort(SortType.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={
                getSortType(SortType.Died)
              }
              >
                <span className="icon">
                  <i className={classNamesSort(SortType.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(({
          name, sex, born, died, fatherName,
          motherName, slug,
        }: Person) => {
          const isMother = people.find(person => person.name === motherName);
          const isFather = people.find(person => person.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
              )}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                { isMother ? (
                  <PersonLink person={isMother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                { isFather ? (
                  <PersonLink person={isFather} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
