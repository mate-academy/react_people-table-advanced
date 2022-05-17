import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import {
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api/api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const { personSlug } = useParams();
  const { search } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(search);

  useEffect(() => {
    getPeople()
      .then((res: Person[]) => res.map(person => ({
        ...person,
        father: res.find(m => m.name === person.fatherName),
        mother: res.find(f => f.name === person.motherName),
      })))
      .then(setPeople);
  }, []);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [people, searchParams, personSlug],
  );

  const filterPeople = () => {
    if (appliedQuery) {
      const lowerQuery = appliedQuery.toLowerCase();

      return people.filter(pers => (
        pers.name.toLowerCase().includes(lowerQuery)
          || pers.motherName?.toLowerCase().includes(lowerQuery)
          || pers.fatherName?.toLowerCase().includes(lowerQuery)
      ));
    }

    return people;
  };

  const filteredPeople = useMemo(() => {
    return filterPeople();
  }, [people, appliedQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div className="PeoplePage block">
      <h2 className="title HomePage__title">
        Peope page
      </h2>
      <div className="wrapper">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Write name here"
                value={query}
                onChange={handleQueryChange}
              />
            </div>
          </div>
        </div>
      </div>

      <PeopleTable people={filteredPeople} slug={personSlug} />
    </div>
  );
};
