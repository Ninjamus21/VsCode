import express from "express";
import pug from "pug";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.get("/users", async (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const users = await (await fetch(url)).json();
    res.render("users", { url, users });
});

app.get("/random", async (req, res) => {
    const url = "https://randomuser.me/api/?results=10";
    const data = await (await fetch(url)).json();
    res.render("users", { url, results: data.results });
});

app.get("/:nat/:antal", async (req, res) => {
    const antal = req.params.antal;
    const nationality = req.params.nat;
    const allowedNationalities = ["gb", "dk", "de", "fr"];
    if (!allowedNationalities.includes(nationality)) {
        return res.status(400).send("land er ikke gyldigt. Vælg mellem: gb, dk, de, fr");

    }
    if (antal < 1 || antal > 100) {
        return res.status(400).send("antal skal være mellem 1 og 100 笨蛋");
    }
    const url = `https://randomuser.me/api/?nat=${nationality}&results=${antal}`;
    const data = await (await fetch(url)).json();
    res.render("users", { url, resultsNationality: data.results });
})

app.listen(8000, () => console.log("http://localhost:8000/users"));