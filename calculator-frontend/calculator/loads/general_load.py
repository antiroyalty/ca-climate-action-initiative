from ..rates.time_of_use_rates import TimeOfUseRates
from ..hour import Hour
from typing import Dict

HOURLY_USAGE : Dict[Hour, int] = {
    0: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 
    6: 4, 7: 4, 
    8: 3, 9: 3, 10: 3, 11: 3,
    12: 5, 13: 5,
    14: 4, 15: 4, 16: 4,
    17: 7, 18: 7, 19: 7, 20: 7,
    21: 5, 22: 5, 23: 5
} # in kWh

class GeneralLoad:
    def __init__(self):
        self.hourly_usage = HOURLY_USAGE

    def total_annual_consumption(self):
        # Sum up all the hourly consumptions and assume it represents a daily pattern repeated over a year
        daily_consumption = sum(self.hourly_usage.values())
        return daily_consumption * 365
    
    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        cost = {}

        for hour, usage in self.hourly_usage.items(): # TODO this assumes there is electricity used every hour
            cost[hour] = usage * tou_rates.get_rate(hour)
        
        return cost