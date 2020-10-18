import client from '../config/axios';

const authToken = token => {
    if(token){
        client.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete client.defaults.headers.common['x-auth-token'];
    }
}
export default authToken;