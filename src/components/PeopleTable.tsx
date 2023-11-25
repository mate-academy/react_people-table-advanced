import classnames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const columnsName = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { userSlug } = useParams();

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function togglesort(column: string) {
    let newParam = {};

    if (sort !== column.toLowerCase()) {
      newParam = { sort: column.toLowerCase(), order: null };
    }

    if (sort === column.toLowerCase() && !order) {
      newParam = { sort: column.toLowerCase(), order: 'desc' };
    }

    if (sort === column.toLowerCase() && order) {
      newParam = { sort: null, order: null };
    }

    return newParam;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {people.length > 0 ? (
        <thead>
          <tr>
            {columnsName.map((colum) => {
              return (
                <th key={colum}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {colum}
                    <SearchLink
                      params={{
                        ...togglesort(colum),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classnames('fas', {
                            'fa-sort': sort !== colum.toLowerCase(),
                            'fa-sort-up':
                              sort === colum.toLowerCase() && order !== 'desc',
                            'fa-sort-down':
                              sort === colum.toLowerCase() && order === 'desc',
                          })}
                        />
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
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
      <tbody>
        {people.map((person: Person) => {
          const searchMother = people.find(
            (pers) => pers.name === person.motherName,
          );
          const serchFather = people.find(
            (pers) => pers.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classnames({
                'has-background-warning': person.slug === userSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {searchMother ? (
                  <PersonLink person={searchMother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {serchFather ? (
                  <PersonLink person={serchFather} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
