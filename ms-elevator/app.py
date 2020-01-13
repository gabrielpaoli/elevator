from flask import Flask

from controller.Elevator import Elevator
from controller.Person import Person

app = Flask(__name__)


@app.route("/elevators/<int:floor>")
def get_elevator(floor):
    # case 1
    human = Person(floor)
    elevator1 = Elevator("elevator1", [0, 1, 2])
    elevator2 = Elevator("elevator2", [9])
    elevator3 = Elevator("elevator3", [2, 3, 4])
    chose_elevator = get_guy(human, [elevator1, elevator2, elevator3])

    return f"the floor selected was {chose_elevator}"


def get_guy(Person, elevators):
    """
    return what guy should get
    """
    for elevator in elevators:
        if Person.location in elevator.range_floor:
            return elevator.name

    res = []
    for elevator in elevators:
        if Person.location < min(elevator.range_floor):
            el = {}
            el.update(elevator=elevator.name)
            el.update(value=min(elevator.range_floor) - Person.location)
            res.append(el)
        else:
            el = {}
            el.update(elevator=elevator.name)
            el.update(value=Person.location - max(elevator.range_floor))
            res.append(el)

    sequence = [items["value"] for items in res]
    less_number = min(sequence)
    for item in res:
        if item["value"] == less_number:
            return item
