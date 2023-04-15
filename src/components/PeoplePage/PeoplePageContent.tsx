import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonModal } from '../PersonModal/PersonModal';
import { getSearchWith } from '../../utils/searchHelper';
import { peopleFilterFunction } from '../../utils/peopleFilterFunction';

export const PeoplePageContent: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (loadingError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  let visiblePeople = peopleFilterFunction(people, searchParams);

  switch (sort) {
    case 'name':
      visiblePeople.sort((personA, personB) => (
        personA.name.toLowerCase().localeCompare(personB.name.toLowerCase())
      ));
      break;

    case 'sex':
      visiblePeople.sort((personA, personB) => (
        personA.sex.localeCompare(personB.sex)
      ));
      break;

    case 'born':
      visiblePeople.sort((personA, personB) => personA.born - personB.born);
      break;

    case 'died':
      visiblePeople.sort((personA, personB) => personA.died - personB.died);
      break;

    default:
      break;
  }

  if (order === 'desc') {
    visiblePeople = visiblePeople.reverse();
  }

  const getFilterSearchParams = (sortBy: string) => {
    if (sort !== sortBy) {
      return getSearchWith(searchParams, { sort: sortBy, order: null });
    }

    if (order === null) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const iconClasses = (sortValue: string) => {
    return classNames(
      'fas fa-sort',
      { 'fa-sort-up': sort === sortValue && !order },
      { 'fa-sort-down': sort === sortValue },
    );
  };

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
              <Link
                to={{
                  search: getFilterSearchParams('name'),
                }}
              >
                <span className="icon">
                  <i className={iconClasses('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getFilterSearchParams('sex'),
                }}
              >
                <span className="icon">
                  <i className={iconClasses('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getFilterSearchParams('born'),
                }}
              >
                <span className="icon">
                  <i className={iconClasses('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getFilterSearchParams('died'),
                }}
              >
                <span className="icon">
                  <i className={iconClasses('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person) => (
          <PersonModal
            person={person}
            key={person.slug}
            selectedPersonSlug={slug}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
