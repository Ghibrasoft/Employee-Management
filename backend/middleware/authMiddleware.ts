import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "my_jwt_key",
      (err: jwt.VerifyErrors | null, decodedToken: JwtPayload | any) => {
        if (err) {
          console.log(err.message);
          res.redirect("/");
        } else {
          console.log(decodedToken);
          next();
          res.redirect("/profile");
        }
      }
    );
  } else {
    res.redirect("/");
  }
};
