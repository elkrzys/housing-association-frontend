import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const LocalsService = {
  getAllByResidentId: async (residentId) => {
      try {
          const response = await axios.get(`${Endpoints.localsResident}/${residentId}`);
          return { status: REQUEST_STATUS.SUCCESS, data: response.data };
        } catch (error) {
          return { status: REQUEST_STATUS.ERROR, error};
        }
    },
  getAllByBuildingId: async (buildingId) => {
    try {
        const response = await axios.get(`${Endpoints.localsBuilding}/${buildingId}`);
        return { status: REQUEST_STATUS.SUCCESS, data: response.data };
      } catch (error) {
        return { status: REQUEST_STATUS.ERROR, error};
      }
  },
  getLocalIdByDetails: async (buildingNumber, localNumber, address) =>{
    let local = {buildingNumber, number: localNumber, address};
    try {
      const response = await axios.post(Endpoints.localByDetails, {
        ...local
      });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  addLocalToBuilding: async (buildingId, local) => {
    try{
      const response = await axios.post(Endpoints.locals, {
        buildingId: buildingId,
        number: local.number,
        area: local.area
      })
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  deleteLocal: async (id) => {
    try{
      const response = await axios.delete(`${Endpoints.locals}/${id}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  updateLocal: async(id, local) => {
    try{
      const response = await axios.put(`${Endpoints.locals}/${id}`,{
        ...local
      });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  addLocalByResident: async(localId, residentId) => {
    try{
      const response = await axios.post(`${Endpoints.localsAddResident}/${localId}/${residentId}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  deleteLocalByResident: async(localId, residentId) => {
    try{
      const response = await axios.delete(`${Endpoints.localsRemoveResident}/${localId}/${residentId}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  }
}
export default LocalsService;