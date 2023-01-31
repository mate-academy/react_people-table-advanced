import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  filteredPeople: Person[],
};

enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: FC<Props> = ({
  people,
  filteredPeople,
}) => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const personWithParents = (person: Person) => {
    const mother = people.find(
      parent => parent.name === person.motherName,
    );

    const father = people.find(
      parent => parent.name === person.fatherName,
    );

    return ({ ...person, mother, father });
  };

  const updateSearchParams = (sortByColumn: SortBy) => {
    if (!sort || sort !== sortByColumn) {
      return ({
        sort: sortByColumn,
        order: null,
      });
    }

    if (sort && !order) {
      return ({
        sort: sortByColumn,
        order: 'desc',
      });
    }

    return ({
      sort: null,
      order: null,
    });
  };

  const handleSortStyle = (sortByColumn: SortBy) => {
    if (sort === sortByColumn && !order) {
      return 'fas fa-sort-up';
    }

    if (sort === sortByColumn && order) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
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
              <SearchLink
                params={updateSearchParams(SortBy.Name)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={updateSearchParams(SortBy.Sex)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={updateSearchParams(SortBy.Born)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={updateSearchParams(SortBy.Died)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink
            person={personWithParents(person)}
            key={person.slug}
            selectedPerson={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
