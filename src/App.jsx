import './app.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';

function App() {
	const inputElement = useRef();
	const textareaElement = useRef();
	const textMD = localStorage.getItem('textMD')
		? localStorage.getItem('textMD')
		: '';
	const [markDown, setMarkDown] = useState(textMD);

	function openFile(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			setMarkDown(reader.result);
			localStorage.setItem('textMD', reader.result);
		};
	}

	function saveFile() {
		const element = document.createElement('a');
		const file = new Blob([textareaElement.current.value], {
			type: 'text/plain;charset=utf-8'
		});
		element.href = URL.createObjectURL(file);
		element.download = 'MarkDown.md';
		document.body.appendChild(element);
		element.click();
	}
	return (
		<>
			<header>
				<input
					disabled={true}
					ref={inputElement}
					onChange={openFile}
					type='file'
				></input>
				<div>
					<button
						onClick={() => {
							inputElement.current.disabled = false;
							inputElement.current.click();
							inputElement.current.disabled = true;
						}}
					>
						Import
					</button>
					<button onClick={saveFile}>Export</button>
					<button
						onClick={() => {
							textareaElement.current.value = '';
							setMarkDown('');
						}}
					>
						Clear
					</button>
				</div>
			</header>
			<div className='container'>
				<div className='left'>
					<p>MarkDown</p>
					<textarea
						ref={textareaElement}
						onChange={e => {
							setMarkDown(e.target.value);
							localStorage.setItem('textMD', e.target.value);
						}}
						value={markDown}
						className='textarea'
					></textarea>
				</div>
				<div className='right'>
					<p>Preview</p>
					<div className='output'>
						<ReactMarkdown>{markDown}</ReactMarkdown>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
