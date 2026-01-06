import type { Request, Response } from "express";
import { User } from "../database/models";

export default async function signup(req: Request, res: Response) {
	if(!req.body.username || !req.body.password) return res.status(400).json({ message: "Invalid request body." });
	if(!req.body.username.length || !req.body.password.length) return res.status(400).json({ message: "Username and passwords must have length." });

	let user = await User.findOne({ username: req.body.username });
	if(!user) return res.status(404).json({ message: "No user with username" });
	if (!(await Bun.password.verify(req.body.password, user.password))) return res.status(401).json({ message: "Incorrect password" });

	res.json({ message: user._id.toString() });
}
