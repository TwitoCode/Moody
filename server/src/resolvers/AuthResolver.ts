import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { LoginArgs } from "../args/LoginArgs";
import { RegisterArgs } from "../args/RegisterArgs";
import { AuthService } from "../services/AuthService";
import { Context } from "../types/Context";
import { User } from "../types/User";

@Service()
@Resolver(() => User)
export class AuthResolver {
	constructor(@Inject() private readonly authService: AuthService) {}

	@Mutation(() => User, { nullable: true })
	async register(@Ctx() ctx: Context, @Args() { email, firstName, lastName, password }: RegisterArgs) {
		return await this.authService.register({ firstName, lastName, password, email }, ctx);
	}

	@Mutation(() => User, { nullable: true })
	async login(@Ctx() ctx: Context, @Args() { password, email }: LoginArgs) {
		return await this.authService.login({ password, email }, ctx);
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context) {
		return await this.authService.logout(ctx);
	}

	@Mutation(() => Boolean)
	async deleteUser(@Ctx() ctx: Context) {
		return await this.authService.delete(ctx);
	}
}
