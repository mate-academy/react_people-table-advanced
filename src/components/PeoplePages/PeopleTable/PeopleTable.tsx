import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import './PeopleTable.scss';
import { Person } from '../../../types/Person';
import { Loader } from '../../Loader';
import { getPeople } from '../../../api/people';
import { PersonRow } from '../PersonRow/PersonRow';
import { NewPerson } from '../NewPerson/NewPerson';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSortedBy, setSortedBy] = useState('');
  const [isSortReversed, reverseSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    getPeople()
      .then(allPeople => {
        const preparedPeople = allPeople.map(person => ({ ...person }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother: preparedPeople
              .find(mom => mom.name === person.motherName) || null,
            father: preparedPeople
              .find(dad => dad.name === person.fatherName) || null,
          });
        });

        setPeople(preparedPeople);
      });
  }, []);

  const navigation = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigation(`?${searchParams}`, { replace: true });
    }, 500),
    [location.pathname],
  );

  const [isFormVisible, setFormVisibility] = useState(true);

  const handleFormVisibility = () => {
    if (isFormVisible) {
      searchParams.set('form', `${isFormVisible}`);
    } else {
      searchParams.delete('form');
    }

    setFormVisibility(!isFormVisible);

    navigation(`?${searchParams}`, { replace: true });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('sortBy', event.target.value);
    navigation(`?${searchParams}`, { replace: true });
    setSortedBy(event.target.value);
  };

  const handleReverseSort = () => {
    searchParams.set('sortOrder', isSortReversed);
    navigation(`?${searchParams}`, { replace: true });
    if (isSortReversed === 'asc'
    ) {
      reverseSort('desc');
    }

    if (isSortReversed === 'desc') {
      reverseSort('asc');
    }
  };

  useEffect(() => {
    reverseSort('asc');
  }, [isSortedBy]);

  // #region visiblePeope
  const setLowerStr = (str: string) => {
    return str ? str.toLocaleLowerCase() : '';
  };

  const lowerQuery = setLowerStr(appliedQuery);

  const filterCallback = (person: Person) => (
    setLowerStr(person.name).includes(lowerQuery)
      || setLowerStr(person.motherName).includes(lowerQuery)
      || setLowerStr(person.fatherName).includes(lowerQuery)
  );

  const sortCallback = (first: Person, second: Person) => {
    const pickSortParam = (str: string) => {
      switch (location.search.includes(str)) {
        case str === 'name':
          return isSortReversed === 'asc'
            ? first.name.localeCompare(second.name)
            : second.name.localeCompare(first.name);

        case str === 'sex':
          return isSortReversed === 'asc'
            ? first.sex.localeCompare(second.sex)
            : second.sex.localeCompare(first.sex);

        case str === 'born':
          return isSortReversed === 'asc'
            ? first.born - second.born
            : second.born - first.born;

        case str === 'died':
          return isSortReversed === 'asc'
            ? first.died - second.died
            : second.died - first.died;

        default:
          return 0;
      }
    };

    return pickSortParam(isSortedBy);
  };

  const visiblePeople = people
    .filter(filterCallback)
    .sort(sortCallback);
  // #endregion

  const setRadioHeadTitle = (value: string) => (
    <th className={classnames({
      'has-background-primary-light': isSortedBy === value,
    })}
    >
      <label className="table__label is-capitalized">
        <input
          type="radio"
          name="head"
          className="table__radio"
          value={value}
          onChange={handleSortByChange}
          onClick={handleReverseSort}
          checked={value === isSortedBy}
        />
        {value}
        {isSortReversed === 'asc' && value === isSortedBy && (
          <img src="images/sort_asc.png" alt="sortAsc" />
        )}
        {isSortReversed === 'desc' && value === isSortedBy && (
          <img src="images/sort_desc.png" alt="sortDesc" />
        )}
        {value !== isSortedBy && (
          <img src="images/sort_both.png" alt="notSorted" />
        )}
      </label>
    </th>
  );

  useEffect(() => {
    if (!location.search.includes(isSortedBy)) {
      setSortedBy('');
    }
  }, [location.search]);

  return (
    people.length === 0
      ? <Loader />
      : (
        <div className="is-flex is-flex-direction-column">
          {!location.search.includes('form') && (
            <button
              type="button"
              className="button is-info"
              onClick={handleFormVisibility}
            >
              New person form
            </button>
          )}
          {location.search.includes('form') && (
            <NewPerson
              people={people}
              onSetPeople={setPeople}
              onFormVisible={handleFormVisibility}
            />
          )}
          <div className="is-flex is-align-items-center">
            Filter:
            <input
              type="text"
              className="input is-rounded"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                {setRadioHeadTitle('name')}
                {setRadioHeadTitle('sex')}
                {setRadioHeadTitle('born')}
                {setRadioHeadTitle('died')}
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map(person => {
                return (
                  <PersonRow
                    key={person.slug}
                    person={person}
                    columnHighlight={isSortedBy}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )
  );
};
