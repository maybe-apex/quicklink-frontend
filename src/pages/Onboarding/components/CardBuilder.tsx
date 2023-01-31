import {ErrorMessage, kFontBold, kFontMedium, kFontNormal} from "@/global/constants";
import {avatar_female_1, avatar_male_1} from "@/global/helpers";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Alert,
    AlertIcon, AlertDescription,
} from "@chakra-ui/react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import Image from "next/image";
import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {Gender} from "@/models/user"
import {signInWithGoogle} from "@/controllers/Firebase"
import {Authenticate, CreatUser} from "@/controllers/requests";
import {tiltHelper} from "@/pages/Onboarding/helpers";
import {Router, useRouter} from "next/router";

export default function CardBuilder(): JSX.Element {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState(Gender.Male)
    const [date, setDate] = useState(new Date());
    const [isSubmitted, setSubmit] = useState(false)

    const handleFirstNameChange = (e: any) => setFirstName(e.target.value);
    const handleLastNameChange = (e: any) => setLastName(e.target.value);
    const handleGenderChange = (_newGender: Gender) => {
        console.log(_newGender)
        setGender(_newGender)
    };

    const isFirstNameEmpty = firstName === "";
    const isLastNameEmpty = lastName === "";
    const isDateEmpty = date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)

    return (
        <div className={"flex justify-center duration-1000"}>
            <div
                className={`bg-gray-700 p-8 w-[440px] text-justify rounded-md duration-500`}
                id={"tilt"}
                ref={(node) => tiltHelper(node)}>
                <p className={`${kFontBold.className} text-2xl pb-4`}>
                    Create your new account
                </p>
                <FormLabel className={"text-slate-100"}>Name</FormLabel>
                <div className={`${kFontMedium.className} flex grid grid-cols-2 gap-4`}>
                    <FormControl isInvalid={isSubmitted && (isFirstNameEmpty)}>
                        <div className={`${kFontMedium.className}`}>
                            <Input
                                type="text"
                                placeholder={"John"}
                                value={firstName}
                                onChange={handleFirstNameChange}
                                // onClick={() => (t1 = true)}
                            />
                            <FormErrorMessage>
                                Firstname is required.
                            </FormErrorMessage>
                        </div>
                    </FormControl>
                    <FormControl isInvalid={isSubmitted && (isLastNameEmpty)}>
                        <div>
                            <Input
                                type="text"
                                placeholder={"Doe"}
                                value={lastName}
                                onChange={handleLastNameChange}
                                // onClick={() => (t2 = true)}
                            />
                            <FormErrorMessage>
                                Lastname is required.
                            </FormErrorMessage>
                        </div>
                    </FormControl>
                </div>
                <div className={"flex flex-row mt-8 justify-center"}>
                    <div
                        className={
                            `flex justify-center border-2 border-slate-200 rounded-xl mx-4 p-4 duration-200 ${gender == Gender.Male ? "" : "border-slate-500"}`
                        }
                        onClick={() => handleGenderChange(Gender.Male)}
                    >
                        <Image
                            src={avatar_male_1}
                            alt="quicklink"
                        />
                    </div>
                    <div
                        className={
                            `flex justify-center border-2 border-slate-200 rounded-xl mx-4 p-4 duration-200 ${gender == Gender.Female ? "" : "border-slate-500"}`
                        }
                        onClick={() => handleGenderChange(Gender.Female)}
                    >
                        <Image
                            src={avatar_female_1}
                            alt="quicklink"
                        />
                    </div>
                </div>
                <div className={`!${kFontMedium.className} flex pt-8 space-x-10`}>
                    <FormLabel className={`text-slate-200 leading-10`}>
                        Birthday
                    </FormLabel>
                    <FormControl isInvalid={isSubmitted && (isDateEmpty)}>
                        <div className="flex justify-center">
                            <div className={`${kFontNormal.className}text-slate-200  w-60`}>
                                <SingleDatepicker
                                    name="date-input"
                                    date={date}
                                    onDateChange={setDate}
                                />
                                <FormErrorMessage>
                                    Please enter your birthday.
                                </FormErrorMessage>
                            </div>
                        </div>
                    </FormControl>
                </div>
                <div className="mt-6 flex flex-col place-items-center">
                    {GetSignUpButton({
                        firstName: firstName,
                        lastName: lastName,
                        dob: date,
                        gender: gender,
                        setSubmit: setSubmit,
                        isInvalid: isFirstNameEmpty || isLastNameEmpty || isDateEmpty
                    })}
                    <div className="py-[1px] bg-slate-400 mt-5 w-[330px]"></div>
                </div>
                <div className="pt-5 flex">
                    <p className={`${kFontMedium.className} text-lg pl-6 leading-10`}>
                        Already onboard ?
                    </p>
                    {GetLoginButton()}
                </div>
            </div>
        </div>
    );
}

