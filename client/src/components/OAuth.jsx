import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";

export default function OAuth() {
  const handleGoogleClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profileResponse = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (profileResponse.ok) {
          const userProfile = await profileResponse.json();

          const res = await fetch("/api/auth/oauth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userProfile.given_name + " " + userProfile.family_name,
              email: userProfile.email,
              profilePic: userProfile.picture,
            }),
          });
        } else {
          console.log("Error while profile response");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    // <GoogleLogin
    //   onSuccess={(credentialResponse) => {
    //     console.log(credentialResponse);
    //   }}
    //   onError={() => {
    //     console.log("Login Failed");
    //   }}
    // />
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
