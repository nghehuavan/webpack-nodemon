self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('received message from web push server', data);
  event.waitUntil(processMessage(data));
});

self.addEventListener('notificationclick', (event) => {
  const data = event.data;
  console.log('received message from web push server', data);

  event.waitUntil(processMessage(data));
});

async function processMessage(data) {
  const windows = await clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });
  console.log(windows);

  if (windows && windows.length > 0) {
    sendToBroadcastChannel(data);
    self.registration.showNotification(data.title, {
      body: data.body,
      data: data,
    });
  } else {
    self.registration.showNotification(data.title, {
      body: data.body,
      data: data,
    });
  }
}

function sendToBroadcastChannel(data) {
  const channelGuilId = 'd235a86e-bc13-4539-b4a5-077de485a2fd';
  new BroadcastChannel(channelGuilId).postMessage(data);
}
