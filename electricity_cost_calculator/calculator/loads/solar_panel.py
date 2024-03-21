from ..rates.time_of_use_rates import TimeOfUseRates
from ..hour import Hour, hours
from typing import Dict

CAPACITY = 5
EFFICIENCY = 0.15

SUNLIGHT_HOURS_PROFILE : Dict[Hour, float] = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 
    6: 1, 7: 2, 
    8: 3, 9: 4, 10: 5, 11: 6,
    12: 7, 13: 7,
    14: 6, 15: 5, 16: 4,
    17: 3, 18: 2,
    19: 0, 20: 0, 21: 0, 22: 0, 23: 0
} # hour, generation (kWh)

class SolarPanel:
    def __init__(self, nem : bool):
        self.capacity = CAPACITY
        self.efficiency = EFFICIENCY
        self.sunlight_hours = SUNLIGHT_HOURS_PROFILE
        self.nem = nem

    def daily_generation(self):
        if self.nem == False: return 0

        return self.capacity * self.efficiency * sum(self.sunlight_hours.values())
    
    def hourly_generation(self, hour):
        if self.nem == False: return 0
    
        # Directly calculate and return the generation for the given hour
        generation_per_hour = (self.capacity * self.efficiency) * self.sunlight_hours.get(hour, 0)
        return generation_per_hour if self.nem else 0

    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        cost : Dict[Hour, float] = { hour: 0.0 for hour in hours() }
        
        if self.nem == False: return cost

        for hour, gen in self.sunlight_hours.items():
            for time_range, rate in tou_rates.rates.items():
                if time_range[0] <= hour < time_range[1]:
                    cost[hour] -= gen * rate
                break
    
        return cost