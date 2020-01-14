def get_guy(Person, elevators):
    """
    return what guy should get
    """
    for elevator in elevators:
        if Person.location in elevator.range_floor:
            return elevator

    res = []
    for elevator in elevators:
        if Person.location < min(elevator.range_floor):
            el = {}
            el.update(elevator=elevator)
            el.update(value=min(elevator.range_floor) - Person.location)
            res.append(el)
        else:
            el = {}
            el.update(elevator=elevator)
            el.update(value=Person.location - max(elevator.range_floor))
            res.append(el)

    sequence = [items["value"] for items in res]
    less_number = min(sequence)
    for item in res:
        if item["value"] == less_number:
            return item["elevator"]
