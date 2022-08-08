import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  useParams, useSearchParams,
} from 'react-router-dom';
import { getPeople } from './api';
import { CenturyFilter } from './centuryFilter';
import { PersonRow } from './PersonRow';
import { getSearchWith } from './searchHelper';
import { SearchLink } from './SearchLink';
import { SortLink } from './SortLink';
import { Person } from './types/Person';

export const PeoplePage: React.FC = () => {
  const { personSlug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map(p => ({ ...p }));

      preparedPeople.forEach(person => {
        Object.assign(person, {
          mother: preparedPeople.find(m => m.name === person.motherName),
          father: preparedPeople.find(f => f.name === person.fatherName),
        });
      });
      setPeople(preparedPeople);
    });
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => {
      return Math.ceil(person.born / 100);
    };

    visiblePeople = visiblePeople
      .filter(person => centuries.includes(getCentury(person).toString()));
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(({ name, motherName, fatherName }) => {
      return [name, motherName || '', fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);
        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  return (
    <div className="People">
      <h2 className="People">People page</h2>
      <div className="filter">
        <nav className="panel">
          <p className="panel-heading">
            Filters
          </p>

          <p className="panel-tabs">
            <SearchLink
              params={{ sex: null }}
              className={classNames({ 'is-active': !sex })}
            >
              All
            </SearchLink>

            <SearchLink
              params={{ sex: 'm' }}
              className={classNames({ 'is-active': sex === 'm' })}
            >
              Male
            </SearchLink>

            <SearchLink
              params={{ sex: 'f' }}
              className={classNames({ 'is-active': sex === 'f' })}
            >
              Female
            </SearchLink>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input"
                data-cy="filterInput"
                type="text"
                placeholder="Search"
                value={query}
                onChange={event => setSearchParams(
                  getSearchWith(searchParams,
                    { query: event.target.value || null }),
                )}
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>

          <div className="panel-block is-flex-direction-column">
            <CenturyFilter />
          </div>

          <div className="panel-block">
            <SearchLink
              className="button is-link is-outlined is-fullwidth"
              params={{ sex: null, query: null, centuries: null }}
            >
              Reset all filters
            </SearchLink>
          </div>
        </nav>
      </div>
      <table className="PeopleTable Collapse">
        <thead>
          <tr>
            <th className="thead__bold">
              Name
              <SortLink field="name" />
            </th>
            <th className="thead__bold">
              Sex
              <SortLink field="sex" />
            </th>
            <th className="thead__bold">
              Born
              <SortLink field="born" />
            </th>
            <th className="thead__bold">
              Died
              <SortLink field="died" />
            </th>
            <th className="thead__bold">Mother</th>
            <th className="thead__bold">Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              style={{
                backgroundColor: person.slug === personSlug ? 'aquamarine' : '',
              }}
            >
              <PersonRow
                person={person}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
