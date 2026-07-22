import classNames from 'classnames';

type SexValue = 'm' | 'f' | null;

type Props = {
  value: SexValue;
  onChange: (value: SexValue) => void;
};

export const SexFilter = ({ value, onChange }: Props) => {
  return (
    <p className="panel-tabs">
      <a
        href="#all"
        className={classNames({
          'is-active': value === null,
        })}
        onClick={event => {
          event.preventDefault();
          onChange(null);
        }}
      >
        All
      </a>

      <a
        href="#male"
        className={classNames({
          'is-active': value === 'm',
        })}
        onClick={event => {
          event.preventDefault();
          onChange('m');
        }}
      >
        Male
      </a>

      <a
        href="#female"
        className={classNames({
          'is-active': value === 'f',
        })}
        onClick={event => {
          event.preventDefault();
          onChange('f');
        }}
      >
        Female
      </a>
    </p>
  );
};
