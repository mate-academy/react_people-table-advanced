import { useState } from 'react';
import {
  Link,
  useParams,
  useNavigate,
  SetURLSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { CategoryName } from './CategoryName';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const { human } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ category: '', type: '' });

  const sortHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sortType: string,
  ) => {
    e.preventDefault();
    let skip = false;
    const params = new URLSearchParams(searchParams);

    if (!order.category) {
      setOrder({ category: sortType, type: '' });
    }

    if (sortType !== order.category) {
      params.delete('order');
      setOrder({ category: sortType, type: '' });
    }

    if (sortType === order.category && !order.type) {
      params.set('order', 'desc');
      setOrder({ category: sortType, type: 'desc' });
    }

    if (sortType === order.category && order.type === 'desc') {
      params.delete('order');
      skip = true;
      setOrder({ category: '', type: '' });
    }

    if (skip) {
      params.delete('sort');
    } else {
      params.set('sort', sortType);
    }

    setSearchParams(params);
  };

  const linkHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    slug: string,
  ) => {
    e.preventDefault();
    navigate(`../${slug}?${searchParams.toString()}`);
  };

  const parentLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = people.find((obj) => obj.name === name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        to={`/people/${parent.slug}`}
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
        onClick={(e) => linkHandler(e, parent.slug)}
      >
        {name}
      </Link>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <CategoryName
            sortHandler={sortHandler}
            order={order}
            name="name"
          />
          <CategoryName
            sortHandler={sortHandler}
            order={order}
            name="sex"
          />
          <CategoryName
            sortHandler={sortHandler}
            order={order}
            name="born"
          />
          <CategoryName
            sortHandler={sortHandler}
            order={order}
            name="died"
          />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(
          ({
            slug, name, sex, born, died, motherName, fatherName,
          }) => {
            return (
              <tr
                key={slug}
                data-cy="person"
                className={cn({ 'has-background-warning': slug === human })}
              >
                <td>
                  <Link
                    to={`/people/${slug}`}
                    className={cn({ 'has-text-danger': sex === 'f' })}
                    onClick={(e) => linkHandler(e, slug)}
                  >
                    {name}
                  </Link>
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{parentLink(motherName)}</td>
                <td>{parentLink(fatherName)}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
