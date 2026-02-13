import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visiblePeoples: Person[];
};

const SORT_FIELD: Array<keyof Person> = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ visiblePeoples }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (key: keyof Person) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== key) {
      newParams.set('sort', key);
    } else if (order !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('order');
      newParams.delete('sort');
    }

    const query = newParams.toString();

    return query ? `?${query}` : '';
  };

  return (
    <>
      {visiblePeoples.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {SORT_FIELD.map(name => {
                return (
                  <th key={name}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {name[0].toUpperCase() + name.slice(1)}
                      <Link to={handleSort(name)}>
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== name,
                              'fa-sort-up': sort === name && order !== 'desc',
                              'fa-sort-down': sort === name && order === 'desc',
                            })}
                          />
                        </span>
                      </Link>
                    </span>
                  </th>
                );
              })}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeoples.map(person => {
              const mother = visiblePeoples.find(
                p => p.name === person.motherName,
              );
              const father = visiblePeoples.find(
                p => p.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
                  key={person.slug}
                >
                  <td>
                    <PersonLink person={person} nameFallBack={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    <PersonLink
                      person={mother}
                      nameFallBack={person.motherName}
                    />
                  </td>

                  <td>
                    <PersonLink
                      person={father}
                      nameFallBack={person.fatherName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
