import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
import { signout } from "../controllers/auth.controller.js";
import { oauth } from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signout", signout);
route.post("/oauth", oauth);

export default route;
