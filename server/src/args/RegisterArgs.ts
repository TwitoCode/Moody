import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RegisterArgs {
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@MinLength(6)
	@Field()
	password: string;

	@Field()
	@IsEmail()
	email: string;
}
