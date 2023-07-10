import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SortLinksNames } from '../../types/SortLinks';
import { SearchLink } from '../SearchLink';

export type PropsPeopleTable = {
  people: Person[],
  filteredPeople: Person[],
};

const sortLinks = [
  { name: SortLinksNames.NAME, value: 'name' },
  { name: SortLinksNames.SEX, value: 'sex' },
  { name: SortLinksNames.BORN, value: 'born' },
  { name: SortLinksNames.DIED, value: 'died' },
];

export const PeopleTable: React.FC<PropsPeopleTable> = ({
  people,
  filteredPeople,
}) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParentOfPerson = useCallback((parentName: string | null) => {
    return people.find((person: Person) => person.name === parentName);
  }, []);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortLinks.map(sortLink => (
            <th key={sortLink.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                <p>
                  {sortLink.name}
                </p>
                <SearchLink
                  params={searchParams.get('sort') === sortLink.value
                    && searchParams.get('order') === 'desc'
                    ? {
                      sort: null,
                      order: null,
                    }
                    : {
                      sort: sortLink.value,
                      order: searchParams.get('sort') === sortLink.value
                        ? 'desc'
                        : null,
                    }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== sortLink.value || sort,
                        'fa-sort-up': sort === sortLink.value && order === null,
                        'fa-sort-down': sort === sortLink.value
                          && order === 'desc',
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
        {filteredPeople.map(person => {
          const personMother = findParentOfPerson(person.motherName);
          const personFather = findParentOfPerson(person.fatherName);

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.motherName
                ? (
                  <td>
                    {personMother
                      ? (
                        <PersonLink
                          person={personMother}
                        />
                      )
                      : person.motherName}
                  </td>
                )
                : <td>-</td>}

              {person.fatherName
                ? (
                  <td>
                    {personFather
                      ? (
                        <PersonLink
                          person={personFather}
                        />
                      )
                      : person.fatherName}
                  </td>
                )
                : <td>-</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
