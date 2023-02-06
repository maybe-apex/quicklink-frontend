import { CreateUserParams } from "@/controllers/requests";
import { Gender, TagType } from "@/models/user";

import logo from "/assets/quicklink_logo.svg";
import avatar_male_1 from "/assets/avatars/avatar-male-1.svg";
import avatar_male_2_halo from "/assets/avatars/avatar-male-2-halo.svg";
import avatar_female_1 from "/assets/avatars/avatar-female-1.svg";
import searchLogo from "/assets/icons/search.svg";
import tagLogo from "assets/icons/tag.svg";
import handshake from "assets/icons/handshake.png";
import high_five from "assets/icons/high-five.png";

export class Utils {
	public static genderFromString(val: string | null): Gender | null {
		switch (val) {
			case "male":
				return Gender.Male;
			case "female":
				return Gender.Female;
			default:
				return null;
		}
	}

	public static TagTypeFromString(val: string | null): TagType | null {
		switch (val) {
			case "formal":
				return TagType.Formal;
			case "informal":
				return TagType.Informal;
			default:
				return null;
		}
	}

	public static createUserParamsToJSON = (params: CreateUserParams): JSON =>
		JSON.parse(
			JSON.stringify({
				firstname: params.firstName,
				lastname: params.lastName,
				email: params.email,
				gender: params.gender,
				photoURL: "", // TODO: create photo upload service
				tags: [],
				friends: [],
				closefriends: [],
				dob: params.dob,
			})
		);
}

export {
	logo,
	avatar_male_1,
	avatar_female_1,
	searchLogo,
	tagLogo,
	avatar_male_2_halo,
	handshake,
	high_five,
};
