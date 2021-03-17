import { Args, Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Context } from "../types/Context";
import { UpdateUserArgs } from "./../args/UpdateUserArgs";
import { UserService } from "./../services/UserService";
import { User } from "./../types/User";

@Service()
@Resolver(() => User)
export class UserResolver {
	constructor(@Inject() private readonly userService: UserService) {}

	@FieldResolver(() => String, { nullable: true })
	async name(@Root() parent: any) {
		console.log(parent);
		return parent ? `${parent._doc.firstName} ${parent._doc.lastName}` : null;
	}

	@Mutation(() => User, { nullable: true })
	async updateUser(@Ctx() ctx: Context, @Args() user: UpdateUserArgs) {
		return this.userService.update(ctx, user);
	}
}
