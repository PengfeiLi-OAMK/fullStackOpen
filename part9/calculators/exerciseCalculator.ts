interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}
type ExerciseInput = { dailyExercises: number[]; target: number };
const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }
  const target = Number(args[2]);
  if (target <= 0) {
	throw new Error('Target must be a positive number!');
  }
  const dailyExercises: number[] = [];
  for (let i = 3; i <= args.length - 1; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
	if (Number(args[i]) < 0) {
		throw new Error('Daily exercise hours must be non-negative numbers!');
	}
    dailyExercises.push(Number(args[i]));
  }
  return { dailyExercises, target };
};


export const calculateExercises = (dailyExercises: number[], target: number) => {
	const periodLength=dailyExercises.length;
	const trainingDays=dailyExercises.filter(day=>day>0).length;
	const totalhours=dailyExercises.reduce((a,b)=>a+b,0);
	const average=totalhours/periodLength;
	const success=average>=target;
	let rating=1;
	let ratingDescription='You need to work harder';
	if(average>=target){
		rating=3;
		ratingDescription='Great job, you met your target!';
	}else if(average>=target*0.75){
		rating=2;
		ratingDescription='Not too bad but could be better';
	}
	const result: ExerciseResult={
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
	return result;
};

if (require.main === module){
	try{
		const { dailyExercises, target } = parseExerciseArguments(process.argv);
		console.log(calculateExercises(dailyExercises, target));
	}catch(error: unknown){
		let errorMessage = 'Something went wrong: ';
		if(error instanceof Error){
			errorMessage += error.message;
		}
		console.log(errorMessage);
	};
}
