import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { CenturyBtn } from './CenturyBtn';
import { GenderBtn } from './GenderBtn';
import classNames from 'classnames';

type Props = {
  setFilteredPeople: (val: Person[] | null) => void;
};

const getCentury = (born: number) => {
  return Math.ceil(born / 100);
};

export const PeopleFilters: React.FC<Props> = ({ setFilteredPeople }) => {
  const context = useContext(AppContext);
  const { people, searchParams, setSearchParams } = context;
  const { pathname } = useLocation();

  useEffect(() => {
    if (people) {
      const sex = searchParams.get('sex') || '';
      const query = searchParams.get('query') || '';
      const centuries = searchParams.getAll('centuries') || '';
      const filteredPeople = [...people]
        .filter(person => (!sex ? person : person.sex === sex))
        .filter(person =>
          !query
            ? person
            : person.name.toLowerCase().includes(query.toLowerCase()),
        )
        .filter(person => {
          if (!centuries.length) {
            return person;
          } else {
            const centuryWasBorn = `${getCentury(person.born)}`;

            return centuries.includes(centuryWasBorn);
          }
        });

      setFilteredPeople(filteredPeople);
    }
  }, [people, searchParams, setFilteredPeople]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const search = e.target.value;

    if (search.length) {
      params.set('query', search);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleDeleteCenturies(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function handleResetAllFilters(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map((type, index) => (
          <GenderBtn filter={type} key={index} />
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={e => handleSearchChange(e)}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century, index) => (
              <CenturyBtn century={century} key={index} />
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              onClick={e => handleDeleteCenturies(e)}
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !searchParams.getAll('centuries').length,
                'is-outlined': searchParams.getAll('centuries').length,
              })}
              to={{
                pathname,
                search: searchParams.toString(),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={e => handleResetAllFilters(e)}
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname,
            search: searchParams.toString(),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
