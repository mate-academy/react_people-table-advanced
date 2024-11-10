import React, { useEffect, useState } from 'react';
import { Person as PersonType } from '../types';
import { Person } from './Person';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  peopleData: PersonType[] | null;
  sex: string;
  nameSearch: string;
  centuries: string[];
  sort: string;
  direction: string;
};

export const PeopleTable: React.FC<Props> = ({
  peopleData,
  sex,
  nameSearch,
  centuries,
  sort,
  direction,
}) => {
  const { personName } = useParams();
  const [local, setLocal] = useState(peopleData);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const filteredData =
      peopleData?.filter(el => {
        // Fix for correct century calculation
        const numberCentury = el.born ? Math.floor(el.born / 100) + 1 : '';
        const matchesSex = sex ? el.sex === sex : true;
        const matchesName = nameSearch
          ? el.name.toLowerCase().includes(nameSearch.toLowerCase())
          : true;
        const matchCentury =
          centuries.length > 0
            ? centuries.includes(numberCentury.toString())
            : true;

        return matchesSex && matchesName && matchCentury;
      }) || [];

    setLocal(filteredData);
  }, [sex, nameSearch, peopleData, centuries]);

  useEffect(() => {
    if (!peopleData) {
      return;
    }

    const sortedData = [...peopleData].sort((a, b) => {
      let compareValue = 0;

      if (sort === 'name') {
        compareValue = a.name.localeCompare(b.name);
      } else if (sort === 'born') {
        compareValue = (a.born || 0) - (b.born || 0);
      } else if (sort === 'died') {
        compareValue = (a.died || 0) - (b.died || 0);
      } else if (sort === 'sex') {
        compareValue = a.sex.localeCompare(b.sex);
      }

      return direction === 'desc' ? -compareValue : compareValue;
    });

    setLocal(sortedData);
  }, [sort, direction, peopleData]);

  const handleHeaderClick = (header: string) => {
    const params = new URLSearchParams(searchParam);

    if (sort !== header) {
      params.set('sort', header);
      params.delete('direction');
    }

    if (sort === header && direction !== 'desc') {
      params.set('direction', 'desc');
    }

    if (sort === header && direction === 'desc') {
      params.delete('sort');
      params.delete('direction');
    }

    setSearchParam(params);
  };

  const getSortIconClass = (header: string) =>
    classNames('fas', {
      'fa-sort-down': sort === header && direction === 'desc',
      'fa-sort-up': sort === header && !direction,
      'fa-sort': sort !== header,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {local?.length === 0 ? (
        <caption>
          There are no people matching the current search criteria
        </caption>
      ) : (
        <>
          <thead>
            <tr>
              <th>
                <span
                  onClick={() => handleHeaderClick('name')}
                  className="is-flex is-flex-wrap-nowrap"
                >
                  Name
                  <a>
                    <span className="icon">
                      <i className={getSortIconClass('name')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span
                  onClick={() => handleHeaderClick('sex')}
                  className="is-flex is-flex-wrap-nowrap"
                >
                  Sex
                  <a>
                    <span className="icon">
                      <i className={getSortIconClass('sex')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span
                  onClick={() => handleHeaderClick('born')}
                  className="is-flex is-flex-wrap-nowrap"
                >
                  Born
                  <a>
                    <span className="icon">
                      <i className={getSortIconClass('born')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span
                  onClick={() => handleHeaderClick('died')}
                  className="is-flex is-flex-wrap-nowrap"
                >
                  Died
                  <a>
                    <span className="icon">
                      <i className={getSortIconClass('died')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {local?.map(el => {
              const motherData = local.findIndex(m => m.name === el.motherName);
              const fatherData = local.findIndex(f => f.name === el.fatherName);

              const newData = {
                ...el,
                mother: local[motherData],
                father: local[fatherData],
              };

              return <Person key={el.name} data={newData} param={personName} />;
            })}
          </tbody>
        </>
      )}
    </table>
  );
};
