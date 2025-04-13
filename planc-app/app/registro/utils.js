export const doRegister = async (userData) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/register/",
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