document.getElementById('messageForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const message = document.getElementById('message').value;
  const responseElement = document.getElementById('response');

  if (!message) {
    responseElement.textContent = 'Please enter a message.';
    return;
  }

  const data = { message };

  fetch('https://script.google.com/macros/s/AKfycbwg-83pBRKF2kjE1o2EihLLFwgR_DeBNwxYc2WxanCvw7L8kCkXjcV7EHk6mbXPSRVw/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    responseElement.textContent = 'Message sent successfully!';
    document.getElementById('message').value = '';
  })
  .catch(error => {
    responseElement.textContent = 'An error occurred. Please try again.';
    console.error('Error:', error);
  });
});