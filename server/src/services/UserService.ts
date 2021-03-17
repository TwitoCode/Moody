import { Inject, Service } from "typedi";
import { Context } from "../types/Context";
import { UserModel } from "../types/User";
import { UpdateUserArgs } from "./../args/UpdateUserArgs";
import { AuthService } from "./AuthService";

@Service()
export class UserService {
	constructor(@Inject() private readonly authService: AuthService) {}

	async update(ctx: Context, userToUpdate: Partial<UpdateUserArgs>) {
		//@ts-expect-error
		let user = await this.getUserByID(ctx.req.session.userId);
		if (!user) return null;

    user.email = userToUpdate.email || user.email;
    user.firstName = userToUpdate.firstName || user.firstName;
    user.lastName = userToUpdate.lastName || user.lastName;

		return user!.save();
	}

	async getUserByEmail(email: string) {
		try {
			const user = await UserModel.findOne({ email });
			return user;
		} catch (err) {
			return null;
		}
	}

	async getUserByID(id: string) {
		try {
			const user = await UserModel.findOne({ id });
			return user;
		} catch (err) {
			return null;
		}
	}
}
