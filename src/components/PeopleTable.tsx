import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, Params, SortCategories } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugPerson } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  function iconSort(field: SortCategories) {
    if (sort === field && order !== 'desc') {
      return (<i className="fas fa-sort-up" />);
    }

    if (sort === field && order === 'desc') {
      return (<i className="fas fa-sort-down" />);
    }

    return <i className="fas fa-sort" />;
  }

  function getPersonName(name: string) {
    return people.find(pers => pers.name === name);
  }

  function setSearch(params: Params) {
    const reselt = getSearchWith(searchParams, params);

    setSearchParams(reselt);
  }

  function handleClick(field: SortCategories) {
    if (sort !== field) {
      setSearch({ sort: field, order: null });
    } else
    if (sort === field && order) {
      setSearch({ sort: null, order: null });
    } else
    if (sort === field) {
      setSearch({ order: 'desc' });
    }
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
              <span
                aria-hidden="true"
                onClick={() => handleClick(SortCategories.Name)}
                className="icon"
              >
                {iconSort(SortCategories.Name)}
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span
                aria-hidden="true"
                onClick={() => handleClick(SortCategories.Sex)}
                className="icon"
              >
                {iconSort(SortCategories.Sex)}

              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span
                aria-hidden="true"
                onClick={() => handleClick(SortCategories.Born)}
                className="icon"
              >
                {iconSort(SortCategories.Born)}

              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span
                aria-hidden="true"
                onClick={() => handleClick(SortCategories.Died)}
                className="icon"
              >
                {iconSort(SortCategories.Died)}

              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(({
          sex, born, died, motherName, fatherName, slug, name,
        }) => {
          const mother = motherName
            ? getPersonName(motherName) : undefined;
          const father = fatherName
            ? getPersonName(fatherName) : undefined;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === slugPerson,
              })}
            >
              <td>
                <PersonLink person={({
                  sex, born, died, motherName, fatherName, slug, name,
                })}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || (<span>-</span>)}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || (<span>-</span>)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
