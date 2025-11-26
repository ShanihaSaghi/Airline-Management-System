// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (in real app, this would be server-side)
            if (email && password) {
                // Store login state
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                
                // Show success message
                alert('Login successful!');
                
                // Redirect to welcome page
                window.location.href = 'welcome.html';
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Check if already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // Allow access to dashboard
        console.log('User is logged in');
    }
});