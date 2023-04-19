import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { ColumnSortLink } from '../ColumnSortLink';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => (
    people.filter(person => {
      const isSexFilter = sexParam
        ? person.sex === sexParam
        : true;
      const isQueryFilter = query
        ? person.name.toLowerCase().includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.fatherName?.toLowerCase().includes(query)
        : true;
      const isCenturyFilter = centuries.length
        ? centuries.includes(String(Math.floor(person.born / 100)))
        : true;

      return isSexFilter && isQueryFilter && isCenturyFilter;
    })
  ), [people, sexParam, query, centuries]);

  if (!visiblePeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(colName => {
            const ColName = colName[0].toUpperCase() + colName.slice(1);

            return (
              <th key={colName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {ColName}
                  <ColumnSortLink columnName={colName} />
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {visiblePeople.length > 0 && visiblePeople.map(person => {
          const {
            sex,
            motherName,
            fatherName,
            born,
            died,
            mother,
            father,
          } = person;
          const ifNoMotherLink = motherName || '-';
          const ifNoFaherLink = fatherName || '-';

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : ifNoMotherLink}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : ifNoFaherLink}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
