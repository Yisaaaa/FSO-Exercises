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

console.log(calculateBmi(180, 74));
