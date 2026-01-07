import { IUser } from "../../database/models";

declare module 'express-serve-static-core'{
	interface Request {
		user: IUser;
	}
}

export {};