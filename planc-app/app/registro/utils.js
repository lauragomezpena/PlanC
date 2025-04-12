export const doRegister = async (userData) => {
    const response = await fetch("https://das-p2-backend.onrender.com/api/users/register/",
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