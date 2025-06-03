/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../Person/Person';
import { useCallback, useContext } from 'react';
import { PeopleContext } from '../../storage/PeopleContext';
import { text } from '../../constants/text';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable = () => {
  const context = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const activeSort = searchParams.get('sort') ?? '';
  const activeOrder = searchParams.get('order');

  const isNameSort = activeSort === 'name';
  const isSexSort = activeSort === 'sex';
  const isBornSort = activeSort === 'born';
  const isDiedSort = activeSort === 'died';
  const isDesc = activeOrder === 'desc';

  if (!context) {
    throw new Error('context does not exist');
  }

  const { state } = context;

  const getLinkBySort = useCallback(
    ({
      value,
      currentSort,
      currentDesc,
    }: {
      value: string;
      currentSort: string;
      currentDesc: boolean;
    }) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (currentSort !== value) {
        newSearchParams.delete('sort');
        newSearchParams.append('sort', value);
      } else if (currentSort === value && !currentDesc) {
        newSearchParams.append('order', 'desc');
      } else {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {text.name}
              <Link
                to={`/people?${getLinkBySort({ value: 'name', currentSort: activeSort, currentDesc: isDesc })}`}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !isNameSort,
                      'fa-sort-up': isNameSort && !isDesc,
                      'fa-sort-down': isNameSort && isDesc,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {text.sex}
              <Link
                to={`/people?${getLinkBySort({ value: 'sex', currentSort: activeSort, currentDesc: isDesc })}`}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !isSexSort,
                      'fa-sort-up': isSexSort && !isDesc,
                      'fa-sort-down': isSexSort && isDesc,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {text.born}
              <Link
                to={`/people?${getLinkBySort({ value: 'born', currentSort: activeSort, currentDesc: isDesc })}`}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !isBornSort,
                      'fa-sort-up': isBornSort && !isDesc,
                      'fa-sort-down': isBornSort && isDesc,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {text.died}
              <Link
                to={`/people?${getLinkBySort({ value: 'died', currentSort: activeSort, currentDesc: isDesc })}`}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !isDiedSort,
                      'fa-sort-up': isDiedSort && !isDesc,
                      'fa-sort-down': isDiedSort && isDesc,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>{text.mother}</th>
          <th>{text.father}</th>
        </tr>
      </thead>

      <tbody>
        {state.sortedAndFilteredPeople.map(person => {
          const { name, sex, born, died, fatherName, motherName, slug } =
            person;

          return (
            <Person
              key={slug}
              name={name}
              sex={sex}
              born={born}
              died={died}
              fatherName={fatherName}
              motherName={motherName}
              slug={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
