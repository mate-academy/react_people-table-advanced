import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';
import { PersonLink } from '../components/PersonLink';
import { SortByLink } from './SortByLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const selectedPerson = people.find(p => p.slug === slug);

  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <SortByLink sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortByLink sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortByLink sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortByLink sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          // eslint-disable-next-line
          const { slug, sex, born, died, fatherName, motherName } = person;

          const motherPerson = people.find(p => p.name === motherName);
          const fatherPerson = people.find(p => p.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson?.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  <span>{motherName ? motherName : '-'}</span>
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  <span>{fatherName ? fatherName : '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
