//const constants = require('constants/apiConfig');
//import { BASE_URL} from 'constants/apiConfig.js';
/**
 * Fetch data from given url
 * @param {*} config
 */
const requestApi =(config={}) => {
    console.log(config);
    const urlLogin = 'localhost:3001';
    return fetch({config,baseURL: urlLogin})
        .then(res=>{
            /* console.log(res.status);
            console.log(res.data); */
            return res.data;
        })
        .catch(err =>{
            /* console.log(err.response.status);
            console.log(err.response.data); */
            return err.response.data;
        })
};

export { requestApi };
