import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="peopleLoadingError">
        Something went wrong while loading people.
      </div>
    );
  }

  if (people.length === 0) {
    return <div data-cy="noPeopleMessage">No people</div>;
  }

  const filteredPeople = people
    .filter(person => {
      if (!sex) {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      if (!query) {
        return true;
      }

      const normalizedQuery = query.toLowerCase();

      const name = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase() || '';
      const fatherName = person.fatherName?.toLowerCase() || '';

      return (
        name.includes(normalizedQuery) ||
        motherName.includes(normalizedQuery) ||
        fatherName.includes(normalizedQuery)
      );
    })
    .filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });

  const sortedPeople = [...filteredPeople].sort((personA, personB) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    switch (sort) {
      case 'name':
        result = personA.name.localeCompare(personB.name);
        break;

      case 'sex':
        result = personA.sex.localeCompare(personB.sex);
        break;

      case 'born':
        result = personA.born - personB.born;
        break;

      case 'died':
        result = personA.died - personB.died;
        break;

      default:
        return 0;
    }

    if (order === 'desc') {
      return -result;
    }

    return result;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column is-3">
          <PeopleFilters />
        </div>

        <div className="column">
          <PeopleTable people={sortedPeople} selectedSlug={slug} />
        </div>
      </div>
    </>
  );
};
