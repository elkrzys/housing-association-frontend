import {Text} from '@chakra-ui/react'
import {BuildingsService} from '../../services'

export const getSelections = async (selections, announcement) => {
    let s = selections;
    s.cities = [
      ...new Set(announcement.addresses.map(address => address.city)),
    ];
    if (s.cities.length < 2) {
      s.districts = [
        ...new Set(announcement.addresses.map(address => address.district)),
      ];
      s.districts = selections.districts.filter(d => d !== null);
      if (s.districts.length < 2) {
        s.streets = [
          ...new Set(announcement.addresses.map(address => address.street)),
        ];
        if (s.streets.length) {
          s.buildingsIds = [...announcement.targetBuildingsIds];
          if (
            s.cities.length === 1 ||
            s.districts.length === 1
          ) {
            const buildingsResponse = await BuildingsService.getBuildingsByIds(
              s.buildingsIds,
            );
            
            if (buildingsResponse.status === 'SUCCESS')
              s.buildings = buildingsResponse.data;
            else
              throw 'Buildings error';
          }
        }
      }
    }
    return s;
}

export const handleSetValues = (values, targetSetHandler, refreshHandler) => {
  if(values){
    targetSetHandler(values);
    refreshHandler?.();
  }
}

export const getAddressErrorEnding = (source) => {
  switch (source) {
    case 'cities':
      return 'miast';
    case 'districts':
      return 'dzielnic';
    case 'streets':
      return 'ulic';
    case 'buildings':
      return 'budynków';
    default:
      return '';
  }
}

export const getCities = async (handleSetCities, handleError) => {
  const response = await BuildingsService.getCities();
  if (response.status === 'SUCCESS') {
    handleSetCities(response.data);
  } else {
    handleError('cities');
  }
};

export const getDistricts = async (city, handleSetDistricts, handleError) => {
  const response = await BuildingsService.getDistricts(city);
  if (response.status === 'SUCCESS') {
    handleSetDistricts(response.data);
  } else {
    handleError('districts');
  }
};
export const getStreets = async (city, district, handleSetStreets, handleError) => {
  const response = await BuildingsService.getStreets(city, district);
  if (response.status === 'SUCCESS') {
    handleSetStreets(response.data);
  } else {
    handleError('streets')
  }
};
export const getBuildings = async (city, streets, district = null, handleSetBuildings, handleError) => {
  const response = await BuildingsService.getBuildingsByAddresses(
    city,
    district,
    streets,
  );
  if (response.status === 'SUCCESS') {
    handleSetBuildings(response.data);
  } else {
    handleError('buildings');
  }
};



export const showActualAddresses = (selections) => {
  console.log(selections)
  return (
    <>
      <Text>Miasta: {selections.cities.map(c => `${c}, `)}</Text>
      {selections.districts?.length !== 0 &&
        selections.cities.length === 1 && (
          <Text>
            Dzielnice: {selections.districts.map(d => `${d}, `)}
          </Text>
        )}
      {selections.streets.length && (
        <Text>Ulice: {selections.streets.map(s => `${s}, `)}</Text>
      )}
      {selections.streets.length === 1 && (
        <Text>
          Numery budynków:
          {selections.buildings.map(b => `${b.number}, `)}
        </Text>
      )}
    </>
  );
};