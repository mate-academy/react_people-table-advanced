import React from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersoneLink } from './PersoneLink';
import { Person } from '../types';
import { SortLink } from './SortLink';
import { SortsParams } from '../types/SortParams';

type Params = {
  people: Person[]
};

export const PeopleTable: React.FC<Params> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const currentCenturies = searchParams.getAll('centuries');
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');

  const preparedPeople = () => {
    let newPeople = [...people];
    const order = currentOrder ? -1 : 1;

    switch (currentSort) {
      case SortsParams.Name:
      case SortsParams.Sex:
        newPeople.sort((a, b) => {
          return a[currentSort].toLowerCase()
            .localeCompare(b[currentSort].toLowerCase()) * order;
        });

        break;

      case SortsParams.Born:
      case SortsParams.Died:
        newPeople.sort((a, b) => (a[currentSort] - b[currentSort]) * order);

        break;

      default:
        break;
    }

    if (currentSex) {
      newPeople = newPeople.filter(person => person.sex === currentSex);
    }

    if (currentQuery) {
      newPeople = newPeople.filter((person) => {
        if (
          person.name.toLowerCase()
            .includes(currentQuery.toLowerCase())
          || person.fatherName?.toLowerCase()
            .includes(currentQuery.toLowerCase())
          || person.motherName?.toLowerCase()
            .includes(currentQuery.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    }

    if (currentCenturies.length > 0) {
      newPeople = newPeople
        .filter(person => currentCenturies
          .includes(String(Math.ceil(person.born / 100))));
    }

    return newPeople;
  };

  const peopleToRender = preparedPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(Object.keys(SortsParams) as Array<keyof typeof SortsParams>)
            .map(key => (
              <SortLink
                key={key}
                params={SortsParams[key]}
              >
                {key}
              </SortLink>
            ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleToRender.map(person => {
          const mother = () => {
            if (!person.motherName) {
              return '-';
            }

            return people
              .find(per => per.motherName === person.mother?.name)
              ? <PersoneLink person={person.mother} />
              : person.motherName;
          };

          const father = () => {
            if (!person.fatherName) {
              return '-';
            }

            return people
              .find(per => per.fatherName === person.father?.name)
              ? <PersoneLink person={person.father} />
              : person.fatherName;
          };

          return (
            <tr
              key={person.slug}
              className={cn(
                { 'has-background-warning': person.slug === slug },
              )}
              data-cy="person"
            >
              <td>
                <PersoneLink person={person} />
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>{mother()}</td>

              <td>{father()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
