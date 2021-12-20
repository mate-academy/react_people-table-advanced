import { useForm } from 'react-hook-form';
import { People } from '../../types/People';

type Props = {
  titleLabel: string;
  people: People[];
  born: string;
  startValue?: string;
  selectName: string;
};

export const SelectCreatePeople: React.FC<Props> = ({
  titleLabel,
  startValue = '--',
  people,
  born,
  selectName,
}) => {
  const {
    register,
  } = useForm();

  return (
    <>
      <label htmlFor={selectName} className="form-label">{titleLabel}</label>
      <select
        className="form-select mb-3"
        {...register(selectName, {
          disabled: born?.length < 4,
        })}
      >
        <option value={0}>{startValue}</option>
        {people && (
          people.map(person => (
            <option value={person.name} key={person.name}>{person.name}</option>
          ))
        )}
      </select>
    </>
  );
};
