/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import { LoaderEnum } from '../types/loader';
import classNames from 'classnames';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSortIcon, handleSortClick } from '../utils/prepare_sorting';

interface PeopleTableProps {
  people: Person[];
  error: string;
  loader: LoaderEnum;
}

enum Type {
  mother = 'mother',
  father = 'father',
}

enum Sex {
  man = 'm',
  women = 'f',
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
                                                          people,
                                                          error,
                                                          loader,
                                                        }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('query') || null);
  const { slug } = useParams<{ slug: string }>();

  const getParentLink = (name: string | null, people: Person[], type: Type) => {
    const parent = people.find(p => p.name === name);
    return parent ? (
      <NavLink
        to={`/people/${parent.slug}`}
        className={classNames(type === Type.mother ? 'has-text-danger' : '')}
      >
        {parent.name || '-'}
      </NavLink>
    ) : (
      name || '-'
    );
  };

  const SORT_COLUMNS = ['Name', 'Sex', 'Born', 'Died'];
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order') || '';


    function filteringData(people: Person[]): Person[] {
      const sex = searchParams.get('sex');
      const searchQuery = searchParams.get('query')
      const centuries =  searchParams.getAll('centuries')
      const getCentury = (year: number) => Math.ceil(year / 100).toString();

      return people.filter((person) => {
       const matchesSex = !sex || person.sex === sex;
       const matchesName = !searchQuery || person.name.toLowerCase().includes(searchQuery.toLowerCase());



        const matchesCenturies = !centuries.length || centuries.includes(getCentury(person.born));
       return matchesSex && matchesName && matchesCenturies
     });
    }
  // person.died

  const filtered_data = filteringData(people);
  console.log(filtered_data, 'ЧЕ ТУТ');


  return (
      <div className="box table-container">
        {loader === 'loading' && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {loader === 'loaded' && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!!people.length && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
            <tr>

              {SORT_COLUMNS.map((column) => (
                <th>
                <span className="is-flex is-flex-wrap-nowrap" onClick={(event) => {
                  event.preventDefault();
                }}>
                  {column}
                  <SearchLink
                    params={handleSortClick(column.toLowerCase() , currentSort  , currentOrder)}
                  >
                    <span className="icon">
                      {getSortIcon(handleSortClick(column , currentSort , currentOrder))}
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
            {filtered_data.map(person => (
              <tr
                data-cy="person"
                className={classNames(
                  person.slug === slug ? 'has-background-warning' : '',
                )}
                key={person.slug}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={classNames(
                      person.sex === Sex.women ? 'has-text-danger' : '',
                    )}
                  >
                    {person.name}
                  </NavLink>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>{getParentLink(person.motherName, people, Type.mother)}</td>
                <td>{getParentLink(person.fatherName, people, Type.father)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
