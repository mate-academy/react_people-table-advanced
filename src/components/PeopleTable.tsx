import classNames from 'classnames';

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';

type Props = {
  isLoading: boolean;
  dataExists: boolean;
  preparedPeopleData: Person[];
};
/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  isLoading,
  dataExists,
  preparedPeopleData,
}) => {
  const { personId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [clickCount, setClickCount] = useState(0);
  // eslint-disable-next-line
  console.log(clickCount);

  useEffect(() => {
    const sortData = () => {
      const params = new URLSearchParams(searchParams);
      let sortedData = JSON.parse(JSON.stringify(preparedPeopleData));

      if (clickCount === 1) {
        sortedData = sortedData.sort(
          (a: { name: string }, b: { name: string }) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
        params.set('sort', 'name');
      }

      if (clickCount === 2) {
        sortedData = sortedData.sort(
          (a: { name: string }, b: { name: string }) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
        );
        params.set('order', 'desc');
      }

      if (clickCount === 3) {
        params.delete('sort');
        params.delete('order');
      }
      // eslint-disable-next-line
      console.log('sorted' + sortedData.map((p: { name: any }) => p.name));
      // eslint-disable-next-line
      console.log('prep' + preparedPeopleData.map(p => p.name));
      setSearchParams(params.toString());

      return sortedData;
    };

    sortData();
  }, [clickCount, preparedPeopleData, searchParams, setSearchParams]);

  const handleClick = () => {
    setClickCount(prevCount => (prevCount === 3 ? 1 : prevCount + 1));
  };

  const iconClassName = classNames('fas', {
    'fa-sort': clickCount === 0 || clickCount === 3,
    'fa-sort-up': clickCount === 1,
    'fa-sort-down': clickCount === 2,
  });

  // В JSX:
  // <span className="icon" onClick={handleClick}>
  //   <i className="fas fa-sort" />
  // </span>;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!isLoading && (
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <a href="#/people?sort=name">
                  <span className="icon" onClick={handleClick}>
                    <i className={iconClassName} />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <a href="#/people?sort=sex">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <a href="#/people?sort=born&amp;order=desc">
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a href="#/people?sort=died">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      )}

      {dataExists && (
        <tbody>
          {preparedPeopleData.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === personId,
              })}
            >
              <td>
                <SearchLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother && <SearchLink person={person.mother} />}
                {!person.mother && person.motherName && (
                  <span>{person.motherName}</span>
                )}
                {!person.mother && !person.motherName && '-'}
              </td>

              <td>
                {person.father && <SearchLink person={person.father} />}
                {!person.father && person.fatherName && (
                  <span>{person.fatherName}</span>
                )}
                {!person.father && !person.fatherName && '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};
