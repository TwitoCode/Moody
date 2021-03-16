import { Service } from "typedi";
import { User, UserModel } from "./../types/User";

@Service()
export class AuthService {
	async register(user: Omit<User, "moodDocumentIDs">) {
		const model = new UserModel({ ...user, moodDocumentIDs: [] });
		return model;
	}
}
