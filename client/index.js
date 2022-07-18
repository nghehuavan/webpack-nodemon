const triggerSubscription = document.getElementById('trigger-subscription');
triggerSubscription.addEventListener('click', () => {
  registWebPush();
});

const triggerPush = document.getElementById('trigger-push');
triggerPush.addEventListener('click', () => {
  tryPush();
});

window.addEventListener('DOMContentLoaded', (event) => {
  tryGetJson();
});

const tryGetJson = async () => {
  const resp = await fetch('https://973d6.mocklab.io/thing/meet', {
    method: 'GET',
  });
  const json = await resp.json();
  const info = {
    id: 'test',
    type: 1,
    type_name: 'SOS着信中',
    customer_name: 'XXXX樣',
    property_name: 'AAAA',
    room_number: '0105',
  };
  const meeting = JSON.parse(json.meeting);
  const attendee = JSON.parse(json.attendee);
  const jsonMerge = {
    meeting: meeting,
    attendee: attendee,
    info: info,
  };

  console.log(jsonMerge);
  document.getElementById('json-push').value = JSON.stringify(jsonMerge, null, 4);
};

const registWebPush = async () => {
  registServiceWorker();
  registBroadcastChannel();
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

    console.log('waiting for acceptance');
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
    console.log('acceptance complete');
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
