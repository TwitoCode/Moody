import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { LoginArgs } from "../Args/LoginArgs";
import { Context } from "../Types/Context";
import { RegisterArgs } from "../Args/RegisterArgs";
import { AuthService } from "../Services/AuthService";
import { User } from "../Types/User";

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
}
