import { useSearchParams } from 'react-router-dom';
import { FilterSexType } from '../types/Sex';
import { Person } from '../types';
import { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  people: Person[];
  setPeopleUsed: (person: Person[]) => void;
  peopleUsed: Person[];
};

function filterPeople(
  people: Person[],
  query: string,
  centuriesSelected: string[],
  sexSelected: string | null,
) {
  return people
    .filter(person => {
      if (!sexSelected || sexSelected === 'all') {
        return true;
      }

      return person.sex === sexSelected;
    })
    .filter(person => {
      if (centuriesSelected.length === 0) {
        return true;
      }

      const personCentury = Math.floor(person.born / 100) + 1;

      return centuriesSelected.includes(String(personCentury));
    })
    .filter(person => {
      if (!query) {
        return true;
      }

      return (
        person.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
      );
    });
}

export const PeopleFilters = ({ people, setPeopleUsed, peopleUsed }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || null;

  useEffect(() => {
    const filteredPeople = filterPeople(people, query, centuries, sex);

    if (JSON.stringify(filteredPeople) !== JSON.stringify(peopleUsed)) {
      setPeopleUsed(filteredPeople);
    }
  }, [sex, query, centuries]);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    // setQuery(event.target.value);
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexChange(sexType: FilterSexType) {
    const params = new URLSearchParams(searchParams);

    if (sexType !== 'all') {
      params.set('sex', sexType);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(century: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      params.delete('centuries');
      currentCenturies.forEach(c => {
        if (c !== century) {
          params.append('centuries', c);
        }
      });
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': !sex,
          })}
          // className="is-active"
          onClick={() => handleSexChange(FilterSexType.All)}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={() => handleSexChange(FilterSexType.Male)}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={() => handleSexChange(FilterSexType.Female)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={event => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => handleCenturiesChange('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => handleCenturiesChange('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => handleCenturiesChange('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => handleCenturiesChange('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => handleCenturiesChange('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
