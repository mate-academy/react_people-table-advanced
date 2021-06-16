import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRow } from './TableRow';
import { personProps } from './personProps';

export const Table = React.memo(
  ({ people, selectedSlug }) => {
    const sortByName = () => {
      if (sortOrder === 'desc') {
        return [...people].sort((prevPerson, currentPerson) => (
          currentPerson.name.localeCompare(prevPerson.name)
        ));
      }

      return [...people].sort((prevPerson, currentPerson) => (
        prevPerson.name.localeCompare(currentPerson.name)
      ));
    };

    const sortBySex = () => {
      if (sortOrder === 'desc') {
        return [...people].sort((prevPerson, currentPerson) => (
          currentPerson.sex.localeCompare(prevPerson.sex)
        ));
      }

      return [...people].sort((prevPerson, currentPerson) => (
        prevPerson.sex.localeCompare(currentPerson.sex)
      ));
    };

    const sortByBorn = () => {
      if (sortOrder === 'desc') {
        return [...people].sort((prevPerson, currentPerson) => (
          currentPerson.born - prevPerson.born
        ));
      }

      return [...people].sort((prevPerson, currentPerson) => (
        prevPerson.born - currentPerson.born
      ));
    };

    const sortByDied = () => {
      if (sortOrder === 'desc') {
        return [...people].sort((prevPerson, currentPerson) => (
          currentPerson.died - prevPerson.died
        ));
      }

      return [...people].sort((prevPerson, currentPerson) => (
        prevPerson.died - currentPerson.died
      ));
    };

    const addParents = array => (
      [...array].map((person) => {
        const father = array.find(human => human.name === person.fatherName);
        const mother = array.find(human => human.name === person.motherName);

        return {
          ...person,
          father,
          mother,
        };
      })
    );

    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sorting = searchParams.get('sortBy') || '';
    const sortOrder = searchParams.get('sortOrder') || '';

    const handleSort = (value) => {
      searchParams.set('sortBy', value);
      searchParams.set('sortOrder', 'asc');

      if (value === sorting) {
        switch (sortOrder) {
          case 'asc':
            searchParams.set('sortOrder', 'desc');
            break;

          case 'desc':
            searchParams.delete('sortBy');
            searchParams.delete('sortOrder');
            break;

          default:
            searchParams.set('sortOrder', 'asc');
        }
      }

      return history.push({ search: `${searchParams.toString()}` });
    };

    const prepareSortedList = () => {
      switch (sorting) {
        case 'name':
          return sortByName();

        case 'sex':
          return sortBySex();

        case 'born':
          return sortByBorn();

        case 'died':
          return sortByDied();

        default:
          return people;
      }
    };

    const visiblePeople = addParents(prepareSortedList());

    return (
      <table className="people-section__table">
        <thead className="people-section__table-head">
          <tr className="people-section__table-head-row">
            <th
              className="people-section__table-subtitle"
              onClick={() => handleSort('name')}
            >
              Name
              <span
                className={classNames(
                  'people-section__table-sort-icon',
                  {
                    'people-section__table-sort-icon--asc-sort':
                      sorting === 'name' && sortOrder === 'asc',

                    'people-section__table-sort-icon--desc-sort':
                      sorting === 'name' && sortOrder === 'desc',
                  },
                )}
              />
            </th>
            <th
              className="people-section__table-subtitle"
              onClick={() => handleSort('sex')}
            >
              Sex
              <span
                className={classNames(
                  'people-section__table-sort-icon',
                  {
                    'people-section__table-sort-icon--asc-sort':
                      sorting === 'sex' && sortOrder === 'asc',

                    'people-section__table-sort-icon--desc-sort':
                      sorting === 'sex' && sortOrder === 'desc',
                  },
                )}
              />
            </th>
            <th
              className="people-section__table-subtitle"
              onClick={() => handleSort('born')}
            >
              Born
              <span
                className={classNames(
                  'people-section__table-sort-icon',
                  {
                    'people-section__table-sort-icon--asc-sort':
                      sorting === 'born' && sortOrder === 'asc',

                    'people-section__table-sort-icon--desc-sort':
                      sorting === 'born' && sortOrder === 'desc',
                  },
                )}
              />
            </th>
            <th
              className="people-section__table-subtitle"
              onClick={() => handleSort('died')}
            >
              Died
              <span
                className={classNames(
                  'people-section__table-sort-icon',
                  {
                    'people-section__table-sort-icon--asc-sort':
                      sorting === 'died' && sortOrder === 'asc',

                    'people-section__table-sort-icon--desc-sort':
                      sorting === 'died' && sortOrder === 'desc',
                  },
                )}
              />
            </th>
            <th className="people-section__table-subtitle">
              Father
            </th>
            <th className="people-section__table-subtitle">
              Mother
            </th>
          </tr>
        </thead>

        <tbody className="people-section__table-body">
          {visiblePeople.length !== 0 && visiblePeople.map((person, index) => (
            <TableRow
              key={person.slug}
              person={person}
              selectedSlug={selectedSlug || 'not assigned'}
              isEven={(index % 2) === 0}
            />
          ))}
        </tbody>
      </table>
    );
  },
);

Table.propTypes = {
  people: PropTypes.arrayOf(
    personProps,
  ),
  selectedSlug: PropTypes.string,
};

Table.defaultProps = {
  people: [],
  selectedSlug: '',
};
