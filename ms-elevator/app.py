from flask import Flask, jsonify

from controller.Elevator import Elevator
from controller.elevator_controller import get_guy
from controller.Person import Person

app = Flask(__name__)


@app.route("/elevators/<int:floor>")
def get_elevator(floor):
    """
    get the elevator by floor requested
    """
    human = Person(floor)
    elevator1 = Elevator("elevator1", [0, 1, 2])
    elevator2 = Elevator("elevator2", [9])
    elevator3 = Elevator("elevator3", [2, 3, 4])
    chose_elevator = get_guy(human, [elevator1, elevator2, elevator3])
    return jsonify(message=f"the elevator selected was {chose_elevator.name}")
