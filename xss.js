// Step 1: Get the Authorization token from the <meta> tag
const token = document.querySelector('meta[name="gq-api-token"]').getAttribute('content');

// Step 2: Create the HTTP request to /api/v1/whoami
fetch('/api/v1/whoami', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': '*/*',
    'User-Agent': navigator.userAgent,
    'Accept-Language': 'en-GB,en;q=0.9',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': window.location.href,
  }
})
.then(response => response.json())  // Parse the JSON response
.then(data => {
  // Convert the response to a string (JSON)
  const dataStr = JSON.stringify(data, null, 2);

  // Create a Blob with the response data
  const blob = new Blob([dataStr], { type: 'text/plain' });

  // Create a link to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'response.txt';  // Name of the file
  link.click();  // Programmatically click the link to start the download
})
.catch(error => {
  // Handle any errors and save them in a text file
  const errorStr = 'Error: ' + error.message;
  const blob = new Blob([errorStr], { type: 'text/plain' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'error.txt';  // Name the error file
  link.click();
});
