import { ErrorMessage } from "@/global/constants";
import { Utils } from "@/global/helpers";
import { Tag, TagType, User } from "@/models/user";

export class Database {
	static allUsers: Map<string, User> = new Map();
	static allTags: Map<string, Tag> = new Map();

	static populateAllTags(tagList: Record<string, string>[]) {
		console.log("populateTags called");
		Database.allTags.clear();
		tagList.forEach((obj: Record<string, string>) => {
			let id: string = obj["_id"];
			let title: string = obj.title;
			let type: string = obj.type;
			let _type: TagType | null = Utils.TagTypeFromString(type);
			if (_type == null) {
				throw new Error(
					`Error populating tags, invalid tag type found ${type}`
				);
			}
			Database.allTags.set(
				id,
				new Tag({
					id: id,
					title: title,
					type: _type,
				})
			);
		});
	}

	static populateAllUsers(userList: Record<string, any>[]) {
		console.log("populateAllUsers called");
		Database.allUsers.clear();
		userList?.forEach((obj: Record<string, any>) => {
			let _user: User = User.fromJSON(obj);
			_user.tags = obj.tags?.map((_tagID: string) => {
				const _tag = Database.allTags.get(_tagID);
				if (_tag == null) {
					// console.log(_user.);
					console.log(Database.allTags);
					console.log(_tagID);
					throw new Error(ErrorMessage.ParsingError);
				}
				return _tag!;
			});
			Database.allUsers.set(_user.id, _user);
		});
		console.log(Database.allUsers);
	}
}
