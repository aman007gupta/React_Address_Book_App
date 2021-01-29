import config from "../config/config";
import AxiosService from "./AxiosService";

const service = new AxiosService();
export default class AddressService {
    baseUrl = config.baseUrl;
    addContact(requestData) {
        return service.Post('/create', requestData);
    }

    getAllContactData() {
        return service.get('');
    }

    updateContactData(id, requestData) {
        return service.put('/update/' + id, requestData)
    }

    deleteContactData(data) {
        return service.delete('/delete/' + data)
    }

    getContactById(id) {
        return service.get('/get/' + id)
    }
}