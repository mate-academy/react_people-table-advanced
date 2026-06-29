import React, { useEffect } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  peoples: Person[];
  onFilter: (persons: Person[]) => void;
};

export const PeopleFilters: React.FC<Props> = ({ peoples, onFilter }) => {
  const [serchParams, setSerchParams] = useSearchParams();
  const query = serchParams.get('query') || '';
  const centuries = serchParams.getAll('centuries') || [];
  const sex = serchParams.get('sex') || '';

  function hangeChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(serchParams);
    const trueQuery = event.target.value.trim();

    if (!trueQuery) {
      params.delete('query');
    } else {
      params.set('query', event.target.value.trim());
    }

    setSerchParams(params);
  }

  function hangeChangeSex(sexe: string) {
    const params = new URLSearchParams(serchParams);

    params.set('sex', sexe);
    setSerchParams(params);
  }

  function hangeChangeAges(n: string) {
    const params = new URLSearchParams(serchParams);

    if (n === 'All') {
      params.delete('centuries');

      return setSerchParams(params);
    }

    const newCenturies = centuries.includes(n)
      ? centuries.filter(centurie => centurie !== n)
      : [...centuries, n];

    params.delete('centuries');
    newCenturies.forEach(ages => params.append('centuries', ages));

    return setSerchParams(params);
  }

  const handleClearAll = () => {
    const params = new URLSearchParams(serchParams);

    params.delete('centuries');
    params.delete('query');
    params.delete('sex');
    setSerchParams(params);

    return;
  };

  useEffect(() => {
    let filtered = [...peoples];

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (query.trim()) {
      filtered = filtered.filter(
        person =>
          person.name
            .toLowerCase()
            .trim()
            .includes(query.trim().toLowerCase()) ||
          person.fatherName
            ?.toLowerCase()
            .trim()
            .includes(query.trim().toLowerCase()) ||
          person.motherName
            ?.trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      );
    }

    onFilter(filtered);
  }, [peoples, serchParams, sex, query, onFilter]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn(sex === '' ? 'is-active' : '')}
          onClick={() => hangeChangeSex('')}
        >
          All
        </a>
        <a
          className={cn(sex === 'm' ? 'is-active' : '')}
          onClick={() => hangeChangeSex('m')}
        >
          Male
        </a>
        <a
          className={cn(sex === 'f' ? 'is-active' : '')}
          onClick={() => hangeChangeSex('f')}
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
            value={query}
            onChange={event => hangeChangeQuery(event)}
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
              className={cn(
                'button mr-1',
                centuries.includes('16') ? 'is-info' : '',
              )}
              onClick={() => hangeChangeAges('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={cn(
                'button mr-1',
                centuries.includes('17') ? 'is-info' : '',
              )}
              onClick={() => hangeChangeAges('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={cn(
                'button mr-1',
                centuries.includes('18') ? 'is-info' : '',
              )}
              onClick={() => hangeChangeAges('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={cn(
                'button mr-1',
                centuries.includes('19') ? 'is-info' : '',
              )}
              onClick={() => hangeChangeAges('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={cn(
                'button mr-1',
                centuries.includes('20') ? 'is-info' : '',
              )}
              onClick={() => hangeChangeAges('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                centuries.length !== 0 ? 'is-outlined' : '',
              )}
              onClick={() => hangeChangeAges('All')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className={cn(
            'button  is-link is-fullwidth',
            serchParams.size !== 0 ? 'is-outlined' : '',
          )}
          onClick={handleClearAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
