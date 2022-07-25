const express = require('express');
const router = express.Router();
async function startup() {
  // setup webpush
  const webPush = require('web-push');
  const publicVapidKey = 'BAJQxEDFDWhOHnjtXw2AqcYXJlS0oGYpfJvwsOxCTYq8gM1_vvkyyL4kl4rIdytt5zhvVPZHyGeP-CeD8Szc69Y';
  const privateVapidKey = 'bBGAR9h95vBmWvLKSjJDw6PJbK64ve77m6LfGMzacuI';
  webPush.setVapidDetails('mailto:nghe.huavan@gmail.com', publicVapidKey, privateVapidKey);

  // setup database
  const db = await require('./sqlite');

  // Subscribe route => save to database
  router.post('/subscribe', async (req, res) => {
    const subscription = req.body;
    console.log('[new] subscription:', subscription);

    // save to db: map user <=> subscription json
    const key = 'someUserId'; // should change on every user by token
    await db.insert('INSERT INTO "subscriptions" ("key","data") VALUES($key,$data) ON CONFLICT("key") DO UPDATE SET "data" = $data', {
      bind: { key: key, data: JSON.stringify(subscription) },
    });

    res.status(201).json({});
  });

  router.post('/push', async (req, res) => {
    let { data, subscribe } = req.body;
    if (subscribe == null) {
      console.log('[push] use subscribe json from sqlite');
      const key = 'someUserId'; // should change on every user by token
      const rows = await db.select('SELECT * FROM "subscriptions" WHERE "key" = $$key', {
        bind: { key: key },
      });
      if (rows.length > 0) {
        subscribe = JSON.parse(rows[0].data);
      }
    }
    if (subscribe) {
      console.log('[push] subscription:', subscribe);
      await webPush.sendNotification(subscribe, JSON.stringify(data));
      res.status(201).json({});
    }
    else{
      res.status(400).json({ message: 'subscription not found !' });
    }
  });

  router.get('/db', async (req, res) => {
    const rows = await db.select('SELECT * FROM "subscriptions"');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows, null, 4));
  });
}

startup().catch(console.error);

module.exports = router;
