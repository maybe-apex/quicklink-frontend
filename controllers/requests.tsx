import {
	Domains,
	ErrorMessage,
	Methods,
	Route,
	StorageKeys,
} from "@/global/constants";
import { Gender, User } from "@/models/user";
import { Utils } from "@/global/helpers";
import { saveToLocalStorage } from "./LocalStorage";

const domain = Domains.Kunal;

export const Authenticate = async (
	email: string
): Promise<{ success: boolean; object: User | null }> => {
	console.log(`${Route.Authenticate} called`);
	const _body = { email: email };
	const response: Response = await fetch(
		`http://${domain}:4000/${Route.Authenticate}`,
		{
			method: Methods.POST,
			body: JSON.stringify(_body),
		}
	);
	console.log("response= ", response);
	if (response.status === 403) {
		// user not signed up yet
		return { success: false, object: null };
	}
	if (response.status != 200) {
		throw new Error(ErrorMessage.UnhandledError);
	}
	const raw = await response.json();
	let user: User;
	try {
		user = User.fromJSON(raw.object);
	} catch (e) {
		throw e;
	}
	console.log(user);
	saveToLocalStorage(StorageKeys.IsLoggedIn, true);
	saveToLocalStorage(StorageKeys.Hero, user);
	return { success: true, object: user };
};

export interface CreateUserParams {
	firstName: string;
	lastName: string;
	dob: Date;
	gender: Gender;
	email: string;
}

export const CreatUser = async (params: CreateUserParams): Promise<boolean> => {
	console.log(`${Route.CreateUser} called`);
	const _body = Utils.createUserParamsToJSON(params);
	let response: Response;
	try {
		response = await fetch(`http://${domain}:4000/${Route.CreateUser}`, {
			method: Methods.POST,
			body: JSON.stringify(_body),
		});
	} catch (e) {
		throw new Error(ErrorMessage.TimeOut);
	}
	console.log(`response= ${response}`);
	if ([500, 502].includes(response.status)) {
		throw new Error(ErrorMessage.ServerError);
	}
	if (response.status === 400) {
		throw new Error(ErrorMessage.BadRequest);
	}
	if (response.status != 200) {
		throw new Error(ErrorMessage.UnhandledError);
	}
	const raw = await response.json();

	let user: User;
	try {
		user = User.fromJSON(raw.object);
	} catch (e) {
		throw e;
	}
	console.log(`created user = ${user}`);
	saveToLocalStorage(StorageKeys.IsLoggedIn, true);
	saveToLocalStorage(StorageKeys.Hero, user);
	return true;
};
