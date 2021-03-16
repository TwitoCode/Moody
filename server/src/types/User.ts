import { DocumentType, getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
	constructor() {}

	@Prop()
	@Field()
	name: string;

	@Prop()
	@Field()
	password: string;

	@Prop()
	@Field()
	email: string;

	@Prop(() => [String])
	@Field(() => [String])
	moodDocumentIDs: string[];
}

export const UserModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
