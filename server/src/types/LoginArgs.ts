import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LoginArgs {
	@MinLength(6)
	@Field()
	password: string;

	@Field()
	@IsEmail()
	email: string;
}
