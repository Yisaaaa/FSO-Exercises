import { isNotANumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface InputValues {
  target: number;
  days: number[];
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  let trainingDays: number = 0;
  let average: number = 0;
  let success: boolean;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  dailyHours.forEach((dailyHour: number) => {
    if (dailyHour !== 0) {
      trainingDays++;
      average += dailyHour;
    }
  });

  average = average / dailyHours.length;
  rating = getRating(average, target);
  success = rating === 3;
  ratingDescription = getRatingDescription(rating);

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const getRating = (average: number, target: number): 1 | 2 | 3 => {
  const targetHalved: number = target / 2;
  if (average >= target) {
    return 3;
  } else if (average >= targetHalved) {
    return 2;
  } else {
    return 1;
  }
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "You're doing bad. You need to improve.";

    case 2:
      return "Not bad, but could be better.";

    case 3:
      return "Good work! Keep at it.";
  }
};

// Parses the cmd arguments to make sure the parameters given
// are correct.
const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments.");
  } else {
    let target: number;
    let days: number[] = [];

    for (let i = 2; i < args.length; i++) {
      const arg = args[i];

      if (!isNotANumber(arg)) {
        if (i === 2) {
          target = Number(arg);
        } else {
          days.push(Number(arg));
        }
      } else {
        throw new Error("Arguments must be numbers.");
      }
    }

    return { target, days };
  }
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(`You got an error: ${err.message}`);
  }
}
