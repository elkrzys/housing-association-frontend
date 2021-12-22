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
    
}
export default LocalsService;