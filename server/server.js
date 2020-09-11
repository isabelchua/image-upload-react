const express = require("express");
const app = express();
const { cloudinary } = require("./utils/cloudinary");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", exteded: true }));

const port = process.env.PORT || 3001;

app.get("/api/images", async (req, res) => {
	const { resources } = await cloudinary.search
		.expression("folder: dev_setups")
		.sort_by("public_id", "desc")
		.max_results(30)
		.execute();
	const publicIds = resources.map(file => file.public_id);
	res.send(publicIds);
});

app.post("/api/upload", async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "dev_setups"
		});
		console.log(uploadedResponse);
		res.json({ msg: "yay" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Something went wrong" });
	}
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
