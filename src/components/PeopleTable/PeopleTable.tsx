import React, { useContext } from 'react';
import { PeopleContext } from '../../Context';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SortValues } from '../../enums/SortValues';

export const PeopleTable: React.FC = () => {
  const {
    searchParams,
    pathname,
    people,
    filteredPeople,
    sortParam,
    orderParam,
    sortHandler,
  } = useContext(PeopleContext);

  // #region functions

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const sexColor = (sex: string) => {
    return classNames({ 'has-text-danger': sex === 'f' });
  };

  // #endregion
  // #region getParents

  const getMother = (_motherName: string | null) => {
    const mother = people.find(_person => _motherName === _person.name);

    if (mother) {
      const { slug, name } = mother;

      return (
        <Link
          className="has-text-danger"
          to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
        >
          {name}
        </Link>
      );
    }

    return _motherName || '-';
  };

  const getFather = (_fatherName: string | null) => {
    const father = people.find(_person => _fatherName === _person.name);

    if (father) {
      const { slug, name } = father;

      return (
        <Link
          to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
        >
          {name}
        </Link>
      );
    }

    return _fatherName || '-';
  };

  // #endregion

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortValues).map(value => {
            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalize(value)}
                  <a onClick={() => sortHandler(value)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortParam !== value,
                          'fa-sort-up':
                            sortParam === value && orderParam === null,
                          'fa-sort-down':
                            sortParam === value && orderParam === 'desc',
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      {/* filteredPeople */}
      <>
        <tbody>
          {filteredPeople.map(person => {
            const { name, sex, born, died, motherName, fatherName, slug } =
              person;

            return (
              <tr
                key={slug}
                className={classNames({
                  'has-background-warning': pathname === `/people/${slug}`,
                })}
                data-cy="person"
              >
                <td>
                  <Link
                    className={sexColor(sex)}
                    to={{
                      pathname: `/people/${slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{getMother(motherName)}</td>
                <td>{getFather(fatherName)}</td>
              </tr>
            );
          })}
        </tbody>
      </>
    </table>
  );
};
