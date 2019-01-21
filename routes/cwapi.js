const express = require('express');
const router = express.Router();

const cw = require('../utils/config.js').cwapi;

var conditions = `dateEntered > [2019-01-01T00:00:00Z]
                  AND closedFlag=false
                  AND status/name="New"
                  AND board/name="Notifications"`;


router.get('/', (req, res) => {
  cw.ServiceDeskAPI.Tickets.getTickets({conditions: conditions})
      .then(function (result){
          res.send(result)
      })
      .catch(function (error){
        res.send(error)
      });
});

router.post('/notes', (req, res) => {
  cw.ServiceDeskAPI.ServiceNotes.getServiceNotes (req.body.id)
      .then(function (result){
          res.send(result)
      })
      .catch(function (error){
        res.send(error)
      });
});

module.exports = router;
