import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";
import { longList } from "../data/eff_large_wordlist"; // 5 dice rolls
import { shortList } from "../data/eff_short_wordlist_1"; // 4 dice rolls
import { shortUniqueList } from "../data/eff_short_wordlist_2_0"; // 4 dice rolls

// Chakra UI
import {
  CopyIcon,
  RepeatIcon,
  InfoIcon,
  ChatIcon,
  LockIcon,
  SettingsIcon,
  ViewIcon,
  ViewOffIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Textarea,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

export default function PasswordGenerator() {
  // Password
  const [includeCaps, setIncludeCaps] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [passwordLength, setPasswordLength] = useState(16);
  const [passwordEntropy, setPasswordEntropy] = useState();
  const [password, setPassword] = useState("default");
  //Passphrase
  const [passphraseNumWords, setPassphraseNumWords] = useState(5);
  const [numDice, setNumDice] = useState(5);
  const [passphraseSeparator, setPassphraseSeparator] = useState("-");
  const [wordList, setWordList] = useState();
  const [passphraseIncludeNums, setPassphraseIncludeNums] = useState(false);
  const [passphraseIncludeCaps, setPassphraseIncludeCaps] = useState(false);
  const [passphrase, setPassphrase] = useState("default");

  function rollDice(numDice) {
    let rolls = "";
    for (let i = 0; i < numDice; i++) {
      rolls += Math.floor(Math.random() * 6) + 1;
    }
    return rolls;
  }

  // does not currently GUARANTEE there will be one of each selected, it just adds them to the character pool
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
  }

  function generatePassphrase(
    passphraseNumWords,
    numDice,
    passphraseSeparator,
    wordList = longList
  ) {
    let passphraseString = "";

    for (let i = 0; i < passphraseNumWords; i++) {
      let index = rollDice(numDice);
      passphraseString += wordList[index];
      if (i === passphraseNumWords - 1) {
        setPassphrase(passphraseString);
        return;
      }
      passphraseString += passphraseSeparator;
    }
  }

  function calculateEntropy(password) {
    // Initialize entropy to 0
    let entropy = 0;

    // Check if the password contains upper case letters
    const upperCase = /[A-Z]/;
    if (upperCase.test(password)) {
      entropy += 26;
    }

    // Check if the password contains lower case letters
    const lowerCase = /[a-z]/;
    if (lowerCase.test(password)) {
      entropy += 26;
    }

    // Check if the password contains numbers
    const numbers = /[0-9]/;
    if (numbers.test(password)) {
      entropy += 10;
    }

    // Check if the password contains special characters
    const special = /[!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?]/;
    if (special.test(password)) {
      entropy += 33;
    }

    // Calculate the entropy of the password
    entropy = Math.log2(Math.pow(entropy, password.length));

    return entropy;
  }

  // Testing only
  //   const key = rollDice(numDice);
  //   console.log(key); // prints a random 5-digit string
  //   console.log(longList[key]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
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
    generatePassphrase(
      passphraseNumWords,
      numDice,
      passphraseSeparator,
      wordList
    );
  };

  // use a useEffect to monitor changes to password inputs and update password
  // dependency array of all inputs

  useEffect(() => {
    generatePassword(
      includeCaps,
      includeLower,
      includeNumbers,
      includeSpecial,
      passwordLength
    );
  }, [
    includeCaps,
    includeLower,
    includeNumbers,
    includeSpecial,
    passwordLength,
  ]);

  // does this need to be a separate useEffect?
  useEffect(() => {
    setPasswordEntropy(calculateEntropy(password));
  }, [password]);

  // use a useEffect to monitor changes to passphrase inputs and update passphrase
  // dependency array of all inputs

  useEffect(() => {
    generatePassphrase(
      passphraseNumWords,
      numDice,
      passphraseSeparator,
      wordList
    );
  }, [passphraseNumWords, numDice, passphraseSeparator, wordList]);

  return (
    <div id="generator-container">
      <Tabs>
        <TabList>
          <Tab>Password</Tab>
          <Tab>Passphrase</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="passgen app-block">
              <form onSubmit={handlePasswordSubmit}>
                <div className="password-output" id="password-output">
                  {password}
                </div>
                <div className="entropy">{passwordEntropy}</div>
                <Button onClick={handlePasswordSubmit}>
                  Generate Password
                </Button>
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

                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Advanced Options
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
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
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </form>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="passphrasegen app-block">
              <form onSubmit={handlePassphraseSubmit}>
                <div className="passphrase-output" id="passphrase-output">
                  {passphrase}
                </div>
                <Button onClick={handlePassphraseSubmit}>
                  Generate Passphrase
                </Button>
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

                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Advanced Options
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <fieldset>
                        <legend>Select number of dice:</legend>

                        <div>
                          <input
                            type="radio"
                            id="four-dice"
                            name="num-dice"
                            value="4"
                            onChange={(e) => {
                              setNumDice(e.target.value);
                              setWordList(shortList);
                            }}
                          />
                          <label htmlFor="four-dice">4 dice (simple)</label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="four-dice"
                            name="num-dice"
                            value="4"
                            onChange={(e) => {
                              setNumDice(e.target.value);
                              setWordList(shortUniqueList);
                            }}
                          />
                          <label htmlFor="four-dice">4 dice</label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="five-dice"
                            name="num-dice"
                            value="5"
                            defaultChecked
                            onChange={(e) => {
                              setNumDice(e.target.value);
                              setWordList(longList);
                            }}
                          />
                          <label htmlFor="five-dice">5 dice</label>
                        </div>
                      </fieldset>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="passphrase-separator" mb="0">
                          Passphrase Separator
                        </FormLabel>
                        <Input
                          type="text"
                          name="separator"
                          id="passphrase-separator"
                          defaultValue="-"
                          maxLength={2}
                          width={20}
                          onChange={(e) =>
                            setPassphraseSeparator(e.target.value)
                          }
                        />
                      </FormControl>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </form>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Textarea placeholder={passphrase} size="lg" />
      <Button colorScheme="blue">Button</Button>
      <CopyIcon boxSize={6} />
      <RepeatIcon boxSize={6} />
      <InfoIcon boxSize={6} />
      <ChatIcon boxSize={6} />
      <LockIcon boxSize={6} />
      <SettingsIcon boxSize={6} />
      <ViewIcon boxSize={6} />
      <ViewOffIcon boxSize={6} />
      <WarningTwoIcon boxSize={6} />

      {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
      <InputGroup size="lg">
        <InputLeftAddon children={<LockIcon />} />
        <Input value={password} readOnly />
        <InputRightAddon children={<CopyIcon />} />
      </InputGroup>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Enable email alerts?
        </FormLabel>
        <Switch id="email-alerts" defaultChecked />
      </FormControl>

      <Slider
        aria-label="password-length"
        id="password-length"
        defaultValue={16}
        min={5}
        max={99}
        step={1}
      >
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </div>
  );
}
