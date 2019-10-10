import axios from 'axios';
import ApiService from './apiService'

const apiService = ApiService(axios)

export {
    apiService
};
