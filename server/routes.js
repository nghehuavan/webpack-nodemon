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
    const message = req.body;

    const key = 'someUserId'; // should change on every user by token
    const rows = await db.select('SELECT * FROM "subscriptions" WHERE "key" = $$key', {
      bind: { key: key },
    });

    if (rows.length > 0) {
      const subscription = JSON.parse(rows[0].data);
      console.log('[push] subscription:', subscription);
      console.log('message:', message);
      await webPush.sendNotification(subscription, JSON.stringify(message));
    }

    res.status(201).json({});
  });

  router.get('/db', async (req, res) => {
    const rows = await db.select('SELECT * FROM "subscriptions"');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows, null, 4));
  });
}

startup().catch(console.error);

module.exports = router;
