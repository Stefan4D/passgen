import React, { useState } from "react";
import "./PasswordGenerator.css";
import { longList } from "../data/eff_large_wordlist"; // 5 dice rolls
import { shortList } from "../data/eff_short_wordlist_1"; // 4 dice rolls
import { shortUniqueList } from "../data/eff_short_wordlist_2_0"; // 4 dice rolls

export default function PasswordGenerator() {
  const [numDice, setNumDice] = useState(5);
  const [includeCaps, setIncludeCaps] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [passwordLength, setPasswordLength] = useState(16);
  const [passphraseNumWords, setPassphraseNumWords] = useState(5);
  const [passphraseSeparator, setPassphraseSeparator] = useState("-");
  const [wordList, setWordList] = useState();
  const [password, setPassword] = useState("default");
  const [passphrase, setPassphrase] = useState("default");

  function rollDice(numDice) {
    let rolls = "";
    for (let i = 0; i < numDice; i++) {
      rolls += Math.floor(Math.random() * 6) + 1;
    }
    return rolls;
  }

  function generatePassword(
    includeCaps,
    includeLower,
    includeNumbers,
    includeSpecial,
    passwordLength
  ) {
    let passString = "";
    let characters = "";

    if (includeCaps) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeLower) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeSpecial) {
      characters += "!@#$%^&*()_+-=";
    }

    for (let i = 0; i < passwordLength; i++) {
      passString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(passString);

    // const passwordOutput = document.getElementById("password-output");
    // passwordOutput.innerText = password;

    // return password;
  }

  const key = rollDice(numDice);
  console.log(key); // prints a random 5-digit string
  console.log(longList[key]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log({ includeCaps });
    console.log({ includeLower });
    console.log({ includeNumbers });
    console.log({ includeSpecial });
    generatePassword(
      includeCaps,
      includeLower,
      includeNumbers,
      includeSpecial,
      passwordLength
    );
  };

  const handlePassphraseSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="generator-container">
      <div className="passgen app-block">
        <form onSubmit={handlePasswordSubmit}>
          <div className="password-output" id="password-output">
            {password}
          </div>
          <button>Generate Password</button>
          <label htmlFor="password-length">Password Length</label>
          <input
            id="password-length"
            type="range"
            min="5"
            max="99"
            defaultValue="16"
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <span>{passwordLength}</span>
          <fieldset>
            <legend>Character options:</legend>
            <label htmlFor="caps">Uppercase Letters</label>
            <input
              type="checkbox"
              name="caps"
              id="caps"
              defaultChecked
              onChange={(e) => setIncludeCaps(e.target.checked)}
            />
            <label htmlFor="lower">Lowercase Letters</label>
            <input
              type="checkbox"
              name="lower"
              id="lower"
              defaultChecked
              onChange={(e) => setIncludeLower(e.target.checked)}
            />
            <label htmlFor="nums">Numbers</label>
            <input
              type="checkbox"
              name="nums"
              id="nums"
              defaultChecked
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <label htmlFor="special">Special Characters</label>
            <input
              type="checkbox"
              name="special"
              id="special"
              defaultChecked
              onChange={(e) => setIncludeSpecial(e.target.checked)}
            />
          </fieldset>
        </form>
      </div>

      <div className="passphrasegen app-block">
        <form onSubmit={handlePassphraseSubmit}>
          <div className="passphrase-output" id="passphrase-output">
            {passphrase}
          </div>
          <button>Generate Passphrase</button>
          <label htmlFor="passphrase-length">Passphrase Length</label>
          <input
            id="passphrase-length"
            type="range"
            min="3"
            max="32"
            defaultValue="5"
            onChange={(e) => setPassphraseNumWords(e.target.value)}
          />
          <span>{passphraseNumWords} words</span>
          <fieldset onChange={(e) => setNumDice(e.target.value)}>
            <legend>Select number of dice:</legend>

            <div>
              <input type="radio" id="four-dice" name="num-dice" value="4" />
              <label htmlFor="four-dice">4 dice</label>
            </div>

            <div>
              <input type="radio" id="five-dice" name="num-dice" value="5" />
              <label htmlFor="five-dice">5 dice</label>
            </div>
          </fieldset>

          <label htmlFor="passphrase-separator">Passphrase Separator</label>
          <input
            type="text"
            name="separator"
            id="passphrase-separator"
            value="-"
            onChange={(e) => setPassphraseSeparator(e.target.value)}
          />
          <button>Generate Passphrase</button>
        </form>
      </div>
    </div>
  );
}
