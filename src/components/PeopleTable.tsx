import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';

type Props = {
  people: Person[];
  active?: string;
  onSort: (column: string) => void;
};

export const PeopleTable: React.FC<Props> = ({ people, active, onSort }) => {
  const activePerson = people.find(person => person.slug === active);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [order, setOrder] = useState(SortOrder.None);

  function sortFieldClickHandler(fieldName: SortField): void {
    if (sortField === fieldName && order === SortOrder.Ascending) {
      setOrder(SortOrder.Descending);
    } else if (sortField !== null) {
      setOrder(SortOrder.None);
      setSortField(null);
    }

    if (sortField === null) {
      setSortField(fieldName);
      setOrder(SortOrder.Ascending);
    }

    onSort(fieldName);
  }

  function getSortArrowClass(fieldName: SortField): string {
    return fieldName !== sortField
      ? 'fas fa-sort'
      : order === SortOrder.Ascending
        ? 'fas fa-sort-up'
        : 'fas fa-sort-down';
  }

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
              <a onClick={() => sortFieldClickHandler(SortField.Name)}>
                <span className="icon">
                  <i className={getSortArrowClass(SortField.Name)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => sortFieldClickHandler(SortField.Sex)}>
                <span className="icon">
                  <i className={getSortArrowClass(SortField.Sex)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => sortFieldClickHandler(SortField.Born)}>
                <span className="icon">
                  <i className={getSortArrowClass(SortField.Born)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => sortFieldClickHandler(SortField.Died)}>
                <span className="icon">
                  <i className={getSortArrowClass(SortField.Died)} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => (
          <PersonLink
            person={person}
            key={person.slug}
            activePerson={activePerson!}
          />
        ))}
      </tbody>
    </table>
  );
};
