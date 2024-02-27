class SolarPanel:
    def __init__(self, capacity, efficiency, sunlight_hours):
        self.capacity = capacity
        self.efficiency = efficiency
        self.sunlight_hours = sunlight_hours

    def daily_generation(self):
        return self.capacity * self.efficiency * sum(self.sunlight_hours.values())