import { Inject, Service } from "typedi";
import { UpdateUserArgs } from "../args/UpdateUserArgs";
import { Context } from "../types/Context";
import { UserModel } from "../types/User";
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

	async delete(ctx: Context) {
		//@ts-expect-error
		if (!ctx.req.session.userId) return false;

		return new Promise(async (res, rej) => {
			//@ts-expect-error
			const user = await UserModel.findOne({ id: ctx.req.session.userId });
			if (!user) return false;

			user.deleteOne((err) => {
				if (err) return rej(false);

				this.authService
					.logout(ctx)
					.then(() => {
						res(true);
					})
					.catch(() => rej(false));
			});
		});
	}
}
