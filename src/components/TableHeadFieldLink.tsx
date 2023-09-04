import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  linkAddress: (
    name: string,
    sort: string,
    order: string,
  ) => string,
  fieldName: string,
  sort: string,
  order: string,
};

export const TableHeadFieldLink: React.FC<Props> = ({
  linkAddress,
  fieldName,
  sort,
  order,
}) => {
  const fieldNameEdited = (
    fieldName.charAt(0).toUpperCase()
    + fieldName.slice(1).toLowerCase()
  );

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {fieldNameEdited}
      <Link to={{
        search: linkAddress(fieldName, sort, order),
      }}
      >
        <span className="icon">
          <i className={classNames(
            'fas',
            { 'fa-sort': sort !== fieldName },
            { 'fa-sort-up': order === 'desc' && sort === fieldName },
            { 'fa-sort-down': order !== 'desc' && sort === fieldName },
          )}
          />
        </span>
      </Link>
    </span>
  );
};
