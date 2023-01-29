import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person, SortTypes } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeaderLink } from './TableHeaderLink';

type Props = {
  people: Person[];
  slug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const handleParentCellContent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parentName && parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    if (parentName && !parent) {
      return parentName;
    }

    return '-';
  };

  const handleSort = () => {
    const peopleCopy = [...people];
    let result;

    switch (sort) {
      case SortTypes.born:
      case SortTypes.died:
        result = peopleCopy.sort((a, b) => a[sort] - b[sort]);

        return !order ? result : result.reverse();

      case SortTypes.name:
      case SortTypes.sex:
        result = peopleCopy.sort((a, b) => a[sort].localeCompare(b[sort]));

        return !order ? result : result.reverse();

      default:
        return peopleCopy;
    }
  };

  const handleFilter = () => {
    let result = handleSort();

    if (centuries.length > 0) {
      result = result.filter(
        person => {
          const bornCentury = Math.ceil(person.born / 100);

          return centuries.includes(String(bornCentury));
        },
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(
        person => person.name.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  };

  const visiblePeople = handleFilter();

  return (
    <>
      {visiblePeople.length > 0 ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <TableHeaderLink text="Name" sortType={SortTypes.name} />
              <TableHeaderLink text="Sex" sortType={SortTypes.sex} />
              <TableHeaderLink text="Born" sortType={SortTypes.born} />
              <TableHeaderLink text="Died" sortType={SortTypes.died} />
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames(
                  {
                    'has-background-warning': person.slug === slug,
                  },
                )}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{handleParentCellContent(person.motherName)}</td>
                <td>{handleParentCellContent(person.fatherName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          There are no people matching the current search criteria
        </p>
      )}
    </>
  );
};
