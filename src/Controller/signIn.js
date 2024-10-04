document.addEventListener('DOMContentLoaded', () => {
    // Automatically fetch all users when the page loads
    fetchUsers();

    // Add event listener to the form submission
    const form = document.getElementById('loginForm'); // Ensure you have a form with this ID
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;

        // Call the authentication function
        await authenticateUser(email, password);
    });
});

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
            // Do something with the users if needed
        } else {
            console.error('Failed to fetch users');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

const authenticateUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
            // Check against fetched users
            const userFound = users.some(user => 
                user.email === email && user.password === password
            );

            if (userFound) {
                window.location.href = 'inventory.html';
                

            } else {
                console.log("Authentication failed");
            }
        } else {
            console.error('Failed to fetch users');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
