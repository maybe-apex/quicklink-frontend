import {Gender} from "@/models/user"


import logo from "/public/quicklink_logo.svg";
import avatar_male_1 from "/src/assets/avatars/avatar-male-1.svg";
import avatar_female_1 from "/src/assets/avatars/avatar-female-1.svg";
import {CreateUserParams} from "@/controllers/requests";


export class Utils {
    public static genderFromString(val: string | null): Gender | null {
        switch (val) {
            case "male":
                return Gender.Male
            case "female":
                return Gender.Female
            default:
                return null
        }
    }

    public static createUserParamsToJSON = (params: CreateUserParams): JSON =>
        JSON.parse(JSON.stringify({
            "firstname": params.firstName,
            "lastname": params.lastName,
            "email": params.email,
            "gender": params.gender,
            "photoURL": "", // TODO: create photo upload service
            "tags": [],
            "friends": [],
            "closefriends": [],
            "dob": params.dob
        }))
}

export {logo, avatar_male_1, avatar_female_1};

