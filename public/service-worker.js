// Service Worker: Handles 'push' events triggered by a push notification.
// It listens for incoming push messages and shows a notification to the user.

self.addEventListener('push', function(event) {
  // Default notification data if none is provided
  let data = { title: 'Default title', body: 'Default body' };
 
  // If the push event has data, try to parse it as JSON
  if (event.data) {
    try {
      // Parse the data payload from the event
      data = JSON.parse(event.data.text()); 
    } catch {
      // If parsing fails, treat it as plain text and use it as body
      data = { title: 'Push', body: event.data.text() };  
    }
  }

  // Wait for the notification to be shown
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      // You can add more properties here, like icon, actions, etc.
    })
  );
});
