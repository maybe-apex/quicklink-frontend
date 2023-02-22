import { Database } from "@/Database/AppData";
import { TagParams, TagType } from "@/models/user";

const userDB = Database.allUsers;
export const buildOptionsUsers = (): {
	label: string;
	options: { colorScheme: string; label: string; value: string }[];
}[] => {
	let result: {
		label: string;
		options: { colorScheme: string; label: string; value: string }[];
	}[] = [
			{
				label: "Formal",
				options: [],
			},
			{
				label: "Informal",
				options: [],
			},
		];

	let formalTags = new Set<string>();
	let informalTags = new Set<string>();
	userDB.forEach(({ tags }) => {
		tags?.forEach(({ type, title: label }) => {
			if (type == TagType.Formal) {
				formalTags.add(label);
			} else {
				informalTags.add(label);
			}
		});
	});

	formalTags.forEach((tag) =>
		result[0].options.push({
			colorScheme: "green",
			label: tag,
			value: tag,
		})
	);
	informalTags.forEach((tag) =>
		result[1].options.push({
			colorScheme: "red",
			label: tag,
			value: tag,
		})
	);
	return result;
};


const tagDB = Database.allTags;
export const buildOptionsTags = (): {
	label: string;
	options: { id: string; colorScheme: string; label: string; value: string }[];
}[] => {
	let result: {
		label: string;
		options: { id: string; colorScheme: string; label: string; value: string }[];
	}[] = [
			{
				label: "Formal",
				options: [],
			},
			{
				label: "Informal",
				options: [],
			},
		];

	let formalTags = new Set<TagParams>();
	let informalTags = new Set<TagParams>();
	tagDB.forEach((e: TagParams) => {
		// console.log("each", title)
		if (e.type == TagType.Formal) {
			formalTags.add(e);
		} else {
			informalTags.add(e);
		}
	});

	formalTags.forEach(({ title, type, id }) =>
		result[0].options.push({
			id: id,
			colorScheme: "green",
			label: title,
			value: title,
		})
	);
	informalTags.forEach(({ title, type, id }) =>
		result[1].options.push({
			colorScheme: "red",
			id: id,
			label: title,
			value: title,
		})
	);
	return result;
};
