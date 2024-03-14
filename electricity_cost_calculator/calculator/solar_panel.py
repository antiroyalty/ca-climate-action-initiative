CAPACITY = 5
EFFICIENCY = 0.15

SUNLIGHT_HOURS_PROFILE = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 
    6: 1, 7: 2, 
    8: 3, 9: 4, 10: 5, 11: 6,
    12: 7, 13: 7,
    14: 6, 15: 5, 16: 4,
    17: 3, 18: 2,
    19: 0, 20: 0, 21: 0, 22: 0, 23: 0
} # hour, generation (kWh)

from .time_of_use_rates import TimeOfUseRates
from .hour import Hour
from typing import Union, Literal, Dict

class SolarPanel:
    def __init__(self):
        self.capacity = CAPACITY
        self.efficiency = EFFICIENCY
        self.sunlight_hours = SUNLIGHT_HOURS_PROFILE

    def daily_generation(self):
        return self.capacity * self.efficiency * sum(self.sunlight_hours.values())
    
    def hourly_generation(self, hour):
        # Directly calculate and return the generation for the given hour
        generation_per_hour = (self.capacity * self.efficiency) * self.sunlight_hours.get(hour, 0)
        return generation_per_hour

    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        cost = {hour: 0.0 for hour in range(24)}

        for hour, gen in self.sunlight_hours.items():
            for time_range, rate in tou_rates.rates.items():
                if time_range[0] <= hour < time_range[1]:
                    cost[hour] -= gen * rate
                break
    
        return cost