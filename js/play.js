let selectedFloors1 = [2,4,8,9];
let selectedFloors2 = [3,5,8,7];
let selectedFloors3 = [2,4,1,8];

let elevator1 = new Elevator(1, 3, selectedFloors1);
let elevator2 = new Elevator(2, 7, selectedFloors2);
let elevator3 = new Elevator(3, 1, selectedFloors3);

let elevators = [elevator1, elevator2, elevator3];

const stageButton = 4;
const direction = 1;
let controller = new ElevatorController(elevators, stageButton, direction);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}		

async function simulateElevatorsMove(){
	elevator1.init();
	elevator2.init();
	elevator3.init();
	controller.findNearest();
	console.log('%c =============== ', 'color: red');

	for( let i=0; i< 3; i++ ){
		await sleep(4000);
		elevator1.goNextStage();
		elevator2.goNextStage();
		elevator3.goNextStage();
		controller.findNearest();
		console.log('%c =============== ', 'color: red');
	}

}

//elevator1.orderEnergySaveTour();
simulateElevatorsMove();