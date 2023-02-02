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
  const query = searchParams.get('query') || '';

  const testPersonByQuery = (person: Person) => {
    const queryCaseIns = RegExp(query, 'i');

    return queryCaseIns.test(person.name)
    || queryCaseIns.test(person.motherName || '')
    || queryCaseIns.test(person.fatherName || '');
  };

  const getFilteredPeople = (sex: Sex | null) => (
    people.filter(person => (
      (sex ? person.sex === sex : true)
      && testPersonByQuery(person)
    ))
  );

  const filterBySex = (sex: Sex | null) => () => {
    const filteredPeople = getFilteredPeople(sex);

    if (!sex) {
      searchParams.delete('sex');
      setSearchParams(searchParams);
      setPeople(filteredPeople);

      return;
    }

    searchParams.set('sex', sex);
    setSearchParams(searchParams);
    setPeople(filteredPeople);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sex = searchParams.get('sex') as Sex | null;
    const filteredPeople = getFilteredPeople(sex);

    if (!e.target.value) {
      searchParams.delete('query');
      setSearchParams(searchParams);
      setPeople(filteredPeople);

      return;
    }

    searchParams.set('query', e.target.value);
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
          onMouseDown={filterBySex(null)}
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
            value={query}
            onChange={handleQuery}
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
