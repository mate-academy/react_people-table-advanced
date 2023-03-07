import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortTypses } from '../types/SortTypes';
import { HeaderLink } from './HeaderLink';
import { PersonLink } from './PersonLink';

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

  const sortHandler = () => {
    const peopleToSort = [...people];

    switch (sort) {
      case SortTypses.born:
      case SortTypses.died:
        return !order
          ? peopleToSort.sort((a, b) => a[sort] - b[sort])
          : peopleToSort.sort((a, b) => b[sort] - a[sort]);

      case SortTypses.name:
      case SortTypses.sex:
        return !order
          ? peopleToSort.sort((a, b) => a[sort].localeCompare(b[sort]))
          : peopleToSort.sort((a, b) => b[sort].localeCompare(a[sort]));

      default:
        return peopleToSort;
    }
  };

  const parentsHandler = (parentName: string | null) => {
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

  const filterHandler = () => {
    let result = sortHandler();

    if (centuries.length) {
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

  return (
    <>
      {filterHandler().length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <HeaderLink name="Name" sortType={SortTypses.name} />
              <HeaderLink name="Sex" sortType={SortTypses.sex} />
              <HeaderLink name="Born" sortType={SortTypses.born} />
              <HeaderLink name="Died" sortType={SortTypses.died} />
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filterHandler().map(person => (
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
                <td>{parentsHandler(person.motherName)}</td>
                <td>{parentsHandler(person.fatherName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No mathes found</p>
      )}
    </>
  );
};
