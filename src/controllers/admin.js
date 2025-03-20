import {token} from './config';
import { reqURL } from './config';

export async function DoGetMembers(page=1) {
    // get token from local storage
    const token = localStorage.getItem('token');
    return fetch(reqURL + 'getmembers', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {token},
            page
        }),
    })
        .then((response) => response.json())
        .then((data) => {            
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
