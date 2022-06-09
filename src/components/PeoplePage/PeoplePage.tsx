import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import {
  useSearchParams, useParams,
  useLocation,
} from 'react-router-dom';
import { debounce } from 'lodash';
import { People } from '../../type';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  const { slugMan } = useParams();
  const { search } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(search);

  useEffect(() => {
    getPeople()
      .then((res: People[]) => res.map(person => ({
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
    [people, searchParams, slugMan],
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

      <PeopleTable people={filteredPeople} slug={slugMan} />
    </div>
  );
};
