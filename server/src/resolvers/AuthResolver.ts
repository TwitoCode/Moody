import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { Context } from "../types/Context";
import { AuthService } from "./../services/AuthService";
import { User } from "./../types/User";

@Service()
@Resolver()
export class AuthResolver {
	constructor(@Inject() private readonly authService: AuthService) {}

	@Mutation(() => User, { nullable: true })
	async register(
		@Ctx() ctx: Context,
		@Arg("name") name: string,
		@Arg("password") password: string,
		@Arg("email") email: string
	) {
		return await this.authService.register({ name, password, email }, ctx);
	}

	@Mutation(() => User, { nullable: true })
	async login(@Ctx() ctx: Context, @Arg("password") password: string, @Arg("email") email: string) {
		return await this.authService.login({ password, email }, ctx);
	}
}
