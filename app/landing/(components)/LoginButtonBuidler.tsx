import { SignInWithGoogle } from "@/controllers/Firebase";
import { Authenticate } from "@/controllers/requests";
import { ErrorMessage, StorageKeys } from "@/global/constants";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useToast, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BuildLoginButton = (): JSX.Element => {
	const toast = useToast();
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [isLoginAttempted, setLoginAttempted] = useState(false);

	const HandleLogin = async () => {
		setLoading(true);
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
			console.log("sign-in with google failed");
			setLoading(false);
			return;
		}
		try {
			let { success, object } = await Authenticate(_email!);
			if (success) {
				// user exists, redirect to app
				// console.log("logged in ->", loggedInUser);

				router.push("/addFriends");
				setLoading(false);
				return;
			}
		} catch (e) {
			console.log(e);
			toast({
				title: `${ErrorMessage.TimeOut}`,
				status: "error",
				isClosable: true,
			});
			console.log("authentication failed");
			// setLoginAttempted not set because the server never responded
			setLoading(false);
			return;
			// TODO: show server error alert prompt
		}
		setLoading(false);
		setLoginAttempted(true);
	};

	if (isLoading)
		return (
			<Button
				isLoading
				colorScheme="red"
				variant="filled"
				className="rounded-sm w-24 ml-20"
			></Button>
		);
	if (isLoginAttempted)
		return (
			<div className={"ml-10"}>
				<Button onClick={() => HandleLogin()} colorScheme={"red"}>
					Please Signup!
				</Button>
			</div>
		);
	return (
		<Button
			rightIcon={<ArrowForwardIcon />}
			colorScheme="blue"
			className="rounded-sm ml-20"
			onClick={() => HandleLogin()}
		>
			Log in
		</Button>
	);
};
