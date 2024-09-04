import classNames from 'classnames';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types';
import { FC } from 'react';
import { SortLink } from './SortLink';

enum Sex {
  Female = 'f',
  Male = 'm',
}

type Props = {
  people: Person[];
  peopleFromServer: Person[];
};

export const PeopleTable: FC<Props> = ({ people, peopleFromServer }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();

  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  const findPersonByName = (name: string | undefined) =>
    peopleFromServer.find(person => person.name === name);

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
        {people.map(
          ({
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personSlug,
          }) => {
            const mother = motherName ? findPersonByName(motherName) : null;
            const father = fatherName ? findPersonByName(fatherName) : null;

            return (
              <tr
                data-cy="person"
                key={personSlug}
                className={classNames({
                  'has-background-warning': slug === personSlug,
                })}
              >
                <td>
                  <Link
                    to={`/people/${personSlug}?${searchParamsString}`}
                    className={classNames({
                      'has-text-danger': sex === Sex.Female,
                    })}
                  >
                    {name}
                  </Link>
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother?.slug ? (
                    <Link
                      to={`/people/${mother.slug}?${searchParamsString}`}
                      className="has-text-danger"
                    >
                      {motherName}
                    </Link>
                  ) : (
                    <span>{motherName || '-'}</span>
                  )}
                </td>
                <td>
                  {father?.slug ? (
                    <Link to={`/people/${father.slug}?${searchParamsString}`}>
                      {fatherName}
                    </Link>
                  ) : (
                    <span>{fatherName || '-'}</span>
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
