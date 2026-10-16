import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function migrate() {
  console.log("Connecting to database...");
  
  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      mobile VARCHAR(50),
      email VARCHAR(255),
      location VARCHAR(255),
      plot_size VARCHAR(255),
      built_up_area VARCHAR(255),
      floors VARCHAR(50),
      expected_start_date VARCHAR(255),
      message TEXT,
      source VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Created enquiries table (or already exists).");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(255) PRIMARY KEY,
      slug VARCHAR(255) UNIQUE,
      title VARCHAR(255),
      location VARCHAR(255),
      type VARCHAR(100),
      area VARCHAR(100),
      badge VARCHAR(50),
      description TEXT,
      images JSONB,
      features JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Created projects table (or already exists).");

  // Read enquiries
  try {
    const rawEnquiries = fs.readFileSync(path.join(process.cwd(), "data", "enquiries.json"), "utf8");
    const enquiries = JSON.parse(rawEnquiries);
    for (const enq of enquiries) {
      await pool.query(
        `INSERT INTO enquiries (id, name, mobile, email, location, plot_size, built_up_area, floors, expected_start_date, message, source, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (id) DO NOTHING`,
        [enq.id, enq.name, enq.mobile, enq.email, enq.location, enq.plotSize, enq.builtUpArea, enq.floors, enq.expectedStartDate, enq.message, enq.source, new Date(enq.createdAt)]
      );
    }
    console.log(`Migrated ${enquiries.length} enquiries.`);
  } catch (e) {
    console.log("No enquiries.json found or failed to parse.", e);
  }

  // Read projects
  try {
    const rawProjects = fs.readFileSync(path.join(process.cwd(), "src", "data", "projects.json"), "utf8");
    const projects = JSON.parse(rawProjects);
    for (const proj of projects) {
      await pool.query(
        `INSERT INTO projects (id, slug, title, location, type, area, badge, description, images, features)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING`,
        [proj.id, proj.slug, proj.title, proj.location, proj.type, proj.area, proj.badge, proj.description, JSON.stringify(proj.images), JSON.stringify(proj.features)]
      );
    }
    console.log(`Migrated ${projects.length} projects.`);
  } catch (e) {
    console.log("No projects.json found or failed to parse.", e);
  }

  console.log("Migration complete!");
  process.exit(0);
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
