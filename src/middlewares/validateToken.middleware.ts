import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "Acesso negado, token não foi informado" });
  }
  try {
    if (!process.env.SECRET_PHRASE) {
      throw new Error("Parece que o segredo do JWT não foi definido no .env");
    }
    jwt.verify(token, process.env.SECRET_PHRASE);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ mensagem: "Token invalidado" });
  }
};

export default validateJwtToken;
