
  function showSuccessMessage(message) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  // Function to show SweetAlert error message
  function showErrorMessage(message) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  document.getElementById('login').addEventListener('click', async function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Login was successful, show SweetAlert success message
        const data = await response.json();
        showSuccessMessage(data.message || 'Login successful');
        
        // Redirect to /dashboard (optional)
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 1500); // Redirect after 1.5 seconds (adjust as needed)
      } else {
        // Handle login error using SweetAlert
        const data = await response.json();
        showErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      // Handle network or other errors using SweetAlert
      showErrorMessage('An error occurred during login');
    }
  });
