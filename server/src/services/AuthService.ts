import { compare, hash } from "bcrypt";
import { Service } from "typedi";
import { v4 } from "uuid";
import { Context } from "../types/Context";
import { User, UserModel } from "../types/User";

@Service()
export class AuthService {
	async register(user: Omit<User, "moodDocumentIDs" | "id" | "name">, ctx: Context) {
		const id = v4();
		const password = await hash(user.password, 12);
		const model = new UserModel({ ...user, moodDocumentIDs: [], id, password });

		this.setCookie(ctx, id);
		return model.save();
	}

	async login({ email, password }: Pick<User, "email" | "password">, ctx: Context) {
		console.log(ctx.req.session);

		const user = await UserModel.findOne({ email });
		if (!user) return null;

		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) return null;

		this.setCookie(ctx, user.id);
		return user;
	}

	async logout(ctx: Context) {
		return new Promise((res, rej) => {
			ctx.req.session.destroy((err) => {
				if (err) return rej(false);

				ctx.res.clearCookie("moody-session");
				res(true);
			});
		});
	}

	setCookie(ctx: any, id: any) {
		ctx.req.session!.userId = id;
	}
}
