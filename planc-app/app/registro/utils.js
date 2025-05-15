import {URL} from '../../constants/url.js';

export const doRegister = async (userData) => {
    const response = await fetch(`${URL}/api/users/register/`, 
        {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),

        });
        
        const data = await response.json();
        return data;
        };