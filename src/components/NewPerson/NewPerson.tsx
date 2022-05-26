import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { People } from '../../types/people';
import './NewPerson.scss';

type Props = {
  people: People[],
  addNewPeople: (newPerson:People) => void,
  setIsOpenForm: (arg0: boolean) => void,
};

const NewPerson:React.FC<Props> = ({ addNewPeople, people, setIsOpenForm }) => {
  const [newPerson, setNewPerson] = useState<People>({
    name: '',
    sex: 'm' || 'f',
    born: 0,
    died: 0,
  });

  const [slugPerson, setSlugPerson] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const navigate = useNavigate();

  const [validName, setValidName] = useState(true);
  const [errorName, setErrorName] = useState('');
  const [validAge, setValidAge] = useState(true);
  const [errorAge, setErrorAge] = useState('');

  const filterPerson = (value:string) => {
    return people.filter(person => person.sex === value)
      .filter(person => (+person.died > +newPerson.born)
        && (+person.born < +newPerson.born));
  };

  const handleChange = (
    event:React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSlugPerson(newPerson.name.concat((newPerson.born).toString()));
    const valName = new RegExp(/^(?! )[А-Яа-яЁёA-Za-z\s]+$/);

    const {
      name, value, type, checked,
    } = event.target;

    setNewPerson((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'name') {
      setValidName(valName.test(value));
    }
  };

  const validationAge = () => {
    const age = newPerson.died - newPerson.born;

    if (age >= 0 && age < 150) {
      setValidAge(validAge);

      return true;
    }

    setValidAge(!validAge);

    return false;
  };

  const validation = () => {
    if (!validName || !validationAge()) {
      setErrorName("Your name isn't validation");
      setErrorAge('Not valid age');

      return false;
    }

    return true;
  };

  const handleChangeSelect = (
    setSelect:(value:string)=>void,
    event:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setSelect(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPerson && validation()) {
      const addPerson = {
        ...newPerson,
        slug: slugPerson,
        motherName: mother || undefined,
        fatherName: father || undefined,
        mother: people.find(person => person.name === mother),
        father: people.find(person => person.name === father),
      };

      addNewPeople(addPerson);
      navigate('/people');
      setIsOpenForm(false);
    }
  };

  const listOfMother = useMemo(() => (
    filterPerson('f')
  ), [people, newPerson.born]);

  const listOfFather = useMemo(() => (
    filterPerson('m')
  ), [people, newPerson.born]);

  return (
    <>
      <div>NewPerson</div>
      <form onSubmit={onSubmit} className="form">
        <div className="control">
          <label className="label">
            Name:
            <input
              type="text"
              placeholder="Name"
              className="input"
              name="name"
              value={newPerson.name}
              onChange={handleChange}
              required
            />
          </label>
          {!validName
            && (
              <p className="error">
                {errorName}
              </p>
            )}
        </div>
        <div className="control">
          <label
            className="radio"
            htmlFor="sex_m"
          >
            <input
              type="radio"
              id="sex_m"
              name="sex"
              value="m"
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label
            className="radio"
            htmlFor="sex_f"
          >
            <input
              type="radio"
              id="sex_f"
              name="sex"
              value="f"
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        <label
          htmlFor="BornYear"
          className="label"
        >
          Born :
          <input
            type="number"
            name="born"
            value={newPerson.born}
            min="1400"
            max={new Date().getFullYear()}
            step="1"
            onChange={handleChange}
            required
          />
        </label>
        <label
          htmlFor="DiedYear"
          className="label"
        >
          Died :
          <input
            type="number"
            disabled={(newPerson.born < 1400)}
            name="died"
            value={newPerson.died}
            min="1400"
            max={new Date().getFullYear()}
            step="1"
            onChange={handleChange}
          />
        </label>
        {!validAge
            && (
              <p className="error">
                {errorAge}
              </p>
            )}
        <label className="label">
          Mother:
          <select
            name="motherName"
            disabled={newPerson.born < 1400 || (listOfMother.length === 0)}
            className="select selectBlock"
            onChange={(event) => handleChangeSelect(setMother, event)}
          >
            <option value="mother">Choose mother`s name</option>
            {listOfMother.map((person) => (
              <option
                key={person.slug}
                value={person.name}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          Father:
          <select
            name="fatherName"
            disabled={newPerson.born < 1400 || (listOfFather.length === 0)}
            className="select selectBlock"
            onChange={(event) => handleChangeSelect(setFather, event)}
          >
            <option value="father">Choose father`s name</option>
            {listOfFather.map((person) => (
              <option
                key={person.slug}
                value={person.name}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="button is-hovered"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default NewPerson;
