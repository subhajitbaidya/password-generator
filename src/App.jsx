import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  // Storing reference for generated password
  const passwordRef = useRef(null);

  // We will cache this function as it needs to run in multiple selections in Ui
  // This is used for optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characters) str += "!@#$%^&*";

    for (let index = 0; index <= length; index++) {
      const element = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(element);
    }
    setPassword(pass);
  }, [length, numberAllowed, characters, setPassword]);

  // Copying to clipboard
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // Selection of a range of characters
    // passwordRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // re run of the function whenever dependancy chances
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characters, passwordGenerator]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        <div className="w-96 p-6 bg-amber-200 rounded-2xl shadow-lg gap-2 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            Password Generator
          </h1>
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            placeholder="your password will appear here"
            className="w-full bg-white p-4 rounded-lg px-4 py-4 mx-4 my-4 shadow-inner font-semibold text-orange-500 text-center"
          />

          <div className="w-full flex items-center justify-center gap-1 text-gray-500">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            Characters
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            Numbers
          </div>
          <button
            className="bg-[#4b8f73] h-10 font-semibold text-white w-20 pb-2 mt-2 shadow-lg cursor-pointer rounded-2xl"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
