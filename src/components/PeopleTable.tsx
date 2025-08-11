import classNames from 'classnames';
import { Person } from '../types';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
  errorMessage: boolean;
}

export const PeopleTable: React.FC<Props> = ({ people, errorMessage }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const findPeople = (curentNeme: string | null) => {
    const parent = people?.find(person => person.name === curentNeme);

    if (parent) {
      return <PersonLink parent={parent} />;
    }

    return curentNeme || '-';
  };

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handlParams = (column: string) => {
    const curentColumn = column.toLocaleLowerCase();

    if (!sort) {
      return {
        sort: curentColumn,
        order: null,
      };
    }

    if (sort && !order) {
      return {
        sort: curentColumn,
        order: 'desc',
      };
    } else {
      return {
        sort: null,
        order: null,
      };
    }
  };

  const sortedPeople = useMemo(() => {
    const copyPeople = [...people];

    switch (sort) {
      case 'name':
        copyPeople.sort((person1, person2) =>
          person1.name.localeCompare(person2.name),
        );
        break;
      case 'sex':
        copyPeople.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;
      case 'born':
        copyPeople.sort((person1, person2) => person1.born - person2.born);
        break;
      case 'died':
        copyPeople.sort((person1, person2) => person1.died - person2.died);
        break;
      default:
        break;
    }

    if (order) {
      copyPeople.reverse();
    }

    return copyPeople;
  }, [order, people, sort]);

  if (people.length === 0 && !errorMessage) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people matching the current search criteria
      </p>
    );
  } else {
    return (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['Name', 'Sex', 'Born', 'Died'].map(column => {
              return (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}
                    <SearchLink params={handlParams(column)}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': !sort && !order,
                            'fa-sort-up': sort && !order,
                            'fa-sort-down': sort && order,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              );
            })}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople?.map(person => {
            const { name, sex, born, died, motherName, fatherName } = person;

            return (
              <tr
                data-cy="person"
                key={name}
                className={classNames({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={classNames({
                      'has-text-danger': sex === 'f',
                    })}
                  >
                    {name}
                  </NavLink>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>

                <td>{findPeople(motherName)}</td>

                <td>{findPeople(fatherName)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
