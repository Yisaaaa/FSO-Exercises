import { isNotANumber } from "./utils";

interface BmiValues {
  height: number;
  weight: number;
}

// Parses the cmd arguments to make sure the parameters given
// are correct.
const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments.");
  } else if (args.length > 4) {
    throw new Error("Too many arguments.");
  } else if (isNotANumber(args[2]) || isNotANumber(args[3])) {
    throw new Error("Arguments must be numbers.");
  } else {
    return { height: Number(args[2]), weight: Number(args[3]) };
  }
};

// Params: height in cm, weight in kg
const calculateBmi = (height: number, weight: number): string => {
  // bmi = mass(kg) / height (m2)

  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16) {
    return "Severly underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// console.log(calculateBmi(180, 74));
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    const errorMsg: string = `You got an error: ${error.message}`;
    console.log(errorMsg);
  }
}
