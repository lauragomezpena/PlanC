export const doLogin = async (username, password) => {
    const response = await fetch("https://das-p2-backend.onrender.com/api/users/login/",
        {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),

        });
        
        const data = await response.json();
        return data;
        };
