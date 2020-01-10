class Permute {
	
	disorderedTour = [];
	actualStage;

	constructor(disorderedTour, actualStage) {
		this.disorderedTour = disorderedTour;
		this.actualStage = actualStage;
	}

	removeactualStageFromTour(){
		if(this.disorderedTour.includes(this.actualStage)){
			this.remove(this.disorderedTour, this.actualStage);
		}
	}

	reverseString(str) {
		if (str === "")
			return "";
		else
			return this.reverseString(str.substr(1)) + str.charAt(0);
	}
	
	remove(array, element) {
		const index = array.indexOf(element);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	//TODO: Convert chain in numerical int
	getAllPosibleTours(){
		let disorderedTour = this.disorderedTour;
		let temporal = this.disorderedTour.slice(0);
		let preFinal = [];
		let final = [];
		let chain = "";
		let arr1;
		let actualStage = this.actualStage;
		
		this.removeactualStageFromTour();

		disorderedTour.shift();

		for(let u = 0; u < temporal.length; u++){
			for(let i = 0; i < disorderedTour.length; i++){
				disorderedTour.push(disorderedTour[0]);
				disorderedTour.shift();
				for(let e = 0; e < disorderedTour.length; e++){
					chain += ',' + disorderedTour[e];
				}
				preFinal.push(temporal[u ]+ chain);
				preFinal.push(temporal[u] + ',' + this.reverseString(chain));
				chain="";
			}
			disorderedTour.shift();
			disorderedTour.push(temporal[u]);
		}
		preFinal.forEach(function(arr0) {
			const lastCharacter = arr0.slice(-1);
			if(lastCharacter === ','){
				arr0 = arr0.substring(0, arr0.length-1);
			}	
			//Refactor, it is functional but we need fix it
			arr0 = arr0.replace("01", "10");
			arr1 = arr0.split(',');
			let realDigits = arr1.map(Number)
			realDigits.unshift(actualStage);
			final.push(realDigits);
		});
		return final;
	}

}

class generalHelper{

	getShortestWay(arrayToSum){
		let toursWithValue = {};
		let numberToCompare = null;

		arrayToSum.forEach(function(items) {
			let totalValue = 0;
			items.forEach(function(item, index) {
				if (index < items.length - 1) {
						totalValue += Math.abs(item - items[index + 1]);
				}
			});
			if(numberToCompare === null || totalValue < numberToCompare){
				toursWithValue = {totalValue, items};
				numberToCompare = totalValue;
			}
		});

		return toursWithValue.items;
	}

}

/*
let sa = new Permute([2,4,8,10], 9);
let su = sa.getAllPosibleTours();
let sq = new generalHelper();
sq.getShortestWay(su);
*/