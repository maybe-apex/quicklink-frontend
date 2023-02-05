import { Inter } from "@next/font/google";

export enum Domains {
	Localhost = "localhost",
	Kunal = "10.30.13.158",
}

export enum Route {
	Authenticate = "authenticate",
	CreateUser = "createUser",
}

export enum Methods {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export enum ErrorMessage {
	BadRequest = "Bad request, please check parameters",
	ServerError = "Server error, please try again",
	UnhandledError = "Oops, Error not handled yet",
	ParsingError = "Unable to parse, one or more fields",
	GoogleAuthCompromised = "SignIn with google failed",
	TimeOut = "Connection to server timed out",
	SomethingWentWrong = "Something went wrong, please try again!",
}

export const kFontNormal = Inter({ subsets: ["latin"], weight: "400" });
export const kFontMedium = Inter({ subsets: ["latin"], weight: "500" });
export const kFontSemiBold = Inter({ subsets: ["latin"], weight: "600" });
export const kFontBold = Inter({ subsets: ["latin"], weight: "700" });
export const kFontExtraBold = Inter({ subsets: ["latin"], weight: "900" });

export const kColorBlue600 = "#2B6CB0";
export const kColorGray700 = "#2D3748";

export const heroTitle: string =
	"Connecting you to the world, one link at a time.";
export const heroSubTitle: string = "Discover resourceful connections";

import { extendTheme } from "@chakra-ui/react";
import { Gender, User, Tag, TagType } from "@/models/user";

export const theme = extendTheme({
	colors: {
		brand: {
			50: "#f7fafc",
			500: "#718096",
			900: "#171923",
		},
	},
});
const kTagBITSG = new Tag({ label: "BITS-G", type: TagType.Formal });
const kTagGuitar = new Tag({ label: "GUITAR", type: TagType.Informal });
const kTagProduct = new Tag({ label: "PRODUCT MANAGER", type: TagType.Formal });
const kTagFB = new Tag({ label: "FuCkBoI", type: TagType.Informal });

const raw = [
	{ firstName: "Aryan", lastName: "Jain", tags: [kTagGuitar] },
	{ firstName: "Rohit", lastName: "Jain", tags: [kTagGuitar] },
	{ firstName: "Dhruv", lastName: "Chovatiya", tags: [kTagProduct] },
	{ firstName: "Kunal", lastName: "Anand", tags: [kTagProduct, kTagGuitar] },
	{ firstName: "Hemant", lastName: "Bajpai", tags: [kTagFB] },
	{ firstName: "Chirag", lastName: "Gupta" },
];

export const userDB: User[] = raw.map(
	({ firstName, lastName, tags }) =>
		new User({
			firstName: firstName,
			lastName: lastName,
			tags: [kTagBITSG, ...(tags ?? [])],
			gender: Gender.Male,
			dob: new Date(),
			closeFriends: [],
			friends: [],
			email: `${firstName.toLowerCase()}.${lastName}@email.com`,
		})
);

export enum StorageKeys {
	IsLoggedIn = "isLoggedIn",
	Hero = "",
}
