import { NextApiRequest, NextApiResponse } from "next";
import { r2rClient } from "r2r-js";

const client = new r2rClient("http://localhost:8000");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { query } = req.body;

    try {
      // Login with each request. In a production app, you'd want to manage sessions.
      await client.login("admin@example.com", "change_me_immediately");

      const response = await client.rag({
        query: query,
        rag_generation_config: {
          model: "gpt-4o",
          temperature: 0.0,
          stream: false,
        },
      });

      res.status(200).json({
        result: response.results.completion.choices[0].message.content,
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
