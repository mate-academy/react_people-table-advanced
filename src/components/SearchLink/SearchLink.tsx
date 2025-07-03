import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  className?: string;
  activeClassName?: string;
  toggleArrayParam?: boolean;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  className = '',
  activeClassName = 'is-active',
  toggleArrayParam = false,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const current = new URLSearchParams(searchParams);
  const updatedParams: SearchParams = {};

  let isActive = true;

  for (const [key, value] of Object.entries(params)) {
    const currentValues = current.getAll(key);

    if (value === null) {
      isActive = !current.has(key);
      updatedParams[key] = null;
    } else if (Array.isArray(value)) {
      const [val] = value;
      const exists = currentValues.includes(val);

      if (toggleArrayParam) {
        const newSet = new Set(currentValues);

        if (exists) {
          newSet.delete(val);
        } else {
          newSet.add(val);
        }

        updatedParams[key] = Array.from(newSet);
        isActive = exists;
      } else {
        updatedParams[key] = value;
        isActive =
          currentValues.length === value.length &&
          value.every(v => currentValues.includes(v));
      }
    } else {
      const exists = current.get(key) === value;

      if (toggleArrayParam) {
        const currentSet = new Set(current.getAll(key));

        if (exists) {
          currentSet.delete(value);
        } else {
          currentSet.add(value);
        }

        updatedParams[key] = Array.from(currentSet);
        isActive = exists;
      } else {
        updatedParams[key] = value;
        isActive = exists;
      }
    }
  }

  const combinedClassName =
    `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link
      to={{ search: getSearchWith(searchParams, updatedParams) }}
      className={combinedClassName}
      {...props}
    >
      {children}
    </Link>
  );
};
