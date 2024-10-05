import { Pool } from "pg/lib";
import { config } from "../../../../config";
import { NextResponse } from "next/server";
const pool = new Pool(config);

export async function POST(request/* , response */) {
    const { personid, chatmessage } = request.body;
    const query = `INSERT INTO messages (personid, chatmessage)
  VALUES ('${personid}', '${chatmessage}');`;
  
    try {
      const client = await pool.connect();
      await client.query(query);
      /* response.json({
        message: "Success!"
      }); */
      return NextResponse.json({ message: "Success" });
    } catch (err) {
      /* response.status(500).json({
        message: err.message
      }); */
      return NextResponse.json({ message: `Error: ${err}`});
    }
  }