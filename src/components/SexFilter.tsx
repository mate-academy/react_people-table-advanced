import React from 'react';

type SexFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const SexFilter: React.FC<SexFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const selectedSex = searchParams.get('sex');

  const handleSexChange = (sex: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedSex === sex) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', sex);
    }

    if (sex === '') {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <a
        className={!selectedSex ? 'is-active' : ''}
        onClick={() => handleSexChange('')}
      >
        All
      </a>
      <a
        className={`${selectedSex === 'm' ? 'is-active' : ''}`}
        onClick={() => handleSexChange('m')}
      >
        Male
      </a>
      <a
        className={`${selectedSex === 'f' ? 'is-active' : ''}`}
        onClick={() => handleSexChange('f')}
      >
        Female
      </a>
    </p>
  );
};
