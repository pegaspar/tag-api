var express = require('express');
var router = express.Router();

module.exports = (name, client) => {
  router.get('/', (req, res) => {
    client.keys(`${name}_*`, (err, data) => {
      if (err) {
        res.sendStatus(404);
      }
      res.json(data);
    });
  })

  router.get('/:extId', function(req, res, next) {
    const extId = req.param('extId');

    client.hgetall(`${name}_${extId}`, (err, data) => {
      if (err || !data) {
        res.sendStatus(404);
      }
      res.json(data);
    });
  });

  router.post('/', (req, res) => {
    const extId = req.query.extId;

    client.hmset(`${name}_${extId}`, {
      extId: extId
    });

    res.sendStatus(201);
  });

  router.delete('/:extId', (req, res) => {
    const extId = req.param('extId');

    client.del(`${name}_${extId}`);

    res.sendStatus(200);
  });

  return router;
}