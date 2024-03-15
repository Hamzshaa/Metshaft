import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(signInStart());
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

          const data = await res.json();

          dispatch(signInSuccess(data));
        } else {
          dispatch(signInFailure("Error while profile response"));
          console.log("Error while profile response");
        }
        navigate("/");
      } catch (error) {
        dispatch(signInFailure(error.message));
        console.log(error);
      }
    },
  });

  return (
    <Button
      type="button"
      gradientDuoTone="tealToLime"
      outline
      onClick={handleGoogleClick}
      isProcessing={loading}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
