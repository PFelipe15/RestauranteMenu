import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const pratos = await prisma.prato.findMany();
    console.log("teste");
    // res.status(200).json(pratos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pratos" });
  } finally {
    await prisma.$disconnect();
  }
}
