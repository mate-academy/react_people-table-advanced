import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';
import { PersonLink } from '../PersonLink/PersonLink';

type PeopleTableProps = {
  people: Person[];
  sortType: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sortType,
  order,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const headName = ['Name', 'Sex', 'Born', 'Died'];

  const isSelected = useCallback(
    (person: Person) => person.slug === slug, [slug],
  );

  const handleSort = useCallback((name: string) => {
    if (name === sortType && !order) {
      return { sort: name, order: 'desc' };
    }

    if (name === sortType && order) {
      return { sort: null, order: null };
    }

    return { sort: name, order: null };
  }, [order, sortType]);

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {headName.map((name) => (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}

                  <SearchLink params={handleSort(name.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={classNames('fas fa-sort', {
                          'fa-sort-up':
                            sortType === name.toLowerCase() && !order,
                          'fa-sort-down':
                            sortType === name.toLowerCase() && order,
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
          {people.map((person) => {
            const selected = isSelected(person);

            const findMother
              = (): Person | undefined => {
                return people
                  .find((mother) => mother.name === person.motherName);
              };

            const findFather
              = (): Person | undefined => {
                return people
                  .find((father) => father.name === person.fatherName);
              };

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({ 'has-background-warning': selected })}
              >
                <td>
                  <PersonLink person={person} isSelected={isSelected} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {findMother() ? (
                    <PersonLink
                      person={findMother()!}
                      isSelected={isSelected}
                    />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {findFather() ? (
                    <PersonLink
                      person={findFather()!}
                      isSelected={isSelected}
                    />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
