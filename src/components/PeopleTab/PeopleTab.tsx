import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[]
  filteredPeople: Person[]
}

export const PeopleTab: React.FC<Props> = ({ people, filteredPeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPerson = (name: string) => {
    return people.find((pers => pers.name === name));
  };

  const sortParams = (sortType: string) => {
    if (sort !== sortType) {
      return { sort: sortType, order: null };
    }

    if (order) {
      return { sort: null, order: null };
    }

    return { sort: sortType, order: 'desc' };
  };

  const getSortClass = (name: string) => {
    if (sort !== name) {
      return 'fas fa-sort';
    }

    if (sort === name && !order) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort-down';
  };

  return (
    filteredPeople.length
      ? (
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
                    params={sortParams('name')}
                  >
                    <span className="icon">
                      <i className={getSortClass('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={sortParams('sex')}
                  >
                    <span className="icon">
                      <i className={getSortClass('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={sortParams('born')}
                  >
                    <span className="icon">
                      <i className={getSortClass('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={sortParams('died')}
                  >
                    <span className="icon">
                      <i className={getSortClass('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map((person) => (
              <>
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <PersonLink person={person} />

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  {person.motherName ? (
                    <PersonLink
                      person={findPerson(person.motherName)}
                      parentName={person.motherName}
                    />
                  ) : (
                    <td>-</td>
                  )}
                  {person.fatherName ? (
                    <PersonLink
                      person={findPerson(person.fatherName)}
                      parentName={person.fatherName}
                    />
                  ) : (
                    <td>-</td>
                  )}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )
      : (
        <p>
          There are no people matching the current search criteria
        </p>
      )
  );
};
