/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";
import { Person } from "../types";
import { useParams, NavLink, useSearchParams } from "react-router-dom";
import cn from "classnames";
import { SearchLink } from "./SearchLink";
import { useSortPeople } from "./SortPeople";


type Props = {
  people: Person[] | [];
};


const tHeadColumns = [
  { id: 'name', title: 'Name' },
  { id: 'sex', title: 'Sex' },
  { id: 'born', title: 'Born' },
  { id: 'died', title: 'Died' },
];


export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {

  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);


  useEffect(() => {
    if (slug) {
      const personToHighlight = people.find((person) => person.slug === slug);
      setSelectedPerson(personToHighlight || null);
    } else {
      setSelectedPerson(null);
    }
  }, [slug, people]);


  const { sortedPeople, getOrder, getNextOrder } = useSortPeople(people);


  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tHeadColumns.map((column) => {
            return (
              <th key={column.id}>
                <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                  {column.title}
                  <SearchLink params={{ sort: `${column.id}`, order: getNextOrder(column.id) }}>
                    <span className="icon">
                      <i className={`fas ${getOrder(column.id)}`} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            )
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person: Person) => {
          const isSelected = selectedPerson?.slug === person.slug;
          const mother = people.find((p) => p.name === person.motherName);
          const father = people.find((p) => p.name === person.fatherName);

          return (
            <tr data-cy="person" className={cn({ "has-background-warning": isSelected })} key={person.name}>
              <td>
                <NavLink to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }} className={cn({ "has-text-danger": person.sex === 'f' })}
                  onClick={() => setSelectedPerson(person)}
                >{person.name}
                </NavLink >
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <NavLink to={{
                    pathname: `/people/${mother.slug}`,
                    search: searchParams.toString(),
                  }} className="has-text-danger"
                    onClick={() => setSelectedPerson(mother)}
                  >
                    {mother.name}
                  </NavLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <NavLink to={{
                    pathname: `/people/${father.slug}`,
                    search: searchParams.toString(),
                  }}
                    onClick={() => setSelectedPerson(father)}
                  >
                    {father.name}
                  </NavLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
});
