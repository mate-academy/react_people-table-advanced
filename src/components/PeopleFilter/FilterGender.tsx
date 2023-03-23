import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

const linksFilterSex = [{
  title: 'All',
  valueSearch: '',
},
{
  title: 'Male',
  valueSearch: 'm',
},
{
  title: 'Femail',
  valueSearch: 'f',
}];

export const FilterGender = () => {
  const [search] = useSearchParams();
  const sex = search.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {linksFilterSex.map(({ title, valueSearch }) => (
        <SearchLink
          className={classNames({
            'is-active': sex === valueSearch,
          })}
          params={{
            sex: valueSearch,
          }}
          replace
        >
          {title}
        </SearchLink>
      ))}
    </p>
  );
};
