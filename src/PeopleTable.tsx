import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import classnames from 'classnames';
import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[] | undefined
};

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [delayTimer, setDelayTimer] = useState<NodeJS.Timeout>();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || '',
  );

  const searchString = searchParams.get('query') || '';

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (delayTimer) {
      clearTimeout(delayTimer);
    }

    setSearchQuery(e.target.value);
    setDelayTimer(setTimeout(() => {
      const prevParams = Object.fromEntries(searchParams);

      setSearchParams({ ...prevParams, query: e.target.value });
    }, 500));
  };

  const sortHandler = (sortBy: string) => () => {
    const prevParams = Object.fromEntries(searchParams);

    if (sortBy === searchParams.get('sortBy')
      && SortOrder.ASC === searchParams.get('order')) {
      setSearchParams({ ...prevParams, sortBy, order: SortOrder.DESC });
    } else {
      setSearchParams({ ...prevParams, sortBy, order: SortOrder.ASC });
    }
  };

  const sortedPeople: Person[] = useMemo(() => {
    if (people === undefined) {
      return [];
    }

    const peopleCopy = [...people];
    const sortBy = searchParams.get('sortBy') || '';

    if (sortBy === '') {
      return [...people];
    }

    return peopleCopy.sort((a, b) => {
      let order;

      if (searchParams.get('order') === SortOrder.ASC) {
        order = 1;
      } else {
        order = -1;
      }

      switch (sortBy) {
        case 'fatherName':
        case 'motherName':
        case 'name':
        case 'sex':
          return (a[sortBy] || '').localeCompare(b[sortBy] || '') * order;
        case 'born':
        case 'died':
          return (a[sortBy] - b[sortBy]) * order;
        default:
          return 0;
      }
    });
  }, [people, searchParams.get('sortBy'), searchParams.get('order')]);

  const genClass = (title: string) => {
    return [
      'title',
      { title__star: searchParams.get('sortBy') === title },
      {
        title__IconASC: searchParams.get('sortBy') === title
          && searchParams.get('order') === SortOrder.ASC,
      },
      {
        title__IconDESC: searchParams.get('sortBy') === title
          && searchParams.get('order') === SortOrder.DESC,
      },
    ];
  };

  return (
    <table className="PeopleTable">
      <thead>People Table</thead>
      <input
        value={searchQuery}
        type="search"
        name="search"
        onChange={handleInput}
      />
      <tbody>
        <tr>
          <th
            className={classnames(...genClass('name'))}
            onClick={sortHandler('name')}
          >
            Name
          </th>
          <th
            className={classnames(...genClass('sex'))}
            onClick={sortHandler('sex')}
          >
            Sex
          </th>
          <th
            className={classnames(...genClass('born'))}
            onClick={sortHandler('born')}
          >
            Born
          </th>
          <th
            className={classnames(...genClass('died'))}
            onClick={sortHandler('died')}
          >
            Died
          </th>
          <th
            className={classnames(...genClass('fatherName'))}
            onClick={sortHandler('fatherName')}
          >
            Father Name
          </th>
          <th
            className={classnames(...genClass('motherName'))}
            onClick={sortHandler('motherName')}
          >
            Mother Name
          </th>
        </tr>
        {sortedPeople
          && sortedPeople.filter(person => (
            person.name.toLowerCase().includes(searchString)
            || person.fatherName?.toLowerCase().includes(searchString)
            || person.motherName?.toLowerCase().includes(searchString)
          ))
            .map(person => (
              <PersonRow key={person.name} person={person} />
            ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
