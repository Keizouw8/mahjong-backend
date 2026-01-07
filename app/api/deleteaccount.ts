import type { Request, Response } from "express";
import { User } from "../../database/models";

export default async function deleteAccount(req: Request, res: Response) {
	await User.findByIdAndDelete(req.user._id);
	res.json({ message: true });
}
