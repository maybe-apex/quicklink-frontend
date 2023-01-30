import {Utils} from "@/global/helpers";
import {ErrorMessage} from "@/global/constants";

export class User {
    private firstName: string;
    private lastName: string;
    private gender: Gender;
    private dob: Date;
    private closeFriends: string[];
    private friends: string[];
    private tags: string[]

    constructor({firstName, lastName, gender, dob, closeFriends, friends, tags}: userParams) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.dob = dob
        this.closeFriends = closeFriends
        this.friends = friends
        this.tags = tags
    }

    public static fromJSON(user: Record<string, any>): User {
        let _gender: Gender | null
        _gender = Utils.genderFromString(user.gender as string) as Gender
        if (_gender == null) {
            throw Error(ErrorMessage.ParsingError)
        }
        return new User(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: _gender,
                dob: new Date(user.dob),
                closeFriends: user.closefriends,
                friends: user.friends,
                tags: user.tags
            }
        )
    }
}

interface userParams {
    firstName: string,
    lastName: string,
    gender: Gender,
    dob: Date,
    closeFriends: string[],
    friends: string[],
    tags: string[]
}

export enum Gender {
    Male = "male",
    Female = "female"
}