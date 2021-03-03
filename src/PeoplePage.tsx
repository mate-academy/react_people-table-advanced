import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PeopleTable } from './PeopleTable';
import { PeopleForm } from './PeopleForm';
import { fetchPeople } from './api';
import { Person } from './typesDefinitions';
import { useLocation, useHistory } from 'react-router-dom';
import { NAME, BORN, DIED, SEX, ASC } from './constAndFunc';
import { PeopleFilter } from './PeopleFilter';
import { debounce } from 'lodash';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isFormRequired, setIsFormRequired] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  useEffect(() => {
    fetchPeople().then(setPeople);
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      };

      history.push(`?${searchParams.toString()}`);
    }, 1000), []
  );

  const handleQueryChange = (value: string): void => {
    setQuery(value);
    applyQuery(value);
  };

  const filteredPeople = useMemo(() => {
    let sortedPeople = [...people];

    if (appliedQuery) {
      const tempQuery = query.toLowerCase().trim();
      sortedPeople = people.filter(person => (
        (person.name + person.motherName + person.fatherName)
          .toLowerCase().includes(tempQuery)));
    };

    if (!!sortOrder) {
      switch (sortBy) {
        case NAME:
        case SEX:
          sortedPeople.sort((a, b) => {
            return sortOrder === ASC
              ? a[sortBy].localeCompare(b[sortBy])
              : b[sortBy].localeCompare(a[sortBy])
          });
          break;
        case BORN:
        case DIED:
          sortedPeople.sort((a, b) => {
            return sortOrder === ASC
              ? a[sortBy] - b[sortBy]
              : b[sortBy] - a[sortBy]
          });
          break;
        default:
          break;
      };
    };

    return sortedPeople;
  }, [appliedQuery, people, query, sortBy, sortOrder]);

  return (
    <>
      <h1 className="display-3">People table</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <PeopleTable people={filteredPeople} />
          </div>
          <div className="col-4">
            <PeopleFilter
              handleQueryChange={handleQueryChange}
              query={query}
            />
            {isFormRequired
              ? <PeopleForm
                people={people}
                setIsFormRequired={setIsFormRequired}
                setPeople={setPeople} />
              : <div className="d-grid gap-2 col-4 mx-auto sticky-top">
                <button
                  className="btn btn-primary isButton"
                  type="button"
                  onClick={() => setIsFormRequired(true)}
                >
                  Add new person
                </button>
              </div>}
          </div>
        </div>
      </div>
    </>
  );
};
