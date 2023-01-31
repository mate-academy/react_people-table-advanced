import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person, SortTypes } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeaderLink } from './TableHeaderLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const { slug = '' } = useParams();

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

    switch (sort) {
      case SortTypes.born:
      case SortTypes.died:
        return !order
          ? peopleCopy.sort((a, b) => a[sort] - b[sort])
          : peopleCopy.sort((a, b) => b[sort] - a[sort]);

      case SortTypes.name:
      case SortTypes.sex:
        return !order
          ? peopleCopy.sort((a, b) => a[sort].localeCompare(b[sort]))
          : peopleCopy.sort((a, b) => b[sort].localeCompare(a[sort]));

      default:
        return peopleCopy;
    }
  };

  // const handleFilter = () => {
  //   let result = handleSort();

  //   if (centuries.length) {
  //     result = result.filter(
  //       person => {
  //         const bornCentury = Math.ceil(person.born / 100);

  //         return centuries.includes(String(bornCentury));
  //       },
  //     );
  //   }

  //   if (sex) {
  //     result = result.filter(person => person.sex === sex);
  //   }

  //   if (query) {
  //     result = result.filter(
  //       person => person.name.toLowerCase().includes(query.toLowerCase())
  //         || person.motherName?.toLowerCase().includes(query.toLowerCase())
  //         || person.fatherName?.toLowerCase().includes(query.toLowerCase()),
  //     );
  //   }

  //   return result;
  // };

  const handleFilter = () => {
    if (centuries.length) {
      return handleSort().filter(
        person => centuries.includes(String(Math.ceil(person.born / 100))),
      );
    }

    if (sex) {
      return handleSort().filter(person => person.sex === sex);
    }

    if (query) {
      return handleSort().filter(
        person => person.name.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return handleSort();
  };

  return (
    <>
      {handleFilter().length ? (
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
            {handleFilter().map(person => (
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
