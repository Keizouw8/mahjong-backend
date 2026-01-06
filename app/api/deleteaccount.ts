import type { Request, Response } from "express";
import { User } from "../../database/models";

export default async function deleteAccount(req: Request, res: Response) {
	if(!req.body.userToken) return res.status(400).json({ message: "No user token" });
	await User.findByIdAndDelete(req.body.userToken);
	res.json({ message: true });
}
