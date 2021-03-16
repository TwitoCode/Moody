import { Arg, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { AuthService } from "./../services/AuthService";
import { User } from "./../types/User";

@Service()
@Resolver()
export class AuthResolver {
	constructor(@Inject() private readonly authService: AuthService) {}

	@Mutation(() => User)
	async register(@Arg("name") name: string, @Arg("password") password: string, @Arg("email") email: string) {
		return this.authService.register({ name, password, email });
	}
}
