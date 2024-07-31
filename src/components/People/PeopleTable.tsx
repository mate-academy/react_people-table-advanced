import { Person } from '../../types';
import PeopleInfo from './PeopleInfo';
import tableFields from './People.data';
import PeopleFields from './PeopleField/PeopleFields';
import { useSearchParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  filteredPeople: Person[];
};

export const PeopleTable = ({ filteredPeople }: Props) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const sortByStringField = (
    field: keyof Person,
    order: string,
    data: Person[],
  ): Person[] => {
    return [...data].sort((a, b) =>
      order === 'desc'
        ? (b[field] as string).localeCompare(a[field] as string)
        : (a[field] as string).localeCompare(b[field] as string),
    );
  };

  const sortByNumberField = (
    field: keyof Person,
    order: string,
    data: Person[],
  ): Person[] => {
    return [...data].sort((a, b) =>
      order === 'desc'
        ? (b[field] as number) - (a[field] as number)
        : (a[field] as number) - (b[field] as number),
    );
  };

  const handleSort = (): Person[] => {
    switch (sortField) {
      case 'name':
      case 'sex':
      case 'fatherName':
      case 'motherName':
      case 'slug':
        return sortByStringField(sortField, sortOrder, filteredPeople);
      case 'born':
      case 'died':
        return sortByNumberField(sortField, sortOrder, filteredPeople);
      default:
        return filteredPeople;
    }
  };

  const finalList: Person[] = handleSort();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableFields.map(table => (
            <PeopleFields key={table.value} table={table} />
          ))}
        </tr>
      </thead>

      <tbody>
        {finalList.map(person => (
          <PeopleInfo key={person.slug} people={finalList} person={person} />
        ))}
      </tbody>
    </table>
  );
};
