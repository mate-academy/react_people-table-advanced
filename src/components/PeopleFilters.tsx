import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  setFilterPeople: React.Dispatch<React.SetStateAction<Person[]>>;
};

enum SexFilter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}

export const PeopleFilters: React.FC<Props> = ({ setFilterPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // const [sexFilter, setSexFilter] = useState<SexFilter>(SexFilter.All);

  const handleClickSex = (sex: string) => {
    if (sex === '') {
      params.delete('sex');
      setSearchParams(params);

      return;
    }

    params.append('sex', sex);
    setSearchParams(params);
  };

  const applyFilters = () => {
    const filteredPeople = [...people];

    const sex = searchParams.get('sex');
    const centuries = searchParams.get('centuries');
    const query = searchParams.get('query');

    // if (sex) {
    //   filteredPeople = filteredPeople.filter(person => person.sex === sex);
    // }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className="is-active"
          href="#/people"
          onClick={() => handleClickSex('')}
        >
          All
        </a>
        <a
          className=""
          href="#/people?sex=m"
          onClick={() => handleClickSex('m')}
        >
          Male
        </a>
        <a
          className=""
          href="#/people?sex=f"
          onClick={() => handleClickSex('f')}
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
