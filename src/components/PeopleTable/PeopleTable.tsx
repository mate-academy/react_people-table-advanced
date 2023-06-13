import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';

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
  const { slug } = useParams();
  const headName = ['Name', 'Sex', 'Born', 'Died'];

  const handleSort = (name: string) => {
    if (name === sortType && !order) {
      return { sortType: name, order: 'desc' };
    }

    if (name === sortType && order) {
      return { sortType: null, order: null };
    }

    return { sortType: name, order: null };
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {headName.map((name) => (
              <th
                key={name}
              >
                <span
                  className="is-flex is-flex-wrap-nowrap"
                >
                  {name}

                  <SearchLink
                    params={handleSort(name.toLowerCase())}

                  >
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
            const isSelected = slug === person.slug;
            const findMother = (): Person | undefined => {
              return people.find((mother) => mother.name === person.motherName);
            };

            const findFather = (): Person | undefined => {
              return people.find((father) => father.name === person.fatherName);
            };

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({ 'has-background-warning': isSelected })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>
                  {person.sex}
                </td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{findMother() ? person.motherName : '-'}</td>
                <td>{findFather() ? person.fatherName : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
