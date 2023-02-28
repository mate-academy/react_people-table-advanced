import classNames from "classnames";
import { FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Person } from "../types";
import { sortBy } from "../utils/sortBy";
import { visiblePeople } from "../utils/visiblePeople";
import { PersonLink } from "./PersonLink";
import { SortLink } from "./SortLink";

type Props = {
  people: Person[],
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const sortByField = searchParams.get('sort') as keyof Person;
  const isReverse = searchParams.get('order') === 'desc';

  const filterPeople = visiblePeople(people, currentQuery, currentSex, currentCenturies);
  const sortPeople = sortBy(filterPeople, sortByField, isReverse)

  const sortField = ['Name', 'Sex', 'Born', 'Died'];

  if (!filterPeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    )
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>

          {sortField.map(field => (
            <SortLink key={field} field={field} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortPeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          const isSelected = personSlug === slug;
          const preparedMotherName = motherName || '-';
          const preparedFatherName = fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={person.mother}/>
                  )
                  : preparedMotherName
                }

              </td>
              <td>
                {father
                    ? (
                      <PersonLink person={person.father}/>
                    )
                    : preparedFatherName
                  }
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};
