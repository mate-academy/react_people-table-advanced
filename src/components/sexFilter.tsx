import cn from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  sex: string,
}

export const SexFilter: FC<Props> = memo(
  ({ sex }) => {
    const [searchParams] = useSearchParams();
    const [selectedSex, setSelectedSex] = useState(sex);

    useEffect(() => {
      searchParams.set('sex', selectedSex);
    });

    const getSearchParamsStr = useCallback((value: string) => {
      searchParams.delete('sex');

      if (value === '') {
        return searchParams.toString();
      }

      searchParams.set('sex', value);

      return searchParams.toString();
    }, []);

    return (
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': sex === '' })}
          to={{ search: getSearchParamsStr('') }}
          onClick={() => setSelectedSex('')}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': sex === 'm' })}
          to={{ search: getSearchParamsStr('m') }}
          onClick={() => setSelectedSex('m')}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': sex === 'f' })}
          to={{ search: getSearchParamsStr('f') }}
          onClick={() => setSelectedSex('f')}
        >
          Female
        </Link>
      </p>
    );
  },
);
