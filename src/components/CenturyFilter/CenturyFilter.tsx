import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  handleCenturies: (value: string) => void;
  clearCenturies: () => void;
};

export const CenturyFilter: React.FC<Props> = ({
  handleCenturies,
  clearCenturies,
}) => {
  const [activeCenturies, setActiveCenturies] = useState<string[]>([]);

  const [searchParams] = useSearchParams();

  const isAllActive = activeCenturies.length === 0;

  useEffect(() => {
    setActiveCenturies(searchParams.getAll('centuries'));
  }, [searchParams]);

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          <button
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': activeCenturies.includes('16'),
            })}
            onClick={() => {
              if (activeCenturies.includes('16')) {
                setActiveCenturies(activeCenturies.filter(cn => cn !== '16'));
              } else {
                setActiveCenturies(currentCenturies => [
                  ...currentCenturies,
                  '16',
                ]);
              }

              handleCenturies('16');
            }}
          >
            16
          </button>

          <button
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': activeCenturies.includes('17'),
            })}
            onClick={() => {
              if (activeCenturies.includes('17')) {
                setActiveCenturies(activeCenturies.filter(cn => cn !== '17'));
              } else {
                setActiveCenturies(currentCenturies => [
                  ...currentCenturies,
                  '17',
                ]);
              }

              handleCenturies('17');
            }}
          >
            17
          </button>

          <button
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': activeCenturies.includes('18'),
            })}
            onClick={() => {
              if (activeCenturies.includes('18')) {
                setActiveCenturies(activeCenturies.filter(cn => cn !== '18'));
              } else {
                setActiveCenturies(currentCenturies => [
                  ...currentCenturies,
                  '18',
                ]);
              }

              handleCenturies('18');
            }}
          >
            18
          </button>

          <button
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': activeCenturies.includes('19'),
            })}
            onClick={() => {
              if (activeCenturies.includes('19')) {
                setActiveCenturies(activeCenturies.filter(cn => cn !== '19'));
              } else {
                setActiveCenturies(currentCenturies => [
                  ...currentCenturies,
                  '19',
                ]);
              }

              handleCenturies('19');
            }}
          >
            19
          </button>

          <button
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': activeCenturies.includes('20'),
            })}
            onClick={() => {
              if (activeCenturies.includes('20')) {
                setActiveCenturies(activeCenturies.filter(cn => cn !== '20'));
              } else {
                setActiveCenturies(currentCenturies => [
                  ...currentCenturies,
                  '20',
                ]);
              }

              handleCenturies('20');
            }}
          >
            20
          </button>
        </div>

        <div className="level-right ml-4">
          <button
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': !isAllActive,
            })}
            onClick={() => {
              clearCenturies();
              setActiveCenturies([]);
            }}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};
