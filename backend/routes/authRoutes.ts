import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import Users from "../models/Users";

const router = Router();

// register
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    res.status(200).json({ newUser });
  } catch (error) {
    console.log("Server Register", error);
    res.status(500).json({ Error: "Registration failed" });
  }
});

// login
router
  .route("/signin")
  .get(async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ where: { email } });

      if (!user) return res.status(404).json({ Error: "User not found" });

      // send only necessary user info
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      res.json(userData);
    } catch (error) {
      console.log("Server signin", error);
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // find user by email
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ Error: "User not found" });

      // check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ Error: "Invalid password" });

      // generate JWT
      const token = jwt.sign({ userId: user.id }, "jwt_secret_key");
      const resData = {
        id: user.id,
        token,
      };
      // set JWT token as cookie
      res.cookie("jwt", token, { httpOnly: true });

      res.json(resData);
    } catch (error) {
      console.log("Server login", error);
      res.status(500).json({ Error: "Login failed" });
    }
  });

// profile route
router.get("/profile/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currUSer = await Users.findOne({ where: { id } });

    if (currUSer) {
      res.json(currUSer);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Server profile", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
