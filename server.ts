import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new Database('database.sqlite');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT NOT NULL,
    bio TEXT,
    linkedin TEXT,
    mail TEXT,
    github TEXT,
    type TEXT NOT NULL -- 'leader' or 'member'
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple auth middleware for admin routes
  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    // In a real app, use a proper session/token. For this demo, we use a simple secret token.
    if (authHeader === 'Bearer admin-secret-token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  // --- API Routes ---

  // Events
  app.get('/api/events', (req, res) => {
    const events = db.prepare('SELECT * FROM events ORDER BY id DESC').all();
    res.json(events);
  });

  app.post('/api/events', requireAuth, (req, res) => {
    const { title, date, time, location, image, description, status } = req.body;
    const stmt = db.prepare('INSERT INTO events (title, date, time, location, image, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(title, date, time, location, image, description, status);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete('/api/events/:id', requireAuth, (req, res) => {
    const stmt = db.prepare('DELETE FROM events WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  });

  // Team
  app.get('/api/team', (req, res) => {
    const team = db.prepare('SELECT * FROM team').all();
    res.json(team);
  });

  app.post('/api/team', requireAuth, (req, res) => {
    const { name, role, image, bio, linkedin, mail, github, type } = req.body;
    const stmt = db.prepare('INSERT INTO team (name, role, image, bio, linkedin, mail, github, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, role, image, bio, linkedin, mail, github, type);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete('/api/team/:id', requireAuth, (req, res) => {
    const stmt = db.prepare('DELETE FROM team WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  });

  // Achievements
  app.get('/api/achievements', (req, res) => {
    const achievements = db.prepare('SELECT * FROM achievements ORDER BY year DESC').all();
    res.json(achievements);
  });

  app.post('/api/achievements', requireAuth, (req, res) => {
    const { title, year, category, image, description, icon } = req.body;
    const stmt = db.prepare('INSERT INTO achievements (title, year, category, image, description, icon) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(title, year, category, image, description, icon);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete('/api/achievements/:id', requireAuth, (req, res) => {
    const stmt = db.prepare('DELETE FROM achievements WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  });

  // Admin Login
  app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === 'erise2026') { // Hardcoded password for demo
      res.json({ token: 'admin-secret-token' });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
