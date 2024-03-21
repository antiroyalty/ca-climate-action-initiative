from ..rates.time_of_use_rates import TimeOfUseRates
from ..hour import Hour
from typing import Dict

COP = 3
INSULATION_FACTOR = 1.2

HEAT_PUMP_PROFILE: Dict[Hour, int] = {
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
        total_consumption = sum(HEAT_PUMP_PROFILE.values())
        adjusted_consumption = total_consumption / self.efficiency_adjustment()
        return adjusted_consumption
    
    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]: # hours : dollars HourlyCosts
        cost = {}
        for hour, consumption in self.daily_profile.items():
            for time_range, rate in tou_rates.rates.items():
                if time_range[0] <= hour < time_range[1]:
                    cost[hour] = consumption * rate
                    break
        return cost
    

    def calculate_load(self) ->  Dict[Hour, float]: # hours : kWh
        load = {}
        for hour, consumption in self.daily_profile.items():
            load[hour] = float(consumption) / self.efficiency_adjustment()
        
        return load