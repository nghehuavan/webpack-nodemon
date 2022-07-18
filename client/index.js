const triggerSubscription = document.getElementById('trigger-subscription');
triggerSubscription.addEventListener('click', () => {
  registWebPushNotification();
});

const triggerPush = document.getElementById('trigger-push');
triggerPush.addEventListener('click', () => {
  tryPush();
});

window.addEventListener('DOMContentLoaded', (event) => {
  tryGetJson();
});
const triggerGet = document.getElementById('trigger-get');
triggerGet.addEventListener('click', () => {
  tryGetJson();
});

const tryGetJson = async () => {
  var url = document.getElementById('json-url').value;
  const resp = await fetch(url, {
    method: 'GET',
  });
  const json = await resp.json();
  const meeting = JSON.parse(json.meeting);
  const attendee = JSON.parse(json.attendee);

  const message = {
    id: 'test',
    title: 'SOS着信中',
    body: `・顧客名:XXXX樣\n・物件名:AAAA\n・部屋番号:0105`,
    type: 1,
    customer_name: 'XXXX樣',
    property_name: 'AAAA',
    room_number: '0105',
    meeting: meeting,
    attendee: attendee,
  };

  console.log(message);
  document.getElementById('json-push').value = JSON.stringify(message, null, 4);
};

const registWebPushNotification = async () => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications.');
  } else if (Notification.permission === 'denied') {
    console.error('Permission to receive notifications has been denied');
  } else if (Notification.permission === 'granted') {
    console.log('Permission to receive notifications has been granted');
    registServiceWorker();
    registBroadcastChannel();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        console.log('Permission to receive notifications has been granted');
        registServiceWorker();
        registBroadcastChannel();
      } else {
        console.error('Permission to receive notifications has been denied');
      }
    });
  }
};

const tryPush = async () => {
  await fetch('/api/push', {
    method: 'POST',
    body: document.getElementById('json-push').value,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const registServiceWorker = async () => {
  // VAPID keys should be generated only once. => same with variables.env
  const publicVapidKey = 'BAJQxEDFDWhOHnjtXw2AqcYXJlS0oGYpfJvwsOxCTYq8gM1_vvkyyL4kl4rIdytt5zhvVPZHyGeP-CeD8Szc69Y';

  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // send [subscription] json for server save
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.error('Service workers are not supported in this browser');
  }
};

const registBroadcastChannel = () => {
  const channelGuilId = 'd235a86e-bc13-4539-b4a5-077de485a2fd';
  const broadcast = new BroadcastChannel(channelGuilId);
  broadcast.onmessage = (event) => {
    console.log(event);
  };
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
