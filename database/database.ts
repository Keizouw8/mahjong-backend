import { connect } from "mongoose";

export async function run() {
	await connect('mongodb://127.0.0.1:27017/mahjong');
}
