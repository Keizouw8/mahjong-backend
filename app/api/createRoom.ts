import type { Request, Response } from "express";
import { Room } from "../../database/models";

export default async function createRoom(req: Request, res: Response) {
	if (!req.body.name) return res.status(400).json({ message: "No room name provided" });
	if (!req.body.name.length) return res.status(400).json({ message: "Room must have name" });

	let user = req.user;

	let room = new Room({
		name: req.body.name,
		users: [user._id],
		scores: {},
		winstreak: {
			person: user._id,
			length: 0
		}
	});

	room.scores.set(user._id.toString(), 50);
	await room.save();

	user.rooms.push(room._id);
	user.markModified("rooms");
	await user.save();

	res.json({ message: room._id });
}
