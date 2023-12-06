import classNames from 'classnames';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { areArraysEqual } from '../utils/areArraysEqual';
import { GlobalContext } from './GeneralContext';
import { Sex } from '../types/Sex';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const {
    people,
    filteredPeople,
    setFilteredPeople,
    searchParams,
    setSearchParams,
  } = useContext(GlobalContext);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || Sex.ALL;

  const isAllCenturiesSelected = centuries.length === 0;

  useEffect(() => {
    let resultOfFiltration = [...people];

    if (query) {
      resultOfFiltration = resultOfFiltration.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex) {
      resultOfFiltration
      = resultOfFiltration.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      const filtrationCopy = [...resultOfFiltration];

      resultOfFiltration = [];

      centuries.forEach(century => {
        resultOfFiltration = resultOfFiltration.concat(
          filtrationCopy.filter(person => person.born < +century * 100
            && person.born >= (+century - 1) * 100),
        );
      });
    }

    if (!areArraysEqual(resultOfFiltration, filteredPeople)) {
      setFilteredPeople(resultOfFiltration);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, query, sex, centuries]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith({ sex: Sex.ALL || null }, searchParams),
          }}
          className={classNames({
            'is-active': sex === Sex.ALL,
          })}
        >
          All
        </Link>

        <Link
          to={{
            search: getSearchWith({ sex: Sex.MALE || null }, searchParams),
          }}
          className={classNames({
            'is-active': sex === Sex.MALE,
          })}
        >
          Male
        </Link>

        <Link
          to={{
            search: getSearchWith({ sex: Sex.FEMALE || null }, searchParams),
          }}
          className={classNames({
            'is-active': sex === Sex.FEMALE,
          })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {centuriesList.map(century => (
              <Link
                key={century}
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(century)
                      ? centuries.filter(newCentury => century !== newCentury)
                      : [...centuries, century],
                  }, searchParams),
                }}
                data-cy="century"
                className={classNames(
                  'button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  },
                )}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith({
                  centuries: null,
                }, searchParams),
              }}
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': !isAllCenturiesSelected,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith({
              query: null,
              centuries: null,
              sex: null,
            }, searchParams),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
