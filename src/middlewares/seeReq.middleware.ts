import type { Request, Response, NextFunction } from "express";

const seeRequisition = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method);
  next();
};

export default seeRequisition;
