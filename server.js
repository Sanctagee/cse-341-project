require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// This line connects the routes
app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>CSE 341 Project</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .container {
          text-align: center;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          max-width: 700px;
          width: 90%;
        }

        .badge {
          display: inline-block;
          background: #e94560;
          color: white;
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          background: linear-gradient(to right, #e94560, #0f3460);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 40px;
        }

        .cards {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .card {
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
          width: 180px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .card .icon { font-size: 2rem; margin-bottom: 10px; }
        .card h3 { font-size: 0.95rem; margin-bottom: 5px; }
        .card p { font-size: 0.75rem; color: rgba(255,255,255,0.5); }

        .endpoints {
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          margin-bottom: 30px;
        }

        .endpoints h2 {
          font-size: 1rem;
          margin-bottom: 15px;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .endpoint {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          font-size: 0.88rem;
        }

        .method {
          background: #e94560;
          padding: 3px 10px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 0.75rem;
          min-width: 45px;
          text-align: center;
        }

        .path { color: rgba(255,255,255,0.8); font-family: monospace; }

        .footer {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
        }

        .footer span { color: #e94560; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="badge">CSE 341 — Web Services</div>
        <h1>GabbyTech API</h1>
        <p class="subtitle">A RESTful API built with Node.js, Express & MongoDB</p>

        <div class="cards">
          <div class="card">
            <div class="icon">🚀</div>
            <h3>Live on Render</h3>
            <p>Deployed & running in production</p>
          </div>
          <div class="card">
            <div class="icon">🍃</div>
            <h3>MongoDB Atlas</h3>
            <p>Cloud database connected</p>
          </div>
          <div class="card">
            <div class="icon">🏗️</div>
            <h3>MVC Pattern</h3>
            <p>Clean architecture structure</p>
          </div>
        </div>

        <div class="endpoints">
          <h2>Available Endpoints</h2>
          <div class="endpoint">
            <span class="method">GET</span>
            <span class="path">/contacts</span>
            <span style="color:rgba(255,255,255,0.4)">— Retrieve all contacts</span>
          </div>
          <div class="endpoint">
            <span class="method">GET</span>
            <span class="path">/contacts/:id</span>
            <span style="color:rgba(255,255,255,0.4)">— Retrieve a single contact</span>
          </div>
        </div>

        <p class="footer">Built by <span>GabbyTech</span> · BYU-Idaho · Web Services CSE 341</p>
      </div>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and node is running on port ${port}`);
    });
  }
});