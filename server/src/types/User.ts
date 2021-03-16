import { DocumentType, getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { IsEmail, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@ModelOptions({ options: { customName: "moody-users" } })
export class User {
	@Prop()
	@Field()
	firstName: string;

	@Prop()
	@Field()
	lastName: string;

	@Prop()
	@MinLength(6)
	password: string;

	@Prop()
	@Field()
	@IsEmail()
	email: string;

	@Prop()
	@Field()
	id: string;

	@Prop({ type: () => [String] })
	@Field(() => [String])
	moodDocumentIDs: string[];
}

export const UserModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
