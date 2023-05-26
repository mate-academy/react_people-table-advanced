import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PersonItem } from './PersonItem';

interface Props {
  people: Person[];
  isTableVisible: boolean;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  isTableVisible,
}) => {
  const { slug = '' } = useParams();
  const [isSorted, setIsSorted] = useState(false);

  const location = useLocation();

  const sortingByParams = (param: string) => {
    switch (param) {
      case 'name':
        if (!isSorted) {
          people.sort((a, b) => a.name.localeCompare(b.name));
          setIsSorted(true);
        } else {
          people.reverse();
        }

        break;
      case 'sex':
        if (!isSorted) {
          people.sort((a, b) => a.sex.localeCompare(b.sex));
          setIsSorted(true);
        } else {
          people.reverse();
        }

        break;
      case 'born':
        if (!isSorted) {
          people.sort((a, b) => a.born - b.born);
        } else {
          people.reverse();
        }

        break;
      case 'died':
        if (!isSorted) {
          people.sort((a, b) => a.died - b.died);
        } else {
          people.reverse();
        }

        break;
      default:
    }
  };

  const findParent = (parentName: string) => {
    return people.find(person => person.name === parentName);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get('sort');

    if (sortParam) {
      sortingByParams(sortParam);
    }
  }, [location.search]);

  return (
    <>
      {isTableVisible
        ? (<Loader />) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <Link to="#/people?sort=name">
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <Link to="/people?sort=name">
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <Link to="#/people?sort=born&amp;order=desc">
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <Link to="#/people?sort=died">
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonItem
                  person={person}
                  key={person.slug}
                  findParent={findParent}
                  selectedPerson={slug}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
