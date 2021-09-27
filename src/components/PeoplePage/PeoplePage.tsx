import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useLocation, useHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';

import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';

import './PeoplePage.scss';

export const PeoplePage: React.FC<any> = ({ personSlug }: MatchParams) => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);
  const [visualisedPeople, setVisualisedPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    getPeople()
      .then(requestPeople => {
        const newPeople: Array<PersonWithParents> = requestPeople.map((person: Person) => {
          const father: Person = requestPeople
            .find(({ name }: Person) => name === person.fatherName);
          const mother: Person = requestPeople
            .find(({ name }: Person) => name === person.motherName);

          return {
            ...person,
            father,
            mother,
            id: uuidv4(),
          };
        });

        setPeople(newPeople);
      });
  }, []);

  const history = useHistory();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(appliedQuery);
  }, [appliedQuery]);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({
        search: searchParams.toString(),
      });
    }, 500), [],
  );

  const handleQueryChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    applyQuery(target.value);
  };

  const sortBy = searchParams.get('sortBy') || '';
  const [appliedToSortBy, setAppliedToSortBy] = useState('');

  const sortOrder = searchParams.get('sortOrder') || '';

  const handleSortChange = (value: string) => {
    let sortId = 'asc';

    if (value === appliedToSortBy) {
      sortId = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    searchParams.set('sortOrder', sortId);
    searchParams.set('sortBy', value);

    history.push({
      search: searchParams.toString(),
    });

    setAppliedToSortBy(value);
  };

  useEffect(() => {
    let newPeople = people;

    if (appliedQuery) {
      const lowerQuery = appliedQuery.toLowerCase();

      newPeople = newPeople.filter(({ name, motherName, fatherName }) => (
        name.toLowerCase().includes(lowerQuery)
        || motherName?.toLowerCase().includes(lowerQuery)
        || fatherName?.toLowerCase().includes(lowerQuery)
      ));
    } else {
      newPeople = people;
    }

    if (sortBy) {
      newPeople.sort((personA, personB): any => {
        if (sortBy === 'name' || sortBy === 'sex') {
          return sortOrder === 'asc'
            ? personA[sortBy].localeCompare(personB[sortBy])
            : personB[sortBy].localeCompare(personA[sortBy]);
        }

        if (sortBy === 'born' || sortBy === 'died') {
          return sortOrder === 'asc'
            ? personA[sortBy] - personB[sortBy]
            : personB[sortBy] - personA[sortBy];
        }

        return null;
      });
    }

    setVisualisedPeople(newPeople);
  }, [appliedQuery, people, sortBy, sortOrder]);

  useEffect(() => {
    setVisualisedPeople(people);
  }, [people]);

  return (
    <div className="container">
      <h2>People table</h2>

      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Person's name"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <PeopleTable
        people={visualisedPeople}
        personSlug={personSlug}
        searchParams={searchParams}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
    </div>
  );
};
