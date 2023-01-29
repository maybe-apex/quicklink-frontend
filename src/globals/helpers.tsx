import {Gender} from "@/models/user"


import logo from "/public/quicklink_logo.svg";
import avatar_male_1 from "/src/assets/avatars/avatar-male-1.svg";
import avatar_female_1 from "/src/assets/avatars/avatar-female-1.svg";


export class Utils {
    public static genderFromString(val: string): Gender | null {
        switch (val) {
            case "male":
                return Gender.Male
            case "female":
                return Gender.Female
            default:
                return null
        }
    }
}

export {logo, avatar_male_1, avatar_female_1};
