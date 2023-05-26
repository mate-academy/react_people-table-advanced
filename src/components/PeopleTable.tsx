import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { TableLink } from './TableLink';
import { SortTableLink } from './SortTableLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const params = useParams();

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(({ name }) => name === parentName);

    if (parent) {
      const { slug, sex, name } = parent;

      return (
        <TableLink
          slug={slug}
          name={name}
          sex={sex}
        />
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortTableLink name="name" />
          </th>

          <th>
            <SortTableLink name="sex" />
          </th>

          <th>
            <SortTableLink name="born" />
          </th>

          <th>
            <SortTableLink name="died" />
          </th>

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            born,
            died,
            fatherName,
            motherName,
            sex,
            name,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': params.slug === slug,
              })}
            >
              <td>
                <TableLink
                  slug={slug}
                  name={name}
                  sex={sex}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getParent(motherName)}</td>
              <td>{getParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
