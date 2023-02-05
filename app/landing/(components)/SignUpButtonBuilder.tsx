import { SignInWithGoogle } from "@/controllers/Firebase";
import { CreatUser } from "@/controllers/requests";
import { ErrorMessage } from "@/global/constants";
import { Gender } from "@/models/user";
import { Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface SignUpParams {
	firstName: string;
	lastName: string;
	dob: Date;
	gender: Gender;
	setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
	isInvalid: boolean;
}

export const BuildSignUpButton = (params: SignUpParams): JSX.Element => {
	const [errorMessage, setErrorMessage] = useState("Unknown Error");
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const router = useRouter();
	const HandleSignUp = async () => {
		setLoading(true);
		params.setSubmit(true);
		if (params.isInvalid) {
			setLoading(false);
			return;
		}
		let _email: string | null;
		try {
			_email = await SignInWithGoogle();
		} catch (e) {
			console.log(e);
			// happens when use closes google singin popup without selection anything
			// DONE: display error message to user
			// await setErrorMessage(ErrorMessage.GoogleAuthCompromised)
			// await setError(true)
			setLoading(false);
			return;
		}
		if (_email == null) {
			// happens when user object in google auth doesn't have email in it
			// DONE: handle google signup error
			setErrorMessage(ErrorMessage.GoogleAuthCompromised);
			setError(true);
			setLoading(false);
			return;
		}
		try {
			await CreatUser({
				firstName: params.firstName,
				lastName: params.lastName,
				dob: params.dob,
				gender: params.gender,
				email: _email,
			});
			// DONE: update user in redux (updted in Create User)
		} catch (e) {
			// happens when backend is down
			console.log(e);
			setErrorMessage(ErrorMessage.TimeOut);
			setError(true);
		}
		setLoading(false);
		router.push("./addFriends");
	};

	if (isLoading)
		return (
			<Button
				isLoading
				colorScheme="whiteAlpha"
				variant="solid"
				leftIcon={<FcGoogle />}
				loadingText="Signing In"
				className="rounded-sm w-72"
			></Button>
		);
	return (
		<>
			<Button
				w={"full"}
				variant={"outline"}
				leftIcon={<FcGoogle />}
				className="hover:text-slate-700 hover:!bg-slate-300 !rounded-sm !w-72 !border-slate-400 active:bg-violet-700"
				onClick={() => HandleSignUp()}
			>
				<p>Continue with Google</p>
			</Button>
			{isError ? (
				<>
					<div className={`mt-5`}>
						<Alert variant={"custom"} status={"error"}>
							<AlertIcon />
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					</div>
				</>
			) : null}
		</>
	);
};
