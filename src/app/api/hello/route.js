import { Pool } from "pg/lib";
import { config } from "../../../../config";
import { NextResponse } from "next/server";
const pool = new Pool(config);

export async function POST(request /* , response */) {
    const { personid, chatmessage } = await request.json();
    const query = `INSERT INTO messages (personid, chatmessage)
  VALUES ('${personid}', '${chatmessage}');`;

  console.log(`Personid: ${personid}`);
  console.log(`Chatmessage: ${chatmessage}`);
  console.log(`Request Body: ${request.personid}`);


  console.log("visible");
  
    try {
      console.log("enter try");
      
      const client = await pool.connect();
      console.log("pool connected");
      await client.query(query);
      
      console.log("Success");
      return NextResponse.json({ message: "Success" });
      
    } catch (err) {
      
      console.log(`Error: ${err}`);
      console.error(err);
      
      return NextResponse.json({ message: `Error: ${err}`});
    }
  }