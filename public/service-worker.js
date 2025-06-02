
self.addEventListener('push', function(event) {
  let data = { title: 'Default title', body: 'Default body' };
 
  if (event.data) {
    try {
      data = JSON.parse(event.data.text()); 
      
    } catch  {
      data = { title: 'Push', body: event.data.text() };  
    }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
     
    })
  );
});