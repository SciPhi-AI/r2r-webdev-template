import { NextApiRequest, NextApiResponse } from "next";
import { r2rClient } from "r2r-js";

const client = new r2rClient("http://localhost:7272");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const response = await client.retrieval.rag({
        query: query,
      });
      console.log(response);

      res.status(200).json({
        result: response.results.generatedAnswer,
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
