
//TODO: Add actual stage to array and sum
class Permute {
	
	disorderedTour = [];
	initialStage;

	constructor(disorderedTour, initialStage) {
		this.disorderedTour = disorderedTour;
		this.initialStage = initialStage;
	}

	reverseString(str) {
		if (str === "")
			return "";
		else
			return this.reverseString(str.substr(1)) + str.charAt(0);
	}
	
	getAllPosibleTours(){
		let disorderedTour = this.disorderedTour;
		let temporal = this.disorderedTour.slice(0);
		let preFinal = [];
		let final = [];
		let chain = "";
		let arr1;

		disorderedTour.shift();
		for(let u = 0; u < temporal.length; u++){
			for(let i = 0; i < disorderedTour.length; i++){
				disorderedTour.push(disorderedTour[0]);
				disorderedTour.shift();
				for(let e = 0; e < disorderedTour.length; e++){
					chain += disorderedTour[e];
				}
				preFinal.push(temporal[u] + chain);
				preFinal.push(temporal[u] + this.reverseString(chain));
				chain="";
			}
			disorderedTour.shift();
			disorderedTour.push(temporal[u]);
		}
		preFinal.forEach(function(arr0) {
			arr1 = arr0.split('');
			let realDigits = arr1.map(Number)
			final.push(realDigits);
		});
		return final;
	}

}

let initialStage = 3;
let tour = [1,4,2,8];
let permute = new Permute(tour, initialStage);

console.log(permute.getAllPosibleTours());
