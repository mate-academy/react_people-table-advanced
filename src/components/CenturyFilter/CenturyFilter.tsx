import classNames from 'classnames';

type Props = {
  selectedCenturies: string[];
  onToggle: (century: string) => void;
  onReset: () => void;
};

const centuries = ['16', '17', '18', '19', '20'];

export const CenturyFilter = ({
  selectedCenturies,
  onToggle,
  onReset,
}: Props) => {
  return (
    <div className="buttons">
      {centuries.map(century => (
        <button
          key={century}
          type="button"
          className={classNames('button', {
            'is-info': selectedCenturies.includes(century),
          })}
          onClick={() => onToggle(century)}
        >
          {century}
        </button>
      ))}

      <button
        type="button"
        className={classNames('button is-success', {
          'is-outlined': selectedCenturies.length > 0,
        })}
        onClick={onReset}
      >
        All
      </button>
    </div>
  );
};
