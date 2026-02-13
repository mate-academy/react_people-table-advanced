import { Link } from 'react-router-dom';
import { SearchParamKey } from '../../types/searchParams';
import { Sex } from '../../types';
import classNames from 'classnames';

type SexFilterOptions = 'Male' | 'Female' | 'All';

type SexTab = {
  name: SexFilterOptions;
  value: Sex | null;
};

const sexTabs: SexTab[] = [
  { name: 'All', value: null },
  { name: 'Male', value: Sex.Male },
  { name: 'Female', value: Sex.Female },
];

interface Props {
  searchParams: URLSearchParams;
}

const SexFilter = ({ searchParams }: Props) => {
  const selectedSexParam = searchParams.get(SearchParamKey.Sex)?.toLowerCase();

  const selectedSex: SexFilterOptions = (() => {
    switch (selectedSexParam) {
      case Sex.Male:
        return 'Male';
      case Sex.Female:
        return 'Female';
      default:
        return 'All';
    }
  })();

  const buildSexSearch = (current: URLSearchParams, value: Sex | null) => {
    const next = new URLSearchParams(current.toString());

    next.delete(SearchParamKey.Sex);
    if (value !== null) {
      next.set(SearchParamKey.Sex, value);
    }

    return next.toString();
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexTabs.map(({ name, value }) => (
        <Link
          key={name}
          className={classNames({
            'is-active': selectedSex === name,
          })}
          to={{ search: buildSexSearch(searchParams, value) }}
        >
          {name}
        </Link>
      ))}
    </p>
  );
};

export default SexFilter;
