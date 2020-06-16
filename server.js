const express = require('express');
const app = express();app.use(express.static(__dirname + '/'));
const path = require('path');
app.listen(process.env.PORT || 3000);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join('build', 'index.html'));
    });
}