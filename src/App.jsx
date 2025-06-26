import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(Password);
  }, [Password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+-<>:\'/?';

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg px-5 my=8 py-8 text-orange-500 bg-gray-700'>
        <h1 className='mb-4 text-center'>Password Generator</h1>
        <div className='flex rounded-lg mb-4 overflow-hidden'>
          <input
            type='text'
            placeholder='password'
            value={Password}
            readOnly
            ref={passwordRef}
            className='outline-none w-full px-3 py-1'
          />
          <button
            onClick={copyPasswordToClipBoard}
            className='outline-none bg-blue-700 shrink-0 text-white px-3 py-1'
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>

          <div className='gap-x-1 flex items-center'>
            <input
              type='checkbox'
              checked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='numberInput'> Numbers</label>
          </div>

          <div className='gap-x-1 flex items-center'>
            <input
              type='checkbox'
              checked={charAllowed}
              id='charInput'
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>

      {/* Paste input + clear */}
      <div className='w-full max-w-md mx-auto rounded-xl mt-20 justify-center bg-gray-700 px-3 py-4'>
        <p className='pl-2'>Paste here:</p>
        <input
          className='w-full max-w-md mx-auto ml-2 px-2 rounded-xl'
          id='inputPaste'
          type='text'
          placeholder='paste here'
          value={pasteInput}
          onChange={(e) => setPasteInput(e.target.value)}
        />
        <button
          className='px-3 py-1 mt-2 bg-blue-700 text-white rounded'
          onClick={() => setPasteInput('')}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default App;
