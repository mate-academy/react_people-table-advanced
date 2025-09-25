/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortParams = ['Name', 'Sex', 'Born', 'Died'];

  const filteredPeople = useMemo(() => {
    let result = [...people];

    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    const query = searchParams.get('query')?.trim().toLowerCase();

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          (person.motherName || '').toLowerCase().includes(query) ||
          (person.fatherName || '').toLowerCase().includes(query),
      );
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length) {
      result = result.filter(person => {
        const centuryOfBirth = Math.ceil(person.born / 100);
        const centuryOfDeath = Math.ceil(person.died / 100);

        return (
          centuries.includes(centuryOfBirth.toString()) ||
          centuries.includes(centuryOfDeath.toString())
        );
      });
    }

    const sort = searchParams.get('sort');

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'name':
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          case 'sex':
            return a.sex.toLowerCase().localeCompare(b.sex.toLowerCase());
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;

          default:
            return 0;
        }
      });
    }

    const order = searchParams.get('order');

    if (order === 'desc') {
      result.reverse();
    }

    return result;
  }, [people, searchParams]);

  const renderPersonByName = (personName: string | null) => {
    const foundPerson = filteredPeople.find(
      person => person.name === personName,
    );

    return foundPerson ? (
      <PersonLink person={foundPerson} />
    ) : (
      personName || '-'
    );
  };

  const getSortParam = (newParam: string): SearchParams => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (!sort || sort !== newParam) {
      return { sort: newParam, order: null };
    }

    if (sort === newParam && !order) {
      return { sort: newParam, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortParams.map(param => (
            <th key={param}>
              <span className="is-flex is-flex-wrap-nowrap">
                {param}
                <SearchLink params={getSortParam(param.toLowerCase())}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonByName(person.motherName)}</td>
            <td>{renderPersonByName(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
