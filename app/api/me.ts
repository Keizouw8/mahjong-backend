import type { Request, Response } from "express";
import { Room } from "../../database/models";
import getUsername from "../../database/getUsername";

type RoomType = {
	name: string,
	users: string[],
	id: string
}

export default async function me(req: Request, res: Response) {
	let user = req.user;
	let rooms: RoomType[] = [];

	for(let i = 0; i < user.rooms.length; i++){
		let room = await Room.findById(user.rooms[i]);
		if(!room){
			user.rooms.splice(i, 1);
			continue;
		}

		let users: string[] = [];

		for(let o = 0; o < room.users.length; o++){
			let user = await getUsername(room.users[o]);
			if(!user){
				room.users.splice(i, 1);
				continue;
			}
			users.push(user);
		}

		rooms.push({ name: room.name, users, id: room._id.toString() });

		room.markModified("users");
		await room.save();
	}

	user.markModified("rooms");
	await user.save();

	res.json({ message: { username: user.username, rooms } });
}
