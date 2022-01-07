import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const mapAddresses = (cities, districts, streets) => {
    if(cities.length > 1){
        return cities.map(city => ({city: city, district: null, street: null}));
    }
    if(districts.length > 1){
        return districts.map(district => ({city: cities[0], district: district, street: null}))
    }
    if(streets.length){
        return streets.map(street => ({city: cities[0], district: districts?.[0], street: street}))
    }
    throw 'Niepoprawny adres';
}

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
        try {
            const addresses = mapAddresses(cities, districts, streets);
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
    },
    cancelAnnouncement: async (id) => {
        try{
            const response = await axios.put(`${Endpoints.announcementsCancel}/${id}`);
            return {status: REQUEST_STATUS.SUCCESS, data: response.data};
        }catch(error){
            return {status: REQUEST_STATUS.ERROR, error}
        }
    },
    updateAnnouncement: async (announcement, cities, districts, streets, buildingsIds) => {
        announcement.addresses = mapAddresses(cities, districts, streets);;
        announcement.targetBuildingsIds = buildingsIds;
        try{
            const response = await axios.put(`${Endpoints.announcements}/${announcement.id}`, {...announcement});
            return {status: REQUEST_STATUS.SUCCESS, data: response.data};
        }catch(error){
            return {status: REQUEST_STATUS.ERROR, error}
        }
    }
}
export default AnnouncementsService;