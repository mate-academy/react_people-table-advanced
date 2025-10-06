import * as React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: Person['slug'] }>();

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SortLink field="name" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SortLink field="sex" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SortLink field="born" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SortLink field="died" />
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
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
      </div>
    </div>
  );
};

export default PeopleTable;
