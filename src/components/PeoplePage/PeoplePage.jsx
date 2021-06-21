import React, { useEffect, useState } from 'react';
import {
  Route,
  useLocation,
  Link,
  Switch,
} from 'react-router-dom';
import { shape } from 'prop-types';
import { getPeople } from '../api';
import { PeopleTable } from '../PeopleTable';
import { PersonSearchBar } from '../PersonSearchBar';
import { NewPerson } from '../NewPerson';

export const PeoplePage = ({ match }) => {
  const [people, setPeople] = useState([]);
  const [visiblePeople, setVisPeople] = useState(people);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('name') || '';
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

  const addPerson = (person) => {
    setPeople([person, ...people]);
  };

  useEffect(() => setVisPeople([...people].sort(
    (a, b) => {
      if (sortBy === 'name' || sortBy === 'sex') {
        return order * a[sortBy].localeCompare(b[sortBy]);
      }

      if (sortBy === 'born' || sortBy === 'died') {
        return order * (+a[sortBy] - +b[sortBy]);
      }

      return 0;
    },
  ).filter((person) => {
    const lowerQuery = appliedQuery.toLowerCase();

    return (
      person.name.toLowerCase().includes(lowerQuery)
        || `${person.motherName}`.toLowerCase().includes(lowerQuery)
        || `${person.fatherName}`.toLowerCase().includes(lowerQuery)
    );
  })), [sortBy, order, people, appliedQuery]);

  useEffect(() => {
    getPeople().then((response) => {
      setPeople(response);
      setVisPeople(response);
    });
  }, []);

  return (
    <>
      <p className="title is-3 is-spaced">People</p>

      <Switch>
        <Route
          path="/people/:personSlug?/new"
        >
          <NewPerson addPerson={addPerson} people={[...people]} />
        </Route>
        <Route
          path="/people"
        >
          <Link
            to={{
              pathname: `/people/${
                match.params.personSlug
                  ? `${match.params.personSlug}/` : ''
              }new`,
              search: location.search,
            }}
            className="button is-success"
          >
            <i className="fas fa-user-plus" />
          </Link>
        </Route>
      </Switch>

      <PersonSearchBar />

      {!people
        ? ''
        : (
          <>
            <PeopleTable
              people={visiblePeople}
              selectedPersonSlug={match.params.personSlug}
            />
          </>
        )
      }
    </>
  );
};

PeoplePage.propTypes = {
  match: shape().isRequired,
};
