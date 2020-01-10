
/*
TODO: 
	1) Remove actual stage to array and sum all stages
	2) Create new helper class and put all abstract content like to "remove method"
*/

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

		arrayToSum.forEach(function(items, position) {
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