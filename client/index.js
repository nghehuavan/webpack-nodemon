const triggerSubscription = document.getElementById('trigger-subscription');
triggerSubscription.addEventListener('click', () => {
  registWebPushNotification();
});

const triggerPush = document.getElementById('trigger-push');
triggerPush.addEventListener('click', () => {
  tryPush();
});

window.addEventListener('DOMContentLoaded', (event) => {
  tryGetJsonHotLine();
});

const triggerGet = document.getElementById('trigger-get-hotline');
triggerGet.addEventListener('click', () => {
  tryGetJsonHotLine();
});

const triggerGetSos = document.getElementById('trigger-get-sos');
triggerGetSos.addEventListener('click', () => {
  tryGetJsonSos();
});

const tryGetJsonHotLine = async () => {
  var url = document.getElementById('json-url').value;
  const resp = await fetch(url, {
    method: 'GET',
  });
  const json = await resp.json();
  const meeting = JSON.parse(json.meeting);
  const attendee = JSON.parse(json.attendee);

  const jsonType1 = {
    type: 1,
    id: 'hotline_001',
    title: 'ホットライン着信中',
    body: `・顧客名:XXXX樣\n・物件名:AAAA\n・部屋番号:0105`,
    customer_name: 'XXXX樣',
    property_name: 'AAAA',
    room_number: '0105',
    meeting: meeting,
    attendee: attendee,
  };

  console.log(jsonType1);
  document.getElementById('json-push-data').value = JSON.stringify(jsonType1, null, 4);
};

const tryGetJsonSos = async () => {
  const jsonType2 = {
    type: 2,
    id: 'sos_001',
    title: '緊急通報　受信中',
    body: `・顧客名:XXXX樣\n・物件名:AAAA\n・部屋番号:0105`,
    customer_name: 'XXXX樣',
    property_name: 'AAAA',
    room_number: '0105',
    sos_title: '侵入',
    url: 'https://raw.githubusercontent.com/nghehuavan/js-video-player-codec/main/video/frag/frag_ytb.mp4',
  };

  document.getElementById('json-push-data').value = JSON.stringify(jsonType2, null, 4);
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
  const data = document.getElementById('json-push-data').value;
  const subscribe = document.getElementById('json-push-subscribe').value;
  await fetch('/api/push', {
    method: 'POST',
    body: JSON.stringify({
      data: data ? JSON.parse(data) : null,
      subscribe: subscribe ? JSON.parse(subscribe) : null,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const registServiceWorker = async () => {
  // VAPID keys should be generated only once. => same with variables.env
  const publicVapidKey = 'BAJQxEDFDWhOHnjtXw2AqcYXJlS0oGYpfJvwsOxCTYq8gM1_vvkyyL4kl4rIdytt5zhvVPZHyGeP-CeD8Szc69Y';

  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    window.navigator.serviceWorker.ready.then(async function (registration) {
      console.log('A service worker is active:', registration.active);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      document.getElementById('json-push-subscribe').value = JSON.stringify(subscription, null, 4);

      // send [subscription] json for server save
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
