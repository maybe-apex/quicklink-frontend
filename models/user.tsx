import { Utils } from "@/global/helpers";
import { ErrorMessage } from "@/global/constants";

export class User {
	public firstName: string;
	public lastName: string;
	public gender: Gender;
	public dob: Date;
	public email: string;
	public closeFriends: string[];
	public friends: string[];
	public tags: Tag[];

	constructor({
		firstName,
		lastName,
		gender,
		dob,
		closeFriends,
		friends,
		tags = [new Tag({ label: "BITS-G", type: TagType.Formal })],
		email,
	}: UserParams) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dob = dob;
		this.closeFriends = closeFriends;
		this.friends = friends;
		this.tags = tags;
		this.email = email;
	}

	public static fromJSON(user: Record<string, any>): User {
		let _gender: Gender | null;
		_gender = Utils.genderFromString(user.gender as string) as Gender;
		if (_gender == null) {
			throw Error(ErrorMessage.ParsingError);
		}
		return new User({
			firstName: user.firstName,
			lastName: user.lastName,
			gender: _gender,
			dob: new Date(user.dob),
			closeFriends: user.closefriends,
			friends: user.friends,
			tags: user.tags,
			email: user.email,
		});
	}
}

interface UserParams {
	firstName: string;
	lastName: string;
	gender: Gender;
	dob: Date;
	closeFriends: string[];
	friends: string[];
	tags?: Tag[];
	email: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
}

export class Tag {
	public label: string;
	public type: TagType;

	constructor({ label, type }: TagParams) {
		this.label = label;
		this.type = type;
	}
}

interface TagParams {
	label: string;
	type: TagType;
}

export enum TagType {
	Formal = "formal",
	Informal = "informal",
}
