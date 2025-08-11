import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

interface Props {
  fullPeopleList: Person[];
  setFilteredPeopleList: React.Dispatch<React.SetStateAction<Person[]>>;
}

function filterListaByParams(params: URLSearchParams, list: Person[]) {
  let filterParam: string | string[] | null = params.get('sex');
  let filteredList: Person[] = list;

  if (filterParam) {
    filteredList = list.filter(e => e.sex === filterParam);
  }

  filterParam = params.getAll('ct');
  if (filterParam.length > 0) {
    filteredList = filteredList.filter(e => {
      const century = Math.ceil(e.born / 100).toString();

      return filterParam?.includes(century);
    });
  }

  filterParam = params.get('query');
  if (filterParam) {
    filteredList = filteredList.filter(e => {
      return e.name.includes(String(filterParam));
    });
  }

  return filteredList;
}

export const PeopleFilters: React.FC<Props> = ({
  fullPeopleList,
  setFilteredPeopleList,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sexLinkM, setSexLinkM] = useState('');
  const [sexLinkF, setSexLinkF] = useState('');
  const [noSexLink, setNoSexLink] = useState('');
  const { personSlug } = useParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams(searchParams);

    param.set('query', event.target.value);
    setSearchParams(param);
  };

  const handleCenturyChange = (ct: string) => {
    return () => {
      if (ct === 'all') {
        searchParams.delete('ct');
        setSearchParams(searchParams);

        return;
      }

      const actualCt = searchParams.getAll('ct');
      const param = new URLSearchParams(searchParams);

      if (actualCt.includes(ct)) {
        const newValues = actualCt.filter(e => e !== ct);

        param.delete('ct');
        newValues.forEach(e => param.append('ct', e));
      } else {
        param.append('ct', ct);
      }

      setSearchParams(param);
    };
  };

  useEffect(() => {
    const sexParam = new URLSearchParams(searchParams);

    sexParam.set('sex', 'm');
    setSexLinkM(sexParam.toString());
    sexParam.set('sex', 'f');
    setSexLinkF(sexParam.toString());
    sexParam.delete('sex');
    setNoSexLink(sexParam.toString());

    const filtered = filterListaByParams(searchParams, fullPeopleList);

    setFilteredPeopleList(filtered);
  }, [searchParams]);

  return (
    <nav className="panel">
      <span>Search Params: {searchParams.toString()}</span>

      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${searchParams.get('sex') || 'is-active'}`}
          href={`#/people/${personSlug}?${noSexLink}`}
        >
          All
        </a>
        <a
          className={`${searchParams.get('sex') === 'm' && 'is-active'}`}
          href={`#/people/${personSlug}?${sexLinkM}`}
        >
          Male
        </a>
        <a
          className={`${searchParams.get('sex') === 'f' && 'is-active'}`}
          href={`#/people/${personSlug}?${sexLinkF}`}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('ct').includes('16') && 'is-info'}`}
              onClick={handleCenturyChange('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('ct').includes('17') && 'is-info'}`}
              onClick={handleCenturyChange('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('ct').includes('18') && 'is-info'}`}
              onClick={handleCenturyChange('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('ct').includes('19') && 'is-info'}`}
              onClick={handleCenturyChange('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('ct').includes('20') && 'is-info'}`}
              onClick={handleCenturyChange('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button is-success ${searchParams.getAll('ct').length && 'is-outlined'}`}
              onClick={handleCenturyChange('all')}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people/noPeople"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
