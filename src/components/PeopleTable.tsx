import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink/PersonLink';
import { Person } from '../types';
import { SortLink } from './SortLink/SortLink';

type Props = {
  personId: string,
  peoples: Person[],
};

enum SortType {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const PeopleTable: React.FC<Props> = ({ personId, peoples }) => {
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const query = searchParams.get('query');
  const sexType = searchParams.get('sex');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const prepareTodos = () => {
    let preparetedPeoples = peoples.filter(
      (person) => person.name !== 'Carolus Heverbeke ',
    );

    if (sexType) {
      preparetedPeoples = preparetedPeoples.filter((p) => p.sex === sexType);
    }

    if (query) {
      preparetedPeoples = preparetedPeoples.filter(
        (p) => p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries) {
      preparetedPeoples = preparetedPeoples.filter((p) => {
        const centurie = Math.ceil(p.born / 100).toString();

        return centuries.includes(centurie);
      });
    }

    switch (sortField) {
      case SortType.NAME:
      case SortType.SEX:
        preparetedPeoples = preparetedPeoples.sort((a, b) => {
          return a[sortField].localeCompare(b[sortField]);
        });
        break;

      case SortType.BORN:
      case SortType.DIED:
        preparetedPeoples = preparetedPeoples.sort((a, b) => {
          return a[sortField] - b[sortField];
        });
        break;

      default:
        return preparetedPeoples;
    }

    if (order) {
      preparetedPeoples.reverse();
    }

    return preparetedPeoples;
  };

  const visiblePeoples = prepareTodos();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      style={{ width: '100%' }}
    >

      <thead>
        <tr>
          <th>
            <SortLink sortBy="name" />
          </th>

          <th>
            <SortLink sortBy="sex" />
          </th>

          <th>
            <SortLink sortBy="born" />
          </th>

          <th>
            <SortLink sortBy="died" />
          </th>

          <th>
            Mother
          </th>

          <th>
            Father
          </th>
        </tr>
      </thead>

      <tbody>
        {visiblePeoples.map((people) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = people;

          const mother = peoples.find((person) => person.name === motherName);
          const father = peoples.find((person) => person.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === personId },
              )}
            >
              <td>
                <PersonLink person={people} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
