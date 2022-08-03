import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { Person } from '../../types/Person';
import { getSearchWith } from '../../utils/searchWith';

type Props = {
  setSearchParams: any,
  searchParams: URLSearchParams,
  filterPeople: (people: Person[]) => void,
  people: Person[],
};

export const PeopleFilter: React.FC<Props> = ({
  filterPeople,
  people,
  setSearchParams,
  searchParams,
}) => {
  const sex = searchParams.get('sex');
  const century = searchParams.get('century');
  const query = searchParams.get('query') || '';
  const [localQuery, setLocalQuery] = useState('');

  const visiblePeople = people
    .filter(person => {
      const normalizeName = person.name.toLowerCase();
      const normalizeFatherName = person.fatherName?.toLowerCase();
      const normalizeMotherName = person.motherName?.toLowerCase();

      const normalizeQuery = query.toLowerCase();

      const personSex = sex ? person.sex === sex : true;

      const personCentury = century
        ? String(person.born + 100).slice(0, 2) === century
        : true;

      return (
        normalizeName.includes(normalizeQuery)
        && personSex
        && personCentury)
        || (
          normalizeFatherName
          && normalizeFatherName.includes(normalizeQuery)
          && personSex
          && personCentury
        )
        || (
          normalizeMotherName
          && normalizeMotherName.includes(normalizeQuery)
          && personSex
          && personCentury
        );
    });

  useEffect(() => {
    filterPeople(visiblePeople);
  }, [JSON.stringify(visiblePeople)]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith({ query: event.target.value }, searchParams),
    );
  };

  const debouncedChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalQuery(event.target.value);

      (debounce(() => {
        changeHandler(event);
      }, 500))();
    },
    [],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs">
        <Link
          className={classNames({
            'is-active': !sex,
          })}
          to={{
            search: getSearchWith({ sex: '' }, searchParams),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={localQuery}
            onChange={debouncedChangeHandler}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block is-flex-direction-column">
        <div className="buttons is-justify-content-center">
          <button
            type="button"
            className="button"
            onClick={() => setSearchParams(
              getSearchWith({ century: '16' }, searchParams),
            )}
          >
            16
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setSearchParams(
              getSearchWith({ century: '17' }, searchParams),
            )}
          >
            17
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setSearchParams(
              getSearchWith({ century: '18' }, searchParams),
            )}
          >
            18
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setSearchParams(
              getSearchWith({ century: '19' }, searchParams),
            )}
          >
            19
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setSearchParams(
              getSearchWith({ century: '20' }, searchParams),
            )}
          >
            20
          </button>
          <button
            type="button"
            className="button is-success"
            onClick={() => setSearchParams(
              getSearchWith({ century: '' }, searchParams),
            )}
          >
            Show All
          </button>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSearchParams(
              getSearchWith({
                sex: '',
                query: '',
                century: '',
              }, searchParams),
            );
            setLocalQuery('');
          }}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
