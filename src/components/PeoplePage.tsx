import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PeopleTable';
import { SearchLink } from './SearchLink';
import { Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const peopleMain = useRef<Person[]>(people);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
        peopleMain.current = data;
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sex = searchParams.get(Sort.sex);
  const centuries = searchParams.getAll(Sort.centuries);
  const query = searchParams.get(Sort.query);
  const sort = searchParams.get(Sort.sort);
  const order = searchParams.get(Sort.order);
  const typesSort = ['Name', 'Sex', 'Born', 'Died'];

  const filteredPeople = useMemo(() => {
    let peoples = [...people];

    if (sex) {
      peoples = peoples.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      peoples = peoples.filter(person => centuries
        .includes((parseInt(person.born
          .toString().slice(0, 2), 10) + 1).toString()));
    }

    if (query) {
      peoples = peoples.filter(person => person.name.toLowerCase()
        .includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase()));
    }

    if (sort) {
      switch (sort) {
        case 'name':
          peoples = peoples.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case Sort.sex:
          peoples = peoples.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        case 'born':
          peoples = peoples.sort((a, b) => a.born - b.born);
          break;
        case 'died':
          peoples = peoples.sort((a, b) => a.died - b.died);
          break;
        default:
          break;
      }

      if (order === Sort.desc) {
        peoples.reverse();
      }
    }

    return peoples;
  }, [order, sort, query, people, sex, centuries]);

  const handleSortName = (type: string) => {
    switch (sort) {
      case type:
        if (order !== Sort.desc) {
          return (
            <SearchLink params={{
              order: Sort.desc,
            }}
            >
              <span className="icon">
                <i className="fas fa-sort-up" />
              </span>
            </SearchLink>
          );
        }

        return (
          <SearchLink params={{
            sort: null,
            order: null,
          }}
          >
            <span className="icon">
              <i className="fas fa-sort-down" />
            </span>
          </SearchLink>
        );

      default:
        return (
          <SearchLink params={{ sort: type, order: null }}>
            <span className="icon">
              <i className="fas fa-sort" />
            </span>
          </SearchLink>
        );
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {
                isLoading
                  ? <Loader />
                  : (
                    <>
                      {isError && (
                        <p
                          data-cy="peopleLoadingError"
                          className="has-text-danger"
                        >
                          Something went wrong
                        </p>
                      )}
                      {!people.length ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <table
                          data-cy="peopleTable"
                          className="
                          table
                          is-striped
                          is-hoverable
                          is-narrow
                          is-fullwidth
                          "
                        >
                          <thead>
                            <tr>
                              {
                                typesSort.map(type => (
                                  <th>
                                    <span
                                      className="is-flex is-flex-wrap-nowrap"
                                    >
                                      {type}
                                      {handleSortName(type.toLocaleLowerCase())}
                                    </span>
                                  </th>
                                ))
                              }
                              <th>Mother</th>
                              <th>Father</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              (filteredPeople).map(person => (
                                <PersonLink
                                  key={person.slug}
                                  person={person}
                                  people={people}
                                />
                              ))
                            }
                          </tbody>
                        </table>
                      )}
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
