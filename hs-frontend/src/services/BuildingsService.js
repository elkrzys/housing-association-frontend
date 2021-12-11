import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const BuildingsService = {
    getBuildings: async () =>{
            let responseData = null;
            try {
              responseData = await axios.get(`${Endpoints.buildings}`);
              return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
            } catch (error) {
              return { status: REQUEST_STATUS.ERROR, error };
            }
    },

    getBuildingById: async (id) =>{
        let responseData = null;
        try {
          responseData = await axios.get(`${Endpoints.buildings}/${id}`);
          return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
        } catch (error) {
          return { status: REQUEST_STATUS.ERROR, error };
        }
    },

    updateBuilding: async (id, city, district, street, number, type) => {
        let responseData = null;
        try {
          responseData = await axios.put(`${Endpoints.buildings}/${id}`, {
            city, district, street, number, type
          });
          return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
        } catch (error) {
          return { status: REQUEST_STATUS.ERROR, error };
        }
    },
}
export default BuildingsService;