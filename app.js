const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

app.use(express.static(path.join(__dirname, '/public')));
app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}.`));
