import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const DocumentsService = {
  getByAuthor: async (userId) => {
    try{
        const response = await axios.get(`${Endpoints.documentsByAuthor}/${userId}`);
        return { status: REQUEST_STATUS.SUCCESS, data: response.data }; 
    }catch(error){
      return { status: REQUEST_STATUS.ERROR, error }; 
    }
  },
  getByReceiver: async (userId) => {
    try{
      const response = await axios.get(`${Endpoints.documentsByReceiver}/${userId}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data }; 
    }catch(error){
      return { status: REQUEST_STATUS.ERROR, error }; 
    }
    },
  deleteDocument: async (id) => {
    try{
      const response = await axios.delete(`${Endpoints.documents}/${id}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data }; 
    }catch(error){
      return { status: REQUEST_STATUS.ERROR, error }; 
    }
  }  
}
export default DocumentsService;