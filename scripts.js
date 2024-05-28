const webAppUrl = 'https://script.google.com/macros/s/AKfycbx33bMcwpTIidBAM4mJaT9IxzorxZEyvHJK8q9W5uMZxyFDe_rJV9Yhumw6ancTKned4w/exec'; // Replace with your Google Apps Script Web App URL

async function fetchMessages() {
  const response = await fetch(webAppUrl);
  const messages = await response.json();
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `[${new Date(msg.timestamp).toLocaleString()}] ${msg.message}`;
    messagesDiv.appendChild(msgDiv);
  });
}

async function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
    await fetch(webAppUrl, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    messageInput.value = '';
    fetchMessages();
  }
}

// Fetch messages every 5 seconds
setInterval(fetchMessages, 5000);
fetchMessages();
