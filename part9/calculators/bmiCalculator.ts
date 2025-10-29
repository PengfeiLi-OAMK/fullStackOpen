
interface BmiValues {
	height: number;
	weight: number;
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};

const parseBmiArguments=(argv:string[]):BmiValues=>{
	if(argv.length<4){
		throw new Error('Not enough arguments');
	}
	if(argv.length>4){
		throw new Error('Too many arguments');
	}
	if(!isNaN(Number(argv[2]))&&!isNaN(Number(argv[3]))){
		return{
			height: Number(argv[2]),
			weight: Number(argv[3])
		};
	}else{
		throw new Error('Provided values were not numbers!');
	}
};



if(require.main === module){
	try{
	const { height, weight } = parseBmiArguments(process.argv);
	console.log(calculateBmi(height, weight));
	}catch(error: unknown){
	let errorMessage = 'Something went wrong: ';
	if(error instanceof Error){
		errorMessage += error.message;
	}
	console.log(errorMessage);
	}
}
