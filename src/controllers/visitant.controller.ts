import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const visitant = {
  getHomePage: async (req: Request, res: Response) => {
    res.json({ pagina: "Voce é um visitante e está na página Home" });
  },
  getLoginPage: async (req: Request, res: Response) => {
   const {email, password} = req.body
   if (!process.env.SECRET_PHRASE) {
     throw new Error("Parece que o segredo do JWT não foi definido no .env");
   }
   if (!email || !password) return res.status(400).json({erro: "Insira um email e uma senha"})
   const token = jwt.sign(email, process.env.SECRET_PHRASE, {expiresIn: "1hr"})
   res.cookie("access-token", token, {httpOnly: true, maxAge: 60 * 60 * 100})
   res.status(200).json({message: 'Você está logado'})
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
    const {userData} = res.locals
    return res.json({ mensage: userData });
  },
};

export default visitant;
