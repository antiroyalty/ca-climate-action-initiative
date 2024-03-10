COP = 3
INSULATION_FACTOR = 1.2

HEAT_PUMP_PROFILE = {
    0: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 
    6: 4, 7: 4, 
    8: 3, 9: 3, 10: 3, 11: 3,
    12: 5, 13: 5,
    14: 4, 15: 4, 16: 4,
    17: 7, 18: 7, 19: 7, 20: 7,
    21: 5, 22: 5, 23: 5
}

class HeatPump:
    def __init__(self):
        self.cop = COP
        self.insulation_factor = INSULATION_FACTOR
        self.daily_profile = HEAT_PUMP_PROFILE

    def efficiency_adjustment(self):
        return self.cop * self.insulation_factor

    def daily_consumption(self):
        total_consumption = sum(self.daily_heating_profile.values())
        adjusted_consumption = total_consumption / self.efficiency_adjustment()
        return adjusted_consumption