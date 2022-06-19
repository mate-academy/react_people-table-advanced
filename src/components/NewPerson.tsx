import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import './NewPerson.scss';

const personObj = {
  born: 0,
  died: 0,
  fatherName: '',
  motherName: '',
  name: '',
  sex: '',
  slug: '',
};

const personObjError = {
  born: '',
  died: '',
  name: '',
  sex: '',
};

const NewPerson: React.FC = () => {
  const navigate = useNavigate();
  const params = useOutletContext();
  const { peopleList, setPeopleList } = useContext(DataContext);
  const year = new Date().getFullYear();
  const [formPerson, setFormPerson] = useState(personObj);
  const [errorForm, setErrorForm] = useState(personObjError);

  const males = peopleList.filter(male => male.sex === 'm'
  && +male.born > +formPerson.born + 18
  && +male.died > +formPerson.died);
  const females = peopleList.filter(female => female.sex === 'f'
  && +female.born > +formPerson.born + 18
  && +female.died > +formPerson.died);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) {
    const { name, value } = e.currentTarget;

    setFormPerson(prev => ({
      ...prev,
      [name]: name === 'born' || name === 'died' ? +value : value,
    }));

    setErrorForm(personObjError);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formPerson.name.trim().length < 5) {
      setErrorForm(prev => ({
        ...prev,
        name: 'Enter person name!',
      }));

      return;
    }

    if (!formPerson.sex) {
      setErrorForm(prev => ({
        ...prev,
        sex: 'Choose sex!',
      }));

      return;
    }

    if (!formPerson.born
      || +formPerson.born < 1400 || +formPerson.born > year) {
      setErrorForm(prev => ({
        ...prev,
        born: 'Type correct date of birth!',
      }));

      return;
    }

    if (!formPerson.died
      || +formPerson.died < +formPerson.born
      || +formPerson.died + 150 < +formPerson.born) {
      setErrorForm(prev => ({
        ...prev,
        died: 'Type correct date of death max age 150!',
      }));

      return;
    }

    setFormPerson(prev => ({
      ...prev,
      slug: `${formPerson.name.toLowerCase()}-${formPerson.born}`,
    }));

    setPeopleList([...peopleList, formPerson]);

    setErrorForm(personObjError);
    setFormPerson(personObj);
    navigate(`/peoplePage${params}`);
  }

  return (
    <div className="NewPerson">
      <div className="NewPerson__container">
        <h2>Add new person</h2>
        <button className="NewPerson__btn" type="button" onClick={() => navigate(`/peoplePage${params}`)}>X</button>
        <form onSubmit={handleSubmit} className="NewPerson__form">
          <label htmlFor="name">
            Name
          </label>
          <input
            className="NewPerson__input"
            type="text"
            id="name"
            name="name"
            value={formPerson.name}
            onChange={handleChange}
          />
          <span className="NewPerson__error">{errorForm.name}</span>
          <div className="NewPerson__section NewPerson__section--Sex">
            <div>Sex</div>
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="female"
              name="sex"
              value="f"
              onChange={handleChange}
              checked={formPerson.sex === 'f'}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="male"
              name="sex"
              value="m"
              onChange={handleChange}
              checked={formPerson.sex === 'm'}
            />
            <span className="NewPerson__error">{errorForm.sex}</span>
          </div>
          <div className="NewPerson__section NewPerson__section--born">
            <label htmlFor="born">{`Birth year 1400-${year}`}</label>
            <input
              className="NewPerson__input"
              type="number"
              id="born"
              name="born"
              value={formPerson.born || ''}
              onChange={handleChange}
            />
            <span className="NewPerson__error">{errorForm.born}</span>
            <label htmlFor="death">Death year</label>
            <input
              className="NewPerson__input"
              type="number"
              id="death"
              name="died"
              value={formPerson.died || ''}
              onChange={handleChange}
              disabled={!formPerson.born}
            />
            <span className="NewPerson__error">{errorForm.died}</span>
          </div>
          <div className="NewPerson__section NewPerson__section--parents">
            <p>Select parents</p>
            <select
              disabled={!formPerson.born}
              name="fatherName"
              value={formPerson.fatherName}
              onChange={handleChange}
            >
              <option>Choose father</option>
              {males.map(person => (
                <option
                  key={person.slug}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
            <select
              disabled={!formPerson.born}
              name="motherName"
              value={formPerson.motherName}
              onChange={handleChange}
            >
              <option>Choose mother</option>
              {females.map(person => (
                <option
                  key={person.slug}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="NewPerson__button"
            type="submit"
          >
            Add person
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPerson;
