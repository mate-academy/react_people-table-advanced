import { useSearchParams } from 'react-router-dom';
import { Person, Sort } from '../types';
import { PersonInfo } from './PersonInfo';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sortName = searchParams.get('sort');

  function handleSort(newSortName: string) {
    const params = new URLSearchParams(searchParams);
    const isCurrentSort = sortName === newSortName;

    if (isCurrentSort && !order) {
      params.set('order', 'desc');
    } else if (isCurrentSort && order) {
      params.delete('order');
      params.delete('sort');
    } else {
      params.set('sort', newSortName);
    }

    setSearchParams(params);
  }

  const getSortIconClass = (columnName: string) => {
    const isCurrentSort = sortName === columnName;

    return classNames('fas', {
      'fa-sort': !sortName || !isCurrentSort,
      'fa-sort-up': isCurrentSort && !order,
      'fa-sort-down': isCurrentSort && order,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href={`#/people?${searchParams}`}
                onClick={() => handleSort(Sort.Name)}
              >
                <span className="icon">
                  <i className={getSortIconClass(Sort.Name)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={`#/people?${searchParams}`}
                onClick={() => handleSort(Sort.Sex)}
              >
                <span className="icon">
                  <i className={getSortIconClass(Sort.Sex)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={`#/people?${searchParams}`}
                onClick={() => handleSort(Sort.Born)}
              >
                <span className="icon">
                  <i className={getSortIconClass(Sort.Born)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href={`#/people?${searchParams}`}
                onClick={() => handleSort(Sort.Died)}
              >
                <span className="icon">
                  <i className={getSortIconClass(Sort.Died)} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
