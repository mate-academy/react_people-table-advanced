import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
  activeSlug?: string;
}

export const PeopleTable = ({ people, activeSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(sortParam: string) {
    const params = new URLSearchParams(searchParams);

    if (params.get('sort') === sortParam && params.get('order') === 'desc') {
      params.delete('sort');
      params.delete('order');
      setSearchParams(params);

      return;
    }

    if (params.get('sort') === sortParam) {
      params.set('order', 'desc');
    } else {
      params.set('sort', sortParam);
      params.delete('order');
    }

    setSearchParams(params);
  }

  const findPersonByName = (name: string | null) =>
    people?.find(person => person.name === name);

  function orderChangeIcon(paramName: string) {
    if (
      paramName === searchParams.get('sort') &&
      searchParams.get('order') === 'desc'
    ) {
      return 'fas fa-sort-down';
    }

    if (paramName === searchParams.get('sort')) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  }

  return (
    <>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">
          There are no people matching the current search criteria
        </p>
      ) : (
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
                    href="#/people?sort=name"
                    onClick={event => {
                      event.preventDefault();
                      handleSort('name');
                    }}
                  >
                    <span className="icon">
                      <i className={orderChangeIcon('name')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a
                    href="#/people?sort=sex"
                    onClick={event => {
                      event.preventDefault();
                      handleSort('sex');
                    }}
                  >
                    <span className="icon">
                      <i className={orderChangeIcon('sex')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a
                    href="#/people?sort=born"
                    onClick={event => {
                      event.preventDefault();
                      handleSort('born');
                    }}
                  >
                    <span className="icon">
                      <i className={orderChangeIcon('born')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a
                    href="#/people?sort=died"
                    onClick={event => {
                      event.preventDefault();
                      handleSort('died');
                    }}
                  >
                    <span className="icon">
                      <i className={orderChangeIcon('died')} />
                    </span>
                  </a>
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
                  key={person.name}
                  className={
                    person.slug === activeSlug
                      ? 'has-background-warning'
                      : undefined
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <PersonLink person={father} />
                    ) : (
                      person.fatherName || '-'
                    )}
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
