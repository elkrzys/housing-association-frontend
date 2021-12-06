import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings'

const UsersService = {
    getUser: async (id) => {
        let responseData = null;
        try{    
            responseData = await axios.get(Endpoints.users + '/' + id);
            return {status: REQUEST_STATUS.SUCCESS, data: responseData.data};
        }catch(error){
            return {status: REQUEST_STATUS.ERROR, data: responseData};
        }
    }
    // updateUser: async (id, firstName, lastName, phoneNumber, email) => {

    // }
}
export default UsersService;