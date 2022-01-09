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
    console.log(s.streets[0]);

    return s;
}