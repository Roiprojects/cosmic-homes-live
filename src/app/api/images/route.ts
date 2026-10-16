import { NextResponse } from "next/server";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const IMAGES_DIR = "public/images";

export async function GET() {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.join(process.cwd(), IMAGES_DIR);

    if (!fs.existsSync(dir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(dir);
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ALLOWED_EXTENSIONS.has(ext);
      })
      .sort()
      .map((file) => ({
        name: file,
        url: `/images/${file}`,
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to list images:", error);
    return NextResponse.json({ images: [] });
  }
}

export async function POST(request: Request) {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(filename).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), IMAGES_DIR);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, url: `/images/${filename}`, name: filename });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("name");

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), IMAGES_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
