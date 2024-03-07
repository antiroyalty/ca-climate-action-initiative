CAPACITY = 5
EFFICIENCY = 0.15
SUNLIGHT_HOURS = { hour: 1 for hour in range(6, 18) }

class SolarPanel:
    def __init__(self):
        self.capacity = CAPACITY
        self.efficiency = EFFICIENCY
        self.sunlight_hours = SUNLIGHT_HOURS

    def daily_generation(self):
        return self.capacity * self.efficiency * sum(self.sunlight_hours.values())