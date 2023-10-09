/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import { useSearchParamsContext } from '../SearchParamsContext';

export const SexFilter = () => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const currentSelectedSex = searchParams.get('sex') || 'all';

  const handleSexFilterChange = (newSelectedSex: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.delete('sex');
    const newParams = new URLSearchParams(currentParams.toString());

    if (newSelectedSex !== 'all') {
      newParams.set('sex', newSelectedSex);
    }

    setSearchParams(newParams);
  };

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
  ];

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {filterOptions.map((option) => (
        <a
          key={option.value}
          className={currentSelectedSex === option.value ? 'is-active' : ''}
          onClick={() => handleSexFilterChange(option.value)}
          onKeyDown={() => handleSexFilterChange(option.value)}
        >
          {option.label}
        </a>
      ))}
    </p>
  );
};
