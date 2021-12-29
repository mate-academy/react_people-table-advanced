import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Human } from '../../Types/Human';
import './TableRow.scss';

type Props = {
  sortedPeople: Human[],
  postQuery: string,
  sortQuery: string,
  methodQuery: string,
};

export const TableRows: React.FC<Props> = ({
  sortedPeople,
  postQuery,
  sortQuery,
  methodQuery,
}) => {
  const { search } = useLocation();
  const { slug } = useParams();

  const sorting = (): any => {
    switch (sortQuery) {
      case 'name':
      case 'sex':

        if (methodQuery === 'asc') {
          sortedPeople.sort((a, b) => (
            a[sortQuery].localeCompare(b[sortQuery])
          ));
        } else {
          sortedPeople.sort((a, b) => (
            b[sortQuery].localeCompare(a[sortQuery])
          ));
        }

        break;

      case 'born':
      case 'died':

        if (methodQuery === 'asc') {
          sortedPeople.sort((a, b) => (
            a[sortQuery] - b[sortQuery]
          ));
        } else {
          sortedPeople.sort((a, b) => (
            b[sortQuery] - a[sortQuery]
          ));
        }

        break;

      default:
        break;
    }
  };

  if (sortQuery.length > 0) {
    sorting();
  }

  return (
    <>
      {sortedPeople?.filter(
        people => (
          people.name.toLocaleLowerCase().includes(postQuery.toLowerCase())
          || people.motherName?.toLocaleLowerCase().includes(postQuery.toLowerCase())
          || people.fatherName?.toLocaleLowerCase().includes(postQuery.toLowerCase())
        ),
      ).map((person) => (
        <tr
          className={slug === person.slug ? 'table-row enable' : 'table-row'}
          key={person.name}
          id={person.slug}
        >
          <td className="table-main-data">
            <Link
              className={person.sex === 'm' ? 'man' : 'woman'}
              to={`${person.slug}${search}`}
            >
              {person.name}
            </Link>
          </td>
          <td className="table-main-data">{person.sex === 'm' ? 'm' : 'f'}</td>
          <td className="table-main-data">{person.born}</td>
          <td className="table-main-data">{person.died}</td>
          <td className="table-main-data">
            {person.father ? (
              <Link
                className="man"
                to={`${person.father.slug}${search}`}
              >
                {person.fatherName}
              </Link>
            ) : (
              <>
                {person.fatherName}
              </>
            )}
          </td>
          <td className="table-main-data">
            {person.mother ? (
              <Link
                className="woman"
                to={`${person.mother.slug}${search}`}
              >
                {person.motherName}
              </Link>
            ) : (
              <>
                {person.motherName}
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
