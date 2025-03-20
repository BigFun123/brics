import {token} from './config';
import { reqURL } from './config';
import { uploadsURL } from './config';

export function getImageURL(filename) {
    return uploadsURL +  filename;
}

export async function DoSignIn(email, pass, remember) {    
    return fetch(reqURL + 'signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: pass,
            remember: remember,
        }),
    })
        .then((response) => {
            console.log(response);
            return response.json()
        }
        )
        .then((data) => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function DoSignOut() {
    // get token from local storage
    const token = localStorage.getItem('token');
    return fetch(reqURL + 'signout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {token},
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

export async function DoTransfer( amount, sender, recipient) {
    // get token from local storage
    if (!sender || !recipient) {
        console.log('No sender or recipient');
        return {success: false, message: 'No sender or recipient'};
    }
    const token = localStorage.getItem('token');
    const json = {
        token: {token},
        amount: amount,
        fromuserid: sender, // will use session, but good for hack check
        touserid: recipient,
    };
    return fetch(reqURL + 'transfer', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    })
        .then((response) => response.json())
        .then((data) => {            
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function DoGetUser(userid) {
    // get token from local storage
    const token = localStorage.getItem('token');
    return fetch(reqURL + 'getuser', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {token},
            userid: userid,
        }),
    })
        .then((response) => response.json())
        .then((data) => {            
            return {
                userid: data.userid,
                title: data.name,
                value: data.balance,
                rating: data.rating,
                interval: 'Last 30 days',
                trend: 'up',
                data: [0, 0],
            };
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function DoBuy( amount, recipient) {
    // get token from local storage
    const token = localStorage.getItem('token');
    const json = {
        token: {token},
        amount: amount,
        recipient: recipient,
    };
    return fetch(reqURL + 'buy', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function DoListItem(data) {
    // get token from local storage
    //const token = localStorage.getItem('token');
    //const json = {
      //  token: {token},
        //data: data,
    //};
    return fetch(reqURL + 'listitem', {
        method: 'POST',
        credentials: 'include',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: data,
    })
        .then((response) => response.json())
        .then((data) => {            
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function DoGetItems() {
    // get token from local storage
    const token = localStorage.getItem('token');
    return fetch(reqURL + 'getitems', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {token},
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

export async function DoGetItem(itemid) {
    // get token from local storage
    const token = localStorage.getItem('token');
    return fetch(reqURL + 'getitem', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {token},
            itemid: itemid,
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

export async function DoUpload(formdata) {
    // get token from local storage
    //const token = localStorage.getItem('token');
    //formdata.append('token', token);
    return fetch(reqURL + 'upload', {
        method: 'POST',
        credentials: 'include',
        body: formdata,
    })
        .then((response) => response.json())
        .then((data) => {            
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
