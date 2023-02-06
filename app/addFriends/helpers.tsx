import { Database } from "@/Database/AppData";
import { TagType } from "@/models/user";

const userDB = Database.allUsers;
export const buildOptions = (): {
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
