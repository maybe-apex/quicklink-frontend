import {Utils} from "@/globals/helpers";

export class User {
    private firstName: string;
    private lastName: string;
    private gender: Gender;
    private dob: Date;
    private closeFriends: string[];
    private friends: string[];


    constructor(firstName: string, lastName: string, gender: Gender, dob: Date, closeFriends: string[], friends: string[],) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.dob = dob
        this.closeFriends = closeFriends
        this.friends = friends
    }

    public fromJSON(userMap: Map<String, any>): User | null {
        const _gender = Utils.genderFromString(userMap.get("gender"))
        if (_gender == null) {
            return null
        }
        return new User(
            userMap.get("firstName"),
            userMap.get("lastName"),
            _gender,
            new Date(userMap.get("dob")),
            userMap.get("closeFriends"),
            userMap.get("friends"),
        )
    }
}

export enum Gender {
    Male = "male",
    Female = "female"
}

