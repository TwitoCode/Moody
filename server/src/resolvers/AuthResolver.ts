import { Args, Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Context } from "../types/Context";
import { AuthService } from "./../services/AuthService";
import { LoginArgs } from "./../types/LoginArgs";
import { RegisterArgs } from "./../types/RegisterArgs";
import { User } from "./../types/User";

@Service()
@Resolver(() => User)
export class AuthResolver {
	constructor(@Inject() private readonly authService: AuthService) {}

	@FieldResolver(() => String, { nullable: true })
	async name(@Root() parent: any) {
		console.log(parent);
		return parent ? `${parent._doc.firstName} ${parent._doc.lastName}` : null;
	}

	@Mutation(() => User, { nullable: true })
	async register(@Ctx() ctx: Context, @Args() { email, firstName, lastName, password }: RegisterArgs) {
		return await this.authService.register({ firstName, lastName, password, email }, ctx);
	}

	@Mutation(() => User, { nullable: true })
	async login(@Ctx() ctx: Context, @Args() { password, email }: LoginArgs) {
		return await this.authService.login({ password, email }, ctx);
	}
}
