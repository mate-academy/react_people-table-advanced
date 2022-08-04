import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>
            Name
            <SortLink field="name" />
          </th>

          <th>
            Sex
            <SortLink field="sex" />
          </th>

          <th>
            Born
            <SortLink field="born" />
          </th>

          <th>
            Died
            <SortLink field="died" />
          </th>

          <th>
            Mother
            <SortLink field="motherName" />
          </th>

          <th>
            Father
            <SortLink field="fatherName" />
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
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
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
