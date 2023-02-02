import cn from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[]
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
};

type Sex = 'm' | 'f';

export const PeopleFilters = ({ people, setPeople }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const filterBySex = (sex?: Sex) => () => {
    if (!sex) {
      searchParams.delete('sex');
      setSearchParams(searchParams);
      setPeople(people);

      return;
    }

    const filteredPeople = people.filter(person => (
      person.sex === sex
    ));

    searchParams.set('sex', sex);
    setSearchParams(searchParams);

    setPeople(filteredPeople);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !search.includes('sex') })}
          to={`/people${search}`}
          onMouseDown={filterBySex()}
        >
          All
        </Link>

        {(['m', 'f'] as Sex[]).map(sex => (
          <Link
            key={sex}
            className={cn({ 'is-active': searchParams.get('sex') === sex })}
            to={`/people${search}`}
            onMouseDown={filterBySex(sex)}
          >
            {sex === 'm' ? 'Male' : 'Female'}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
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
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
