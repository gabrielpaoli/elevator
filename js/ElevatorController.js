class ElevatorController {
	elevators = [];
	stageButton;
	direction;
	callElevator;

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
			}

			if (self.searchNearElevator(closest, button, elevator)) {
				if((elevator.stage > button && elevator.direction === 2) || 
				(elevator.stage < button && elevator.direction === 1) || 
				(elevator.direction === 0)){
					closest = elevator.stage;
				}
			}

		});
		
		this.callElevator = closest;
		return console.log(closest);
	}

}
