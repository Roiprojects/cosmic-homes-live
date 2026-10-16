import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import projectsData from "@/data/projects.json";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    if (result.rows && result.rows.length > 0) {
      return NextResponse.json(result.rows);
    }
    return NextResponse.json(projectsData);
  } catch (error) {
    console.error("Database unavailable, serving static projects:", error);
    return NextResponse.json(projectsData);
  }
}

export async function POST(req: NextRequest) {
  try {
    const project = await req.json();
    if (!project.id) {
      project.id = Math.random().toString(36).substring(2, 9);
    }
    
    await pool.query(
      `INSERT INTO projects (id, slug, title, location, type, area, badge, description, images, features)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [project.id, project.slug, project.title, project.location, project.type, project.area, project.badge, project.description, JSON.stringify(project.images || []), JSON.stringify(project.features || [])]
    );

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json({ success: false, error: "Failed to add project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const project = await req.json();
    if (!project.id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await pool.query(
      `UPDATE projects SET slug = $1, title = $2, location = $3, type = $4, area = $5, badge = $6, description = $7, images = $8, features = $9
       WHERE id = $10`,
      [project.slug, project.title, project.location, project.type, project.area, project.badge, project.description, JSON.stringify(project.images || []), JSON.stringify(project.features || []), project.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
