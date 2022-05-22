import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import { PeopleContext } from '../../hoc/PeopleProvider';
import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(PeopleContext);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const appliedQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(appliedQuery);
  const sorteringCol = ['Name', 'Sex', 'Born', 'Died'];

  const getVisible = () => {
    return people
      ? people.filter(person => person.name.toLowerCase().includes(appliedQuery)
        || person.motherName?.toLowerCase().includes(appliedQuery)
        || person.fatherName?.toLowerCase().includes(appliedQuery))
      : [];
  };

  const visiblePeople = useMemo(
    getVisible,
    [people, appliedQuery],
  );

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery.toLowerCase());
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSort = (param: string) => {
    searchParams.set('sortBy', param);
    searchParams.set('sortOrder', sortOrder !== 'asc' ? 'asc' : 'desc');

    navigate(`?${searchParams.toString()}`, { replace: true });

    visiblePeople.sort((fPer, sPer) => {
      switch (param) {
        case 'name':
        case 'sex':
          switch (sortOrder) {
            case 'asc':
              return sPer[param].localeCompare(fPer[param]);
            default:
              return fPer[param].localeCompare(sPer[param]);
          }

        case 'born':
        case 'died':
          switch (sortOrder) {
            case 'asc':
              return sPer[param] - (fPer[param]);
            default:
              return fPer[param] - (sPer[param]);
          }

        default:
          return 0;
      }
    });
  };

  const mother = (person: People) => {
    return visiblePeople.find(mam => mam.name === person.motherName) || null;
  };

  const father = (person: People) => {
    return visiblePeople.find(dad => dad.name === person.fatherName) || null;
  };

  return (
    <>
      <div className="field is-grouped is-justify-content-space-between">
        <p
          className="control has-icons-left"
          style={{ width: '50%' }}
        >
          <input
            type="search"
            value={query}
            placeholder="Person I'm looking for"
            className="input"
            onChange={handleQueryChange}
            style={{ width: '100%' }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>

        <div className="buttons">
          <Link
            to="/people/new"
            className="button is-link"
          >
            Add Person
          </Link>
        </div>
      </div>

      <table className="table is-hoverable is-striped is-fullwidth PeopleTable">
        <thead>
          <tr className="has-background-white-ter">
            {sorteringCol.map(col => (
              <th
                key={col}
                className={classNames(
                  'table__sort p-1',
                  {
                    'table__sort--asc': sortOrder === 'asc'
                      && sortBy === col.toLowerCase(),
                    'table__sort--desc': sortOrder === 'desc'
                      && sortBy === col.toLowerCase(),
                    'has-background-link-light': sortBy === col.toLowerCase(),
                  },
                )}
                onClick={() => handleSort(col.toLowerCase())}
              >
                {col}
              </th>
            ))}
            <th className="p-1">Mother</th>
            <th className="p-1">Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              id={person.slug}
              className={classNames(
                'Person',
                { 'has-background-grey-lighter': person.slug === slug },
              )}
            >
              <PersonRow
                person={person}
                mother={mother(person)}
                father={father(person)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
