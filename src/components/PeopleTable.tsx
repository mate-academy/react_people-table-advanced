import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortBy } from '../types/SortBy';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length) {
      const century = Math.ceil(person.born / 100);

      if (!centuries.includes(`${century}`)) {
        return false;
      }
    }

    if (query
      && !(
        person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query)
      )
    ) {
      return false;
    }

    return true;
  });

  const onSort = () => {
    switch (sort) {
      case SortBy.name:
      case SortBy.sex:
        filteredPeople.sort((person1, person2) => person1[sort]
          .localeCompare(person2[sort]));
        break;

      case SortBy.born:
      case SortBy.died:
        filteredPeople
          .sort((person1, person2) => person1[sort] - person2[sort]);
        break;

      default:
        filteredPeople.sort((person1, person2) => person1.slug
          .localeCompare(person2.slug));
    }

    if (order) {
      filteredPeople.reverse();
    }
  };

  if (sort) {
    onSort();
  }

  return (
    !filteredPeople.length ? (
      <p>There are no people matching the current search criteria</p>
    ) : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SortLink
                  sortBy={SortBy.name}
                  isSortingNow={SortBy.name === sort}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SortLink
                  sortBy={SortBy.sex}
                  isSortingNow={SortBy.sex === sort}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SortLink
                  sortBy={SortBy.born}
                  isSortingNow={SortBy.born === sort}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SortLink
                  sortBy={SortBy.died}
                  isSortingNow={SortBy.died === sort}
                />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {filteredPeople.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              isSelected={slug === person.slug}
            />
          ))}
        </tbody>
      </table>
    )
  );
};
