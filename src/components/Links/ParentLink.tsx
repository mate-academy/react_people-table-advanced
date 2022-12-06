import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { slugContext } from '../slugContext';
import { Person } from '../../types';

type ParentProps = {
  sex: string,
  parentName: string | null,
  selectedParent: Person | undefined,
};

export const ParentLink: FC<ParentProps> = ({
  sex, parentName, selectedParent,
}) => {
  const { setSelectedSlug } = useContext(slugContext);
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentPath + selectedParent?.slug || '',
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      onClick={() => {
        if (selectedParent && setSelectedSlug) {
          return setSelectedSlug(selectedParent.slug);
        }

        return setSelectedSlug && setSelectedSlug('');
      }}
    >
      {parentName}
    </Link>
  );
};
