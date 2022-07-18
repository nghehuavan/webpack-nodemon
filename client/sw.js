self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('received message from web push server');
  console.log(data);

  event.waitUntil(processMessage(data));
});

self.addEventListener('notificationclick', (event) => {
  const data = event.data;
  console.log('received message from web push server');
  console.log(data);

  event.waitUntil(processMessage(data));
});

async function processMessage(data) {
  const windowClients = await clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });
  console.log(windowClients);

  if (!windowClients || windowClients.length == 0) {
    self.registration.showNotification(data.message.title, {
      body: data.message.body,
      data: data,
    });
  } else {
    sendToBroadcastChannel(data);
  }
}

function sendToBroadcastChannel(data) {
  const channelGuilId = 'd235a86e-bc13-4539-b4a5-077de485a2fd';
  new BroadcastChannel(channelGuilId).postMessage(data);
}
