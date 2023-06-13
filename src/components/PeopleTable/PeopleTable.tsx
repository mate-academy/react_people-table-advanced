import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';
import { PersonLink } from '../PersonLink/PersonLink';

type PeopleTableProps = {
  people: Person[];
  sortType: string | '';
  order: string | '';
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sortType,
  order,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const headName = ['Name', 'Sex', 'Born', 'Died'];

  const isSelected = useCallback((person: Person) => person.slug === slug, [
    slug,
  ]);

  const handleSort = useCallback((name: string) => {
    if (name === sortType && !order) {
      return { sort: name, order: 'desc' };
    }

    if (name === sortType && order) {
      return { sort: null, order: null };
    }

    return { sort: name, order: null };
  }, [order, sortType]);

  const findMother = useCallback((person: Person): Person | undefined => {
    return people.find((mother) => mother.name === person.motherName);
  }, [people]);

  const findFather = useCallback((person: Person): Person | undefined => {
    return people.find((father) => father.name === person.fatherName);
  }, [people]);

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
            const mother = findMother(person);
            const father = findFather(person);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({ 'has-background-warning': selected })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {father ? (
                    <PersonLink person={father} />
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
