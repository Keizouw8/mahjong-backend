import { model, Schema, Types, Document } from "mongoose";

export interface IUser extends Document {
	username: string;
	password: string;
	rooms: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	rooms: { type: [{ type: Schema.Types.ObjectId, ref: "rooms" }], required: true }
});

export const User = model<IUser>("users", userSchema);

export interface IRoom extends Document {
	name: string;
	users: Types.ObjectId[];
	scores: Map<string, number>,
	winstreak: {
		person: Types.ObjectId,
		length: number
	}
}

const roomSchema = new Schema<IRoom>({
	name: { type: String, required: true },
	users: { type: [{ type: Schema.Types.ObjectId, ref: "users" }], required: true },
	scores: { type: Map, of: Number, required: true },
	winstreak: {
		person: { type: Schema.Types.ObjectId, required: true },
		length: { type: Number, required: true }
	}
});

export const Room = model<IRoom>("rooms", roomSchema);