interface SignUpParams {
    firstName: string,
    lastName: string,
    dob: Date,
    gender: Gender
    setSubmit: React.Dispatch<React.SetStateAction<boolean>>
    isInvalid: boolean
}

const GetSignUpButton = (params: SignUpParams): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState("Unknown Error")
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    const handleSignUp = async () => {
        await setLoading(true)
        await params.setSubmit(true)
        if (params.isInvalid) {
            await setLoading(false)
            return
        }
        let _email: string | null
        try {
            _email = await signInWithGoogle()
        } catch (e) {
            console.log(e)
            // happens when use closes google singin popup without selection anything
            // DONE: display error message to user
            // await setErrorMessage(ErrorMessage.GoogleAuthCompromised)
            // await setError(true)
            await setLoading(false)
            return
        }
        if (_email == null) {
            // happens when user object in google auth doesn't have email in it
            // DONE: handle google signup error
            await setErrorMessage(ErrorMessage.GoogleAuthCompromised)
            await setError(true)
            await setLoading(false)
            return
        }
        try {
            await CreatUser({
                firstName: params.firstName,
                lastName: params.lastName,
                dob: params.dob,
                gender: params.gender,
                email: _email
            })
            // TODO: update user in redux
        } catch (e) {
            // happens when backend is down
            console.log(e)
            setErrorMessage(ErrorMessage.TimeOut)
            setError(true)
        }
        await setLoading(false)
    }
    if (isLoading)
        return (<Button
                isLoading
                colorScheme='whiteAlpha'
                variant='solid'
                leftIcon={<FcGoogle/>}
                loadingText='Signing In'
                className="rounded-sm w-72">
            </Button>
        )
    return (<>
        <Button
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle/>}
            className="hover:text-slate-700 hover:!bg-slate-300 !rounded-sm !w-72 !border-slate-400 active:bg-violet-700"
            onClick={() => handleSignUp()}>
            <p>Continue with Google</p>
        </Button>
        {isError ?
            <>
                <div className={`mt-5`}>
                    <Alert variant={"custom"} status={"error"}>
                        <AlertIcon/>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                </div>
            </>
            : null
        }
    </>)
}

const GetLoginButton = (): JSX.Element => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false)
    const [isLoginAttempted, setLoginAttempted] = useState(false)
    const handleLogin = async () => {
        await setLoading(true)
        let _email: string | null
        try {
            _email = await signInWithGoogle()
        } catch (e) {
            console.log(e)
            // happens when use closes google singin popup without selection anything
            // DONE: display error message to user
            // await setErrorMessage(ErrorMessage.GoogleAuthCompromised)
            // await setError(true)
            await setLoading(false)
            return
        }
        if (_email == null) {
            console.log("sign-in with google failed")
            await setLoading(false)
            return
        }
        try {
            let userExists = await Authenticate(_email!)
            if (userExists) {
                // user exists, redirect to app
                console.log('test123')
                await router.push('/landing')
                await setLoading(false)
                return
            }
        } catch (e) {
            console.log(e)
            console.log("authentication failed")
            // TODO: show server error alert prompt

        }
        await setLoading(false)
        await setLoginAttempted(true)
    }
    // return <ColorModeSwitcher/>
    if (isLoading)
        return (<Button
            isLoading
            colorScheme='blackAlpha'
            variant='solid'
            className="rounded-sm w-24 ml-20">
            Email
        </Button>)
    if (isLoginAttempted)
        return (
            <div className={"ml-10"}>
                <Button onClick={() => handleLogin()}
                        variant={"red"}>Please
                    Signup!</Button>
            </div>)
    return (<Button
        rightIcon={
            <ArrowForwardIcon className={"bg-slate-600"} color={"white"}/>
        }
        colorScheme="gray"
        variant="login"
        className="rounded-sm ml-20"
        onClick={() => handleLogin()}
    >
        <p className="text-gray-800">Log in</p>
    </Button>)
}


