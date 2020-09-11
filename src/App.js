import React, { useState } from "react";

import "./App.css";

function App() {
	const [file, setFile] = useState("");
	const [preview, setPreview] = useState("");
	const [select, setSelect] = useState("");

	const handleFile = e => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
	};
	return (
		<div className="App">
			<h1>Upload</h1>
			<form>
				<input
					type="file"
					name="image"
					onChange={handleFile}
					value={file}
					className="form-input"
					id=""
				/>
				<button className="btn" type="button">
					Submit
				</button>
			</form>
			{preview && (
				<img src={preview} alt="chosen" style={{ height: "240px" }} />
			)}
		</div>
	);
}

export default App;
