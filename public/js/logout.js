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

document.querySelector('#logout').addEventListener('click', async function (e) {
  e.preventDefault();

  try {
    const response = await fetch('/api/users/logout', {
      method: 'GET',
    });

    if (response.ok) {
      // Logout was successful, show SweetAlert success message
      showSuccessMessage('Logout successful');
      
      // Redirect to the home page
      setTimeout(() => {
        window.location.replace('/');
      }, 1500); // Redirect after 1.5 seconds (adjust as needed)
    } else {
      // Handle logout error using SweetAlert
      showErrorMessage('Logout failed');
    }
  } catch (error) {
    console.error(error);
    // Handle network or other errors using SweetAlert
    showErrorMessage('An error occurred during logout');
  }
});
