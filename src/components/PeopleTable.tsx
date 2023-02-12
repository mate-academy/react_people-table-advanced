import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable:React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getParent = (parentName: string | null) => {
    return people.find(({ name }) => name === parentName) || null;
  };

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
          const {
            slug, sex, born, died, motherName, fatherName,
          } = person;

          const mother = getParent(motherName);
          const father = getParent(fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn(
                { 'has-background-warning': slug === personSlug },
              )}
            >
              <td><PersonLink person={person} /></td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {!motherName && ('-')}
                {motherName && mother
                  ? (<PersonLink person={mother} />)
                  : (motherName)}
              </td>

              <td>
                {!fatherName && ('-')}
                {fatherName && father
                  ? (<PersonLink person={father} />)
                  : (fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
