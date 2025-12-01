import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const visitant = {
  getHomePage: async (req: Request, res: Response) => {
    res.json({ pagina: "Voce é um visitante e está na página Home" });
  },
  getLoginPage: async (req: Request, res: Response) => {
    if (req.session.visits !== undefined) {
      req.session.visits++;
    } else {
      req.session.visits = 1;
    }
    console.log(req.session);
    res.send(`<h1>Contagem de visitas: ${req.session.visits} </h1>`);
  },
  postSignIn: async (req: Request, res: Response) => {
    if (!process.env.SECRET_PHRASE) {
      throw new Error("Parece que o segredo do JWT não foi definido no .env");
    }
    const { email, password } = req.body;
    const token = jwt.sign({ email }, process.env.SECRET_PHRASE, {
      expiresIn: "1h",
    });
    res.cookie("access-token", token, { maxAge: 36000 * 100, httpOnly: true });
    return res.json({ email, token });
  },
  getInsideAplication: async (req: Request, res: Response) => {
    return res.json({ mensage: "Token foi validado cheff" });
  },
};

export default visitant;
