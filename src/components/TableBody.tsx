import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

interface Props {
  people: Person[];
  filteredPeople: Person[]
}

export const TableBody: React.FC<Props> = ({ people, filteredPeople }) => {
  const { slug } = useParams();
  const { search } = useLocation();

  const listOfNames = useMemo(
    () => people.map(person => person.name),
    [people],
  );

  const findSlugOfChoosedPerson = (choosedPerson: string) => {
    return people.find(person => person.name === choosedPerson)?.slug;
  };

  return (
    <tbody>
      {filteredPeople.map(person => {
        const {
          name,
          sex: personSex,
          born,
          died,
          fatherName,
          motherName,
          slug: personSlug,
        } = person;

        return (
          <tr
            key={personSlug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === slug,
            })}
          >
            <td>
              <Link
                relative="path"
                to={`../${personSlug}${search}`}
                className={classNames({
                  'has-text-danger': personSex === 'f',
                })}
              >
                {name}
              </Link>
            </td>

            <td>{personSex}</td>
            <td>{born}</td>
            <td>{died}</td>

            {!!motherName
              && listOfNames.includes(motherName)
              ? (
                <td>
                  <Link
                    to={`../${findSlugOfChoosedPerson(motherName)}${search}`}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName || '-'}</td>
              )}

            {!!fatherName
              && listOfNames.includes(fatherName)
              ? (
                <td>
                  <Link
                    to={`../${findSlugOfChoosedPerson(fatherName)}${search}`}
                  >
                    {fatherName}
                  </Link>
                </td>
              ) : (
                <td>{fatherName || '-'}</td>
              )}
          </tr>
        );
      })}
    </tbody>
  );
};
