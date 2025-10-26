/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getSortParams = (sortBy: string) => {
    if (sort && order && sort === sortBy) {
      return { sort: null, order: null };
    }

    if (sort && sort === sortBy) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  };

  const getSortClass = (sortBy: string) => {
    return sort !== sortBy
      ? 'fas fa-sort'
      : order
        ? 'fas fa-sort-down'
        : 'fas fa-sort-up';
  };

  const findPersonByName = (name: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(pers => pers.name === name);
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
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
              <td>
                {!person.motherName && <span>-</span>}

                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <span>{person.motherName}</span>
                )}
              </td>
              <td>
                {!person.fatherName && <span>-</span>}

                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <span>{person.fatherName}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
