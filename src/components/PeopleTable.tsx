import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  listOfPeople: Person[];
};

export const PeopleTable: FC<Props> = ({ listOfPeople }) => {
  const { selectedSlug = '' } = useParams();

  const list = listOfPeople.map(person => {
    const mother = listOfPeople.find(m => m.name === person.motherName);
    const father = listOfPeople.find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {list.map(human => (

          <tr
            data-cy="person"
            key={human.slug}
            className={classNames(
              {
                'has-background-warning': human.slug === selectedSlug,
              },
            )}
          >
            <td>
              <PersonLink
                slug={human.slug}
                name={human.name}
                sex={human.sex}
              />
            </td>
            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              {human.mother ? (
                <PersonLink
                  slug={human.mother.slug}
                  name={human.mother.name}
                  sex={human.mother.sex}
                />
              ) : (
                human.motherName || '-'
              )}
            </td>
            <td>
              {human.father ? (
                <PersonLink
                  slug={human.father.slug}
                  name={human.father.name}
                  sex={human.father.sex}
                />
              ) : (
                human.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
