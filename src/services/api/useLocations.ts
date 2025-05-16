import axios from 'axios';
import rickAndMotyAPIEndpoints from './endpoints';

const API_URL = rickAndMotyAPIEndpoints.locations;


export async function fetchLocation (locationId: number) {
    try {
        const response = await axios.get(`${API_URL}/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations', error);
        return null;
    }
}
