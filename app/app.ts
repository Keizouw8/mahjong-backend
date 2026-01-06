import express from "express";
import cors from "cors";

import login from "./login";
import signup from "./signup";
import { api } from "./api/api";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);

app.post("/login", login);
app.post("/signup", signup);
