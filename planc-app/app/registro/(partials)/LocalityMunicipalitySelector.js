import React from "react";
import { comunidades } from "./constants";

const LocalityMunicipalitySelector = ({
  locality, setLocality,
  municipality, setMunicipality
}) => {
  return (
    <>
      <select
        value={locality}
        name="locality"
        onChange={(e) => {
          setLocality(e.target.value);
          setMunicipality(""); // reset municipality on locality change
        }}
        required
      >
        <option value="">Selecciona una localidad</option>
        {Object.keys(comunidades).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {locality && (
        <select
          value={municipality}
          name="municipality"
          onChange={(e) => setMunicipality(e.target.value)}
          required
        >
          <option value="">Selecciona un municipio</option>
          {comunidades[locality].map((mun) => (
            <option key={mun} value={mun}>
              {mun}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default LocalityMunicipalitySelector;
