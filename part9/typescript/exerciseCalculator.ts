interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
