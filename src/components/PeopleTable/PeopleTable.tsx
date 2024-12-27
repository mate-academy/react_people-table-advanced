import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  peopleData: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ peopleData }) => {
  const { slug } = useParams();
  const isSelect = peopleData.find(person => person.slug === slug);

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
        {peopleData.map(person => {
          const { sex, born, died, fatherName, motherName, slug } = person;

          const mother = peopleData.find(p => p.name === motherName);
          const father = peopleData.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === isSelect?.slug,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother ? <PersonLink person={mother} /> : '-'}</td>
              <td>{father ? <PersonLink person={father} /> : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
