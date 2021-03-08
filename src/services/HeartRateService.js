import axios from 'axios';

class HeartRateService {

    async getAll(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "*",
                "Access-Control-Allow-Headers": "*"
            }
        };

        const response = await axios.get("http://localhost:3001/api/heartrate", axiosConfig);
        return response.data;
    }

    async getUsers(userid){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "*",
                "Access-Control-Allow-Headers": "*"
            }
        };

        const response = await axios.get("http://localhost:3001/api/heartrate/" + userid, axiosConfig);
        return response;
    }
}

export default new HeartRateService();