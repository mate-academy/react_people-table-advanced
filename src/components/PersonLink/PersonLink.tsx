import React from 'react';
import {
  Link,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
  selectAndShowPerson?: (slug: string) => void;
}

export const PersonLink: React.FC<Props> = React.memo(({
  person,
  selectAndShowPerson,
}) => {
  const { slug } = useParams();
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname:
          slug !== person.slug
            ? parentPath + person.slug
            : parentPath + slug,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      onClick={() => {
        if (selectAndShowPerson) {
          selectAndShowPerson(person.slug);
        }
      }}
    >
      {person.name}
    </Link>
  );
});
