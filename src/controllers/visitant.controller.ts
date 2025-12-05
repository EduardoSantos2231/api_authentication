import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { user } from "../utils.js";
import bcrypt from "bcrypt";

const visitant = {
  getHomePage: async (req: Request, res: Response) => {
    res.json({ pagina: "Voce é um visitante e está na página Home" });
  },

  login: async (req: Request, res: Response) => {
    if (!process.env.SECRET_PHRASE) {
      throw new Error("Parece que o segredo do JWT não foi definido no .env");
    }
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ erro: "Insira um email e uma senha" });
    const hasUser = await user.findFirst({ where: { email: email } });

    if (!hasUser)
      return res
        .status(400)
        .json({
          erro: "Credenciais não encontradas, certifique-se que o email atual está cadastrado",
        });
    const passwordMatches = await bcrypt.compare(password, hasUser.password);
    if (!passwordMatches)
      return res.status(400).json({ erro: "Credenciais inválidas" });
    const token = jwt.sign(
      { email: hasUser.email, id: hasUser.id },
      process.env.SECRET_PHRASE,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("access-token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 100,
    });
    return res.status(200).json({ message: "Você está logado" });
  },

  register: async (req: Request, res: Response) => {
    if (!process.env.SECRET_PHRASE) {
      throw new Error("Parece que o segredo do JWT não foi definido no .env");
    }
    const { email, password, name } = req.body;
    try {
      const hasUser = await user.findFirst({ where: { email: email } });

      if (hasUser)
        return res.status(400).json({ erro: "Esse email já está em uso" });
      const hashedPasssword = await bcrypt.hash(password, 10);

      const createdUser = await user.create({
        data: { email: email, name: name, password: hashedPasssword },
      });

      const token = jwt.sign(
        { email: createdUser.email, id: createdUser.id },
        process.env.SECRET_PHRASE,
        {
          expiresIn: "1h",
        },
      );

      res.cookie("access-token", token, { maxAge: 3600000, httpOnly: true });
      return res.status(201).json({
        mensagem: "Parabens, você está cadastrado",
        user: { id: createdUser.id, name: createdUser.email },
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ erro: "Não foi possível cadastrar o usuário" });
    }
  },

  getInsideAplication: async (req: Request, res: Response) => {
    const { userData } = res.locals;
    return res.json({ mensage: userData });
  },
};

export default visitant;
