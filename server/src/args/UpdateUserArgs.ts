import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UpdateUserArgs {
	@Field({ nullable: true })
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@MinLength(6)
	@Field({ nullable: true })
	password: string;

	@Field({ nullable: true })
	@IsEmail()
	email: string;
}
