import React from 'react';
import { PersonRow } from '../PersonRow';
import { Person } from '../../types/Person';
import './PeopleTable.scss';

interface Props {
  people: Person[];
  sortingBy: (param: string) => void;
  sortColumn: string | null;
}

export const PeopleTable: React.FC<Props> = ({
  people, sortingBy, sortColumn,
}) => {
  return (
    <>
      <table className="PeopleTable">
        <thead className="PeopleTable__head">
          <tr>
            <td className="PeopleTable__name">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--sort"
                onClick={() => sortingBy('name')}
              >
                Name
              </button>
            </td>
            <td className="PeopleTable__sex">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--sort"
                onClick={() => sortingBy('sex')}
              >
                Sex
              </button>
            </td>
            <td className="PeopleTable__born">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--sort"
                onClick={() => sortingBy('born')}
              >
                Born
              </button>
            </td>
            <td className="PeopleTable__died">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--sort"
                onClick={() => sortingBy('died')}
              >
                Died
              </button>
            </td>
            <td className="PeopleTable__mother">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--mother"
              >
                Mother
              </button>
            </td>
            <td className="PeopleTable__father">
              <button
                type="button"
                className="PeopleTable__cell PeopleTable__cell--father"
              >
                Father
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            people.map(person => {
              return (
                <PersonRow
                  key={person.name}
                  person={person}
                  sortColumn={sortColumn}
                />
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
