import { Types } from "mongoose";
import { User } from "./models";

export default async function getUsername(uid: Types.ObjectId): Promise<string | undefined> {
	let user = await User.findById(uid, { username: 1 });
	if (!user) return undefined;
	return user.username;
}
