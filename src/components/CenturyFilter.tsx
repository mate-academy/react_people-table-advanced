interface Props {
  centuries: string[];
  onChange: (newValues: string[]) => void;
  allCenturies: number[];
}

export const CenturyFilter: React.FC<Props> = ({
  centuries,
  onChange,
  allCenturies,
}) => {
  function toggleCentury(c: number) {
    const cStr = String(c);

    let updated: string[];

    if (centuries.includes(cStr)) {
      updated = centuries.filter(x => x !== cStr);
    } else {
      updated = [...centuries, cStr];
    }

    onChange(updated);
  }

  return (
    <div className="box">
      <h4 className="title is-6">Centuries</h4>
      {allCenturies.map(c => {
        const cStr = String(c);

        return (
          <label key={c} className="checkbox is-block">
            <input
              type="checkbox"
              checked={centuries.includes(cStr)}
              onChange={() => toggleCentury(c)}
            />
            {` ${c} century`}
          </label>
        );
      })}
    </div>
  );
};
