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
            let responseData = await axios.post(`${Endpoints.issues}`, {
              title,
              content,
              authorId,
              sourceLocalId,
              sourceBuildingId
            });
            return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
          } catch (error) {
            return { status: REQUEST_STATUS.ERROR, error };
          }
    },
}
export default IssuesService;