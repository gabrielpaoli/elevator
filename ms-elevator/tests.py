import pytest

from app import app
from controller.Elevator import Elevator
from controller.elevator_controller import get_guy
from controller.Person import Person


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_case_1():
    pepe = Person(1)
    elevator1 = Elevator("elevator1", [0, 1, 2])
    elevator2 = Elevator("elevator2", [9])
    elevator3 = Elevator("elevator3", [2, 3, 4])
    answer = get_guy(pepe, [elevator1, elevator2, elevator3])
    assert answer == "elevator1"


def test_case_2():
    pepe = Person(1)
    elevator1 = Elevator("elevator1", [4, 5, 6, 7, 8, 9])
    elevator2 = Elevator("elevator2", [9])
    elevator3 = Elevator("elevator3", [2, 3, 4])
    answer = get_guy(pepe, [elevator1, elevator2, elevator3])
    assert answer["value"] == 1


def test_case_3():
    pepe = Person(5)
    elevator1 = Elevator("elevator1", [0, 1, 2, 3])
    elevator2 = Elevator("elevator2", [1, 2])
    elevator3 = Elevator("elevator3", [4])
    answer = get_guy(pepe, [elevator1, elevator2, elevator3])
    print(answer)


def test_case_4():
    pepe = Person(5)
    elevator1 = Elevator("elevator1", [0, 1, 2, 3, 4])
    elevator2 = Elevator("elevator2", [1, 2])
    elevator3 = Elevator("elevator3", [4])
    answer = get_guy(pepe, [elevator1, elevator2, elevator3])
    assert answer["value"] == 1


def test_client(client):
    a = client.get("/elevators/4")
    data = a.get_json()
    assert data["message"] == "the floor selected was elevator3"
