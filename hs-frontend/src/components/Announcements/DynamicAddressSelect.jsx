import React from 'react';
import { Stack } from '@chakra-ui/react';
import { ReactSelect } from '../Inputs';

const DynamicAddressSelect = ({
  values,
  cities,
  streets,
  districts,
  buildings,
  handleSelectStreets,
  handleSelectDistricts,
  handleSelectCities,
}) => {
  return (
    <Stack>
      {cities.length && (
        <ReactSelect
          options={cities.map(c => ({ value: c, label: c }))}
          isMulti={true}
          name="cities"
          openMenuOnClick={true}
          onChange={async vals => await handleSelectCities(vals)}
          placeholder="Miasta"
        />
      )}
      {values.cities.length === 1 && districts.length && (
        <ReactSelect
          options={districts.map(d => ({ value: d, label: d }))}
          isMulti={true}
          name="districts"
          openMenuOnClick={true}
          onChange={async vals => await handleSelectDistricts(vals)}
          placeholder="Dzielnice"
        />
      )}
      {values.cities.length === 1 &&
        values.districts.length < 2 &&
        streets.length && (
          <ReactSelect
            options={streets.map(s => ({ value: s, label: s }))}
            isMulti={true}
            name="streets"
            openMenuOnClick={true}
            onChange={async vals =>
              await handleSelectStreets(
                values.cities[0],
                vals,
                values.districts?.[0],
              )
            }
            placeholder="Ulice"
          />
        )}
      {values.cities.length === 1 &&
        values.districts.length < 2 &&
        values.streets.length === 1 &&
        buildings.length && (
          <ReactSelect
            options={buildings.map(b => ({
              value: b.id,
              label: `${b.address.street} ${b.number}`,
            }))}
            isMulti={true}
            name="buildings"
            openMenuOnClick={true}
            placeholder="Budynki"
          />
        )}
    </Stack>
  );
};
export default DynamicAddressSelect;
