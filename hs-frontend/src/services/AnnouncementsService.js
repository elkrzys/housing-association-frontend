import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const AnnouncementsService = {
    getAllNotCancelled: async () => {
        try {
            let response = await axios.get(Endpoints.announcementsNotCancelled);
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
          }
    },
    getAllByReceiverId: async (receiverId) => {
        try {
            let response = await axios.get(`${Endpoints.announcementsReceiver}/${receiverId}`);
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
          }
    },
    addByBuildings: async (title, content, expirationDate, authorId, buildingsIds) => {
        try {
            let response = await axios.post(Endpoints.announcementsPostByBuildings, {
                title: title,
                content: content,
                expirationDate: expirationDate,
                author: {id: authorId},
                targetBuildingsIds: buildingsIds
            });
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
            } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
            }
    },
    addByAddress: async (title, content, expirationDate, authorId, cities, districts, streets) => {
        let addresses;
        try {
            if(cities.length){
                addresses = cities.map(city => ({city: city, district: null, street: null}));
            }else if(districts.length > 1){
                addresses = streets.map(district => ({city: cities[0], district: district, street: null}))   
            }else{
                addresses = streets.map(street => ({city: cities[0], district: districts?.[0], street: street}))   
            }
            const response = await axios.post(Endpoints.announcementsPostByAddress, {
                title: title,
                content: content,
                expirationDate: expirationDate,
                author: {id: authorId},
                addresses: addresses
            });
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
        } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
        }
    }
}
export default AnnouncementsService;