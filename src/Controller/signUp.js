document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    const user = {
        name,
        email,
        password
    };

    try {
        // Send the user data to the backend to register
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Show success message
            window.location.href = 'signIn.html'; // Redirect to login page after successful sign-up
        } else {
            alert('Sign-up failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
