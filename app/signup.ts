import type { Request, Response } from "express";
import { User } from "../database/models";

export default async function signup(req: Request, res: Response) {
	if(!req.body.username || !req.body.password) return res.status(400).json({ message: "Invalid request body." });
	if(!req.body.username.length || !req.body.password.length) return res.status(400).json({ message: "Username and passwords must have length." });

	let existingUser = await User.findOne({ username: req.body.username });
	if(existingUser) return res.status(400).json({ message: "Username taken." });

	let user = new User({
		username: req.body.username,
		password: await Bun.password.hash(req.body.password),
		rooms: []
	});

	await user.save();
	res.json({ message: user._id.toString() });
}
