import { DocumentType, getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@ModelOptions({ options: { customName: "moody-users" } })
export class User {
	@Prop()
	@Field()
	name: string;

	@Prop()
	@Field()
	password: string;

	@Prop()
	@Field()
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
