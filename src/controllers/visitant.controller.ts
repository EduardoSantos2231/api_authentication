import type { Request, Response } from "express";

const visitant = {
  getHomePage: async(req: Request, res: Response) => {
    res.json({pagina: "Voce é um visitante e está na página Home"})
  },
  getLoginPage: async(req: Request, res: Response)=>{
    if (req.session.visits !==undefined){
      req.session.visits++
    }
    else{
      req.session.visits = 0;
    }
    res.send(`<h1>Contagem de visitas: ${req.session.visits} </h1>`)
  },
}

export default visitant