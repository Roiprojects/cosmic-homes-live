import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM enquiries ORDER BY created_at DESC");
    const enquiries = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      mobile: row.mobile,
      email: row.email,
      location: row.location,
      plotSize: row.plot_size,
      builtUpArea: row.built_up_area,
      floors: row.floors,
      expectedStartDate: row.expected_start_date,
      message: row.message,
      source: row.source,
      createdAt: row.created_at
    }));
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("Failed to load enquiries:", error);
    return NextResponse.json({ success: false, enquiries: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const rawMobile = data.mobile || data.phone || "";
    const cleanMobile = String(rawMobile).replace(/\D/g, "");

    if (!/^\d{10}$/.test(cleanMobile)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const id = Math.random().toString(36).substring(2, 9);
    
    await pool.query(
      `INSERT INTO enquiries (id, name, mobile, email, location, plot_size, built_up_area, floors, expected_start_date, message, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        data.name,
        cleanMobile,
        data.email,
        data.location,
        data.plotSize,
        data.builtUpArea,
        data.floors,
        data.expectedStartDate,
        data.message,
        data.source || "Website"
      ]
    );

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Failed to add enquiry:", error);
    return NextResponse.json({ success: false, error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await pool.query("DELETE FROM enquiries WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete enquiry:", error);
    return NextResponse.json({ success: false, error: "Failed to delete enquiry" }, { status: 500 });
  }
}
