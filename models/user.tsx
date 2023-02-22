import { Utils } from "@/global/helpers";
import { ErrorMessage } from "@/global/constants";

export class User {
	public id: string;
	public firstName: string;
	public lastName: string;
	public gender: Gender;
	public dob: Date;
	public email: string;
	public closeFriends: string[];
	public friends: string[];
	public tags: Tag[];

	constructor({
		id,
		firstName,
		lastName,
		gender,
		dob,
		closeFriends,
		friends,
		tags = [],
		email,
	}: UserParams) {
		this.id = id;
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
			throw Error(`${ErrorMessage.ParsingError} for ${user.gender}`);
		}
		return new User({
			id: user["_id"],
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
	id: string;
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
	public id: string;
	public title: string;
	public type: TagType;

	constructor({ title, type, id }: TagParams) {
		this.id = id;
		this.title = title;
		this.type = type;
	}
}

export interface TagParams {
	id: string;
	title: string;
	type: TagType;
}

export enum TagType {
	Formal = "formal",
	Informal = "informal",
}
