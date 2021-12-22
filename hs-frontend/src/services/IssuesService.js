import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const IssuesService = {
    getAllNotCancelled: async () => {
        try {
            let response = await axios.get(Endpoints.issues);
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
          }
    },
    getAllByAuthorId: async (authorId) => {
        try {
            let response = await axios.get(`${Endpoints.issuesByAuthor}${authorId}`);
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
          }
    },
    getById: async (id) => {
        try {
            let response = await axios.get(`${Endpoints.issues}/${id}`);
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error};
          }
    },
    addIssue: async (title, content, local, authorId) => {
        let sourceLocalId = local.localId;
        let sourceBuildingId = local.buildingId;

        try {
            let response = await axios.post(`${Endpoints.issues}`, {
              title,
              content,
              author:{id: authorId},
              sourceLocalId,
              sourceBuildingId
            });
            return { status: REQUEST_STATUS.SUCCESS, data: response.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error };
          }
    },
    cancelIssue: async (id) => {
      try{
        let response = axios.put(`${Endpoints.issuesCancel}/${id}`)
      }catch(error){
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
    resolveIssue: async (id) => {
      try{
        let response = axios.put(`${Endpoints.issuesResolve}/${id}`)
      }catch(error){
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
    updateIssue: async (id, title, content, author, local) => {
      let sourceLocalId = local.localId;
      let sourceBuildingId = local.buildingId;
      try{
        const response = axios.put(`${Endpoints.issues}/${id}`, {
          title: title,
          content: content,
          author: author,
          sourceLocalId,
          sourceBuildingId
        });
        return { status: REQUEST_STATUS.SUCCESS, data: response.data };
      }catch(error){
        return { status: REQUEST_STATUS.ERROR, error };
      }
    },
}
export default IssuesService;