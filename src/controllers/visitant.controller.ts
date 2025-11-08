import type { Request, Response } from "express";

const visitant = {
  getHomePage: async(req: Request, res: Response) => {
    res.json({pagina: "Voce é um visitante e está na página Home"})
  }
}

export default visitant