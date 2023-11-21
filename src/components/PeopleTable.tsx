import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  function findPerson(parentName: string | null): Person | undefined {
    return people.find((person) => person.name === parentName);
  }

  const { selectedName } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

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
                params={{
                  sort: sort === 'name' && isReversed ? null : 'name',
                  order: sort === 'name' && !isReversed ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !isReversed,
                      'fa-sort-down': sort === 'name' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sort === 'sex' && isReversed ? null : 'sex',
                  order: sort === 'sex' && !isReversed ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !isReversed,
                      'fa-sort-down': sort === 'sex' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sort === 'born' && isReversed ? null : 'born',
                  order: sort === 'born' && !isReversed ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !isReversed,
                      'fa-sort-down': sort === 'born' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sort === 'died' && isReversed ? null : 'died',
                  order: sort === 'died' && !isReversed ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !isReversed,
                      'fa-sort-down': sort === 'died' && isReversed,
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
        {people?.map((person) => {
          const fatherPerson = findPerson(person.fatherName);
          const motherPerson = findPerson(person.motherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selectedName === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
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
