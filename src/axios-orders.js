import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-74ddd.firebaseio.com/'
});

export default instance;