import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

export default async function handler(request, response) {
    const { personid, chatmessage } = request.body;
    const query = `INSERT INTO messages (personid, chatmessage)
  VALUES ('${personid}', '${chatmessage}');`;
  
    try {
      const client = await pool.connect();
      await client.query(query);
      response.json({
        message: "Success!"
      });
    } catch (err) {
      response.status(500).json({
        message: err.message
      });
    }
  }