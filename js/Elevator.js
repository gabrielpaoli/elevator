class Elevator {
	elevatorNumber;
	stopped = true;
	stage = 0; 
	maxStage = 10;
	maxPeople = 6; 
	direction = 0; //0 stopped, 1 up, 2 down
	selectedFloors = [];
	route = [];
	nextStage;

	constructor(elevatorNumber, stage, selectedFloors) {
		this.elevatorNumber = elevatorNumber;
		this.stage = stage;
		this.selectedFloors = selectedFloors;
	}

	init(){
		//this.orderLogicalTour();
		this.orderEnergySaveTour();
		this.draw();
	}

	checkFirstAndEndStage(){
		if(this.stage === 0 && this.direction === 2 || 
			this.stage === this.maxStage && this.direction === 1){
				return true;
		}
	}

	goNextStage(){
		this.stage = this.route.shift(); 
		this.nextStage = this.route[0];
		this.setDirection(this.nextStage);
		if(!this.nextStage){
			this.stopped = true;
		}
		this.draw();
	}

	changeStage(){
		if(this.checkFirstAndEndStage()){
			return true;
		}

		if(this.direction <= 1){
			this.stage = this.stage + 1;
		}else{
			this.stage = this.stage - 1;
		}
	}

	orderEnergySaveTour(){
		let actualStage = this.stage;
		let tour = this.selectedFloors;
		const allPosibleTours = new Permute(tour, actualStage);
		const mathHelper = new generalHelper();
		let orderedTour = mathHelper.getShortestWay(allPosibleTours.getAllPosibleTours());
		this.remove(orderedTour, this.stage);
		this.nextStage = this.getClosest(this.stage, this.selectedFloors);
		this.setDirection(this.nextStage);
		this.route = orderedTour;
	}

	orderLogicalTour(){
		//remove actual stage if exist in selectedFloors
		this.remove(this.selectedFloors, this.stage);
		//Get closest
		this.nextStage = this.getClosest(this.stage, this.selectedFloors);
		//set elevator direction
		this.setDirection(this.nextStage);
		//Order tour
		this.orderStepsTour(this.nextStage);
	}

	orderStepsTour(nextStage){
		let steps = [];
		let ar = this.selectedFloors.sort(function(a, b){return a-b});
		let nextStageIndex = ar.indexOf(nextStage);
		let p1 = ar.slice(0,nextStageIndex);
		let p2 = ar.slice(nextStageIndex);
		
		if(this.direction === 2){
			steps = p1.concat(p2);
		}else{
			steps = p2.concat(p1);
		}

		this.route = steps;
	}

	getClosest(search, arr) {
		let closest = null;
		arr.forEach(function(item) {
			 if (closest === null || Math.abs(search - closest) > Math.abs(item - search)) {
					closest = item;
			 }
		});
		return closest;
 	}

	remove(array, element) {
		const index = array.indexOf(element);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	setDirection(nextStage){
		this.direction = 1;

		if(this.stage > nextStage){
			this.direction = 2;
		}
	}

	draw(){
		let elevatorId = 'column' + this.elevatorNumber;
		let stageClass = 'stage' + this.stage;
		let arrowDown = 'arrow-down' + this.stage;
		let arrowUp = 'arrow-up' + this.stage;

		let allStagesDiv = document.getElementById(elevatorId).getElementsByClassName('stage');
		let SpecificStageDiv = document.getElementById(elevatorId).getElementsByClassName(stageClass)[0];
		let allArrowsDownDiv = document.getElementById(elevatorId).getElementsByClassName('arrow-down');
		let allArrowsUpDiv = document.getElementById(elevatorId).getElementsByClassName('arrow-up');

		this.cleanDraw(allStagesDiv);
		this.cleanDrawArrows(allArrowsDownDiv);
		this.cleanDrawArrows(allArrowsUpDiv);
		
		SpecificStageDiv.style.backgroundColor = '#c13838';

		if(this.direction === 1){
			SpecificStageDiv.getElementsByClassName(arrowUp)[0].style.visibility = 'initial';
		}else if(this.direction === 2){
			SpecificStageDiv.getElementsByClassName(arrowDown)[0].style.visibility = 'initial';
		}
	}

	cleanDraw(allStagesDiv){
		for( let i=0; i< allStagesDiv.length; i++ ){
			var childDiv = allStagesDiv[i];
			childDiv.style.backgroundColor = '';
		}
	}

	cleanDrawArrows(allStagesDiv){
		for( let i=0; i< allStagesDiv.length; i++ ){
			var childDiv = allStagesDiv[i];
			childDiv.style.visibility = 'hidden';
		}
	}

	showData(){
		console.log('Elevator number: ' + this.elevatorNumber);
		console.log('Stop: ' + this.stopped);
		console.log('Stage: ' + this.stage);
		console.log('Max people: ' + this.maxPeople);
		console.log('Direction: ' + this.direction);
		console.log('Selected floors: ' + this.selectedFloors);
		console.log('Route: ' + this.route);
		console.log('Next stage: ' + this.nextStage);
	}

}

