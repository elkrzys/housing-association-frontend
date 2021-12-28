import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const BuildingsService = {
    getBuildings: async () =>{
      try {
        const response = await axios.get(`${Endpoints.buildings}`);
        return { status: REQUEST_STATUS.SUCCESS, data: response.data };
      } catch (error) {
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
    getById: async (id) =>{
      try {
        const response = await axios.get(`${Endpoints.buildings}/${id}`);
        return { status: REQUEST_STATUS.SUCCESS, data: response.data };
      } catch (error) {
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
    getBuildingsByAddresses: async (city, district = null, streets) =>{
      let buildings = [];
      district = district !== null ? district : "";
      try {
        if(streets?.length){
          streets.foreach(async street => {
            const response = await axios.get(`${Endpoints.buildingsByAddress}`,{params:{city: city, street: street, district: district}});
            buildings = buildings.concat(response.data);
          })
        }else{
          const response = await axios.get(`${Endpoints.buildingsByAddress}/${city}/${district}`);
          buildings = response.data;
        } 
        return { status: REQUEST_STATUS.SUCCESS, data: buildings };
      } catch (error) {
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
    updateBuilding: async (id, city, district, street, number, type) => {
      let building =  {
        number,
        type,
        address: { city, district, street}
      };
        let responseData = null;
        try {
          responseData = await axios.put(`${Endpoints.buildings}/${id}`, {
            ...building
          });
          return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
        } catch (error) {
          return { status: REQUEST_STATUS.ERROR, error };
        }
    },
    addBuilding: async (city, district, street, number, type) => {
      let responseData = null;
      try {
        responseData = await axios.post(`${Endpoints.buildings}`, {
          
            type: type,
            number: number,
            address: {
              city: city,
              district: district,
              street: street
            }
          
        });
        return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
      } catch (error) {
        return { status: REQUEST_STATUS.ERROR, error };
      }
  },
  deleteBuilding: async (id) => {
    try{
      let responseData = await axios.delete(`${Endpoints.buildings}/${id}`);
      return {status: REQUEST_STATUS.SUCCESS, data: responseData.data};
    }
    catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  getCities: async () => {
    try{
      const response = await axios.get(`${Endpoints.cities}`);
      return {status: REQUEST_STATUS.SUCCESS, data: response.data};
    }catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  getDistricts: async (city) => {
    try{
      const response = await axios.get(`${Endpoints.districts}/${city}`);
      return {status: REQUEST_STATUS.SUCCESS, data: response.data};
    }catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  getStreets: async (city, district = null) => {
    try{
      const response = await axios.get(`${Endpoints.streets}/${city}/${district !== null ? district : ""}`);
      return {status: REQUEST_STATUS.SUCCESS, data: response.data};
    }catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default BuildingsService;