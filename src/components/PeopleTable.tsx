/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Person } from '../types';
import { useState } from 'react';
import { PersonRow } from './PersonRow';
import cn from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sortConfig: {
    key: string | null;
    direction: 'asc' | 'desc' | null;
  };
  handleSort: (key: keyof Person) => void;
  sortedPeople: Person[];
  noFilterDataAvailable: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortConfig,
  handleSort,
  sortedPeople,
  noFilterDataAvailable,
}) => {
  const { slug: urlSlug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    urlSlug || null,
  );

  const navigate = useNavigate();

  const handlePersonClick = (slug: string) => {
    setSelectedPerson(slug);
    navigate(`/people/${slug}`, { replace: true });
  };

  const getIconClassName = (key: keyof Person): string => {
    return cn({
      'fas fa-sort': sortConfig.key !== key,
      'fas fa-sort-up':
        sortConfig.key === key && sortConfig.direction === 'asc',
      'fas fa-sort-down':
        sortConfig.key === key && sortConfig.direction === 'desc',
    });
  };

  const createSortHandler =
    (key: keyof Person) =>
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleSort(key);
      };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {noFilterDataAvailable || (
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <Link
                  to="/people?sort=name"
                  onClick={createSortHandler('name')}
                >
                  <span className="icon">
                    <i className={getIconClassName('name')} />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <Link to="/people?sort=sex" onClick={createSortHandler('sex')}>
                  <span className="icon">
                    <i className={getIconClassName('sex')} />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <Link
                  to="/people?sort=born&amp;order=desc"
                  onClick={createSortHandler('born')}
                >
                  <span className="icon">
                    <i className={getIconClassName('born')} />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <Link
                  to="/people?sort=died"
                  onClick={createSortHandler('died')}
                >
                  <span className="icon">
                    <i className={getIconClassName('died')} />
                  </span>
                </Link>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        )}
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            people={people}
            selectedPerson={selectedPerson}
            handlePersonClick={handlePersonClick}
          />
        ))}
      </tbody>
    </table>
  );
};
