const express = require('express');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activities');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/activities', activitiesRouter);

// Basic home route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Fitness Activity Finder</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        </style>
      </head>
      <body>
        <h1>Fitness Activity Finder API</h1>
        <p>Available endpoints:</p>
        <ul>
          <li><code>GET /api/activities/nearby?lat={latitude}&lng={longitude}&type={activityType}</code> - Find nearby activities</li>
          <li><code>POST /api/activities/{activityId}/join</code> - Join an activity</li>
          <li><code>GET /api/activities</code> - List all activities</li>
        </ul>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;