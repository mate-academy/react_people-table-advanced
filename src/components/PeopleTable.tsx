import {
  Link,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  // useCallback,
  useEffect,
  // useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

// export enum SortType {
//   NONE,
//   ALPHABET,
// }

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [copy, setCopy] = useState(people);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  // const all = searchParams.toString().length;
  // const [count, setCount] = useState(0)

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        setPeople(response);
        setCopy([...response]);
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isAnchorHere = (anchorName: string | null): Person | undefined => {
    if (anchorName) {
      return people.find(person => person.name === anchorName);
    }

    return undefined;
  };

  function getSortElementComparison(firstWord: string, secondWord: string) {
    return firstWord.localeCompare(secondWord);
  }

  function sortByTrigger() {
    const list = [...people];

    if (order) {
      return list.reverse();
    }

    if (sort === 'name') {
      return list.sort(
        (first, second) => getSortElementComparison(first.name, second.name),
      );
    }

    if (sort === 'sex') {
      return list.sort(
        (first, second) => getSortElementComparison(first.sex, second.sex),
      );
    }

    if (sort === 'born') {
      return list.sort(
        (first, second) => (first.born > second.born ? 1 : -1),
      );
    }

    if (sort === 'died') {
      return list.sort(
        (first, second) => (first.died > second.died ? 1 : -1),
      );
    }

    if (sex === 'm') {
      return list.sort(
        (first, second) => getSortElementComparison(second.sex, first.sex),
      );
    }

    if (sex === 'f') {
      return list.sort(
        (first, second) => getSortElementComparison(first.sex, second.sex),
      );
    }

    return copy;
  }

  function sortByName(sortBy: string) {
    if (sort && !order) {
      return { sort: sortBy, order: 'desc' };
    }

    if (order) {
      return { sort: null, order: null };
    }

    return { sort: sortBy };
  }

  useEffect(() => {
    const newPeople = sortByTrigger();

    setPeople(newPeople);
  }, [sort, sex, order]);

  return (
    <>
      {/* <h1 className="title">People Page</h1> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          {/* <div className="box table-container"> */}
          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {(people.length === 0 && !isLoadingError) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {(people.length > 0) && (
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <SearchLink
                        params={sortByName('name') as SearchParams}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <SearchLink
                        params={sortByName('sex') as SearchParams}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <SearchLink
                        params={sortByName('born') as SearchParams}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <SearchLink
                        params={sortByName('died') as SearchParams}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

            )}
            <tbody>
              {people.map((person) => {
                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning':
                        isSelected && person.slug === personSlug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                        onClick={() => setIsSelected(true)}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    <td>
                      {isAnchorHere(person.motherName) ? (
                        <Link
                          to={`/people/${isAnchorHere(person.motherName)?.slug}`}
                          className="has-text-danger"
                          onClick={() => setIsSelected(false)}
                        >
                          {isAnchorHere(person.motherName)?.name}
                        </Link>
                      ) : (
                        <>
                          {person.motherName}
                        </>
                      )}
                    </td>
                    <td>
                      {isAnchorHere(person.fatherName) ? (
                        <Link
                          to={`/people/${isAnchorHere(person.fatherName)?.slug}`}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {isAnchorHere(person.fatherName)?.name}
                        </Link>
                      ) : (
                        <>
                          {person.fatherName}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
          {/* </div> */}
        </div>

      )}
    </>
  );
};
