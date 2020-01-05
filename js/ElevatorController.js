class ElevatorController {
	elevators = [];
	stageButton;
	direction;

	constructor(elevators, stageButton, direction) {
		this.elevators = elevators;
		this.stageButton = stageButton;
		this.direction = direction;
	}

	/* Get near elevator */
	searchNearElevator(closest, button, elevator){
		if (closest === null || Math.abs(button - closest) > Math.abs(elevator.stage - button)) {
			return true;
		 }
	}

	/* Is same stage button and elevator */
	isSameStage(button, elevator){
		if(button === elevator.stage){
			return true;
		}
	}

	findNearest(){
		let self = this;
		const button = this.stageButton;
		let closest = null;

		this.elevators.forEach(function(elevator) {
			if(self.isSameStage(button, elevator)){
				closest = elevator.stage;
				return console.log('Near elevator: ' + closest);
			}
			
			if (self.searchNearElevator(closest, button, elevator)) {
				if((elevator.stage > button && elevator.direction === 2) || 
				(elevator.stage < button && elevator.direction === 1) || 
				(elevator.direction === 0)){
					closest = elevator.stage;
					if(elevator.stage !== 10)
						return console.log('Near elevator: ' + closest);
				}
			 }
		});
		//return console.log(closestFinal);
		//return console.log(closest);

	}

}

let stageButton = 4;
let direction = 1;
let controller = new ElevatorController(elevators, stageButton, direction);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}		

async function elevatorMove(){
	elevator1.init();
	elevator2.init();
	elevator3.init();
	controller.findNearest();

	for( let i=0; i< 3; i++ ){
		await sleep(4000).then(() => {
			elevator1.goNextStage();
			elevator2.goNextStage();
			elevator3.goNextStage();
			controller.findNearest();
		});
	}

}

elevatorMove();
//controller.findNearest();



console.log('%c =============== ', 'color: red');
//console.log(elevator1);

