import React from "react";
import "./PasswordGenerator.css";

export default function PasswordGenerator() {
  return (
    <div id="generator-container">
      <div className="passgen">
        <fieldset>
          <legend>Select number of dice:</legend>

          <div>
            <input
              type="radio"
              id="four-dice"
              name="num-dice"
              value="4"
              checked
            />
            <label for="four-dice">4 dice</label>
          </div>

          <div>
            <input type="radio" id="five-dice" name="num-dice" value="5" />
            <label for="five-dice">5 dice</label>
          </div>
        </fieldset>

        <label for="password-length">Password Length</label>
        <input id="password-length" type="range" min="5" max="99" value="16" />
        <div class="password-output"></div>
      </div>

      <div className="passphrasegen">
        <label for="passphrase-length">Passphrase Length</label>
        <input id="passphrase-length" type="range" min="3" max="32" value="5" />
        <div class="passphrase-output"></div>
        <label for="passphrase-separator">Passphrase Separator</label>
        <input type="text" name="separator" id="passphrase-separator" />
      </div>
    </div>
  );
}
