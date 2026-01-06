import { Request, Response, NextFunction,  Router } from "express";
import { User } from "../../database/models";

import me from "./me";
import deleteAccount from "./deleteaccount";

export const api = Router();

api.use(async function (req: Request, res: Response, next: NextFunction) {
	if(!req.body.userToken) return res.status(400).json({ message: "No user token" });
	let user = await User.findById(req.body.userToken);
	if (!user) return res.status(404).json({ message: "Unauthenticated" });

	req.user = user;

	next();
});

api.post("/me", me);
api.post("/deleteaccount", deleteAccount);
