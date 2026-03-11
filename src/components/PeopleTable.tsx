import { getPeople } from '../utils/getPeople';
import { Person } from '../types/Person';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import classNames from 'classnames';
import { PeoplePage } from '../components/PeoplePage';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeopleTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { personID } = useParams();
  const selectedPerson = personID;

  const visiblePeople = people.filter(person => {
    const normalizedQuery = query.toLowerCase();

    const nameFilter =
      !query ||
      person.name.toLocaleLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLocaleLowerCase().includes(normalizedQuery);

    const century = Math.ceil(person.born / 100).toString();

    const centuryFilter = centuries.length === 0 || centuries.includes(century);

    const sexFilter = !sex || person.sex === sex;

    return nameFilter && centuryFilter && sexFilter;
  });

  function handleSort(sortBy: string) {
    const params = new URLSearchParams(searchParams);

    if (sort !== sortBy) {
      params.set('sort', sortBy);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  function sortedPeople(data: Person[]) {
    const sortedPeoople = [...data];

    switch (sort) {
      case 'name':
        sortedPeoople.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'sex':
        sortedPeoople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case 'born':
        sortedPeoople.sort((a, b) => b.born - a.born);
        break;

      case 'died':
        sortedPeoople.sort((a, b) => a.born - b.born);
        break;

      default:
        return sortedPeoople;
    }

    if (order === 'desc') {
      sortedPeoople.reverse();
    }

    return sortedPeoople;
  }

  const sorted = sortedPeople(visiblePeople);

  function getClassName(param: string) {
    return classNames('fas', {
      'fa-sort': sort !== param,
      'fa-sort-up': sort === param && !order,
      'fa-sort-down': sort === param && order === 'desc',
    });
  }

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>
          <div className="column ">
            <div className="box table-container">
              <table
                data-cy="peopleTable"
                className="table is-striped
                   is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Name
                        <a onClick={() => handleSort('name')}>
                          <span className="icon">
                            <i className={getClassName('name')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Sex
                        <a onClick={() => handleSort('sex')}>
                          <span className="icon">
                            <i className={getClassName('sex')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Born
                        <a onClick={() => handleSort('born')}>
                          <span className="icon">
                            <i className={getClassName('born')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Died
                        <a onClick={() => handleSort('died')}>
                          <span className="icon">
                            <i className={getClassName('died')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {sorted.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning':
                          person.slug === selectedPerson,
                      })}
                    >
                      <td>
                        <PeoplePage
                          name={person.name}
                          people={people}
                          to={selectedPerson === person.slug ? '..' : undefined}
                        />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        <PeoplePage name={person.motherName} people={people} />
                      </td>
                      <td>
                        <PeoplePage name={person.fatherName} people={people} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !isLoading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
