/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable = ({ people, slug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  //#region Sort and Order

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // sort can be name, sex, born and died
  // se eu clico 1 x
  // sort = 'xxx' deleto o order
  // se eu clico 2x
  // sort='xxx' order ='desc'
  // se eu clico 3x
  // deleto ambos

  const handleSortOrder = (value: string) => {
    if (sort !== value) {
      searchParams.set('sort', value);
      searchParams.delete('order');
    } else if (!order) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  //#endregion

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
                href="#/people?sort=name"
                onClick={event => {
                  event.preventDefault();
                  handleSortOrder('name');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sort !== 'name'
                        ? 'fas fa-sort'
                        : order === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
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
                  handleSortOrder('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sort !== 'sex'
                        ? 'fas fa-sort'
                        : order === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event => {
                  event.preventDefault();
                  handleSortOrder('born');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sort !== 'born'
                        ? 'fas fa-sort'
                        : order === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
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
                  handleSortOrder('died');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sort !== 'died'
                        ? 'fas fa-sort'
                        : order === 'desc'
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {/*
          para cada pessoa que a API retorna, verifica o sexo e adiciona a classe
          renderiza o nome, sexo, nascimento, falecimento, nome do pai e da mãe

        */}
        {people.map(person => {
          const isSelected = person.slug === slug;

          const mother = people.find(
            currentPerson => currentPerson.name === person.motherName,
          );

          const father = people.find(
            currentPerson => currentPerson.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  href={`#/people/${person.slug}`}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <a
                    className={
                      mother.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                    }
                    href={`#/people/${mother.slug}`}
                  >
                    {mother.name}
                  </a>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <a
                    className={
                      father.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                    }
                    href={`#/people/${father.slug}`}
                  >
                    {father.name}
                  </a>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
