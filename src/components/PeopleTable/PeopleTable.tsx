import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { headers } from '../../utils/headers';

type Props = {
  people: Person[]
  selectedPerson: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const activePerson = people.find(
    person => person.slug === selectedPerson,
  );

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const personsGender = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filter = () => {
    return [...people].filter(({
      sex, name, fatherName, motherName, born,
    }) => {
      const century = (born + 100).toString().slice(0, 2);
      const isName = name.toLocaleLowerCase().includes(
        query.toLocaleLowerCase(),
      );
      const isFatcherName = fatherName?.toLocaleLowerCase().includes(
        query.toLocaleLowerCase(),
      );
      const isMotherName = motherName?.toLocaleLowerCase().includes(
        query.toLocaleLowerCase(),
      );

      if (personsGender) {
        return sex === personsGender;
      }

      if (query) {
        return isName || isFatcherName || isMotherName;
      }

      if (centuries.length) {
        return centuries.includes(century);
      }

      return [...people];
    });
  };

  const visiblePeople = useMemo(() => {
    return filter().sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return order
            ? person2.name.localeCompare(person1.name)
            : person1.name.localeCompare(person2.name);
        case 'sex':
          return order
            ? person2.sex.localeCompare(person1.sex)
            : person1.sex.localeCompare(person2.sex);
        case 'born':
          return order
            ? person2.born - person1.born
            : person1.born - person2.born;
        case 'died':
          return order
            ? person2.died - person1.died
            : person1.died - person2.died;
        default:
          return 0;
      }
    });
  }, [sort, order, personsGender, centuries, query]);

  const getPersonByParent = useCallback((personsParent: string | null) => {
    return visiblePeople.find(person => person.name === personsParent);
  }, [visiblePeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(header => (
            <th
              key={header}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {[
                  header[0].toUpperCase(), ...header.split('').slice(1),
                ].join('')}
                {sort !== header && (
                  <SearchLink params={{ sort: header }}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                )}

                {sort === header && !order && (
                  <SearchLink params={{ order: 'desc' }}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </SearchLink>
                )}

                {sort === header && order && (
                  <SearchLink params={{ sort: null, order: null }}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </SearchLink>
                )}

              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(({
          name, sex, born, died, motherName, fatherName, slug,
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': slug === activePerson?.slug,
            })}
          >
            <td>
              <Link
                className={classNames({
                  'has-text-danger': sex === 'f',
                })}
                to={`/people/${slug}`}
              >
                {name}
              </Link>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <PersonLink
              parent={motherName}
              getPersonByParent={getPersonByParent}
            />

            <PersonLink
              parent={fatherName}
              getPersonByParent={getPersonByParent}
            />
          </tr>
        ))}

      </tbody>
    </table>
  );
};
