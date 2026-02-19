import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleFilters = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('century').map(Number);

  const centuries = Array.from(
    new Set(people.map(p => Math.ceil(p.born / 100))),
  ).sort((a, b) => a - b);

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value.trim()) {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('century').map(Number);

    params.delete('century');

    const updated = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    updated.forEach(c => params.append('century', String(c)));

    setSearchParams(params);
  };

  return (
    <div className="box">
      <div className="field">
        <label className="label">Name</label>
        <input
          className="input"
          value={query}
          onChange={e => handleQueryChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">Century</label>

        {centuries.map(c => (
          <label key={c} className="checkbox">
            <input
              type="checkbox"
              checked={selectedCenturies.includes(c)}
              onChange={() => toggleCentury(c)}
            />{' '}
            {c}th
          </label>
        ))}
      </div>
    </div>
  );
};
