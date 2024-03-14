EFFICIENCY = 0.3
DAILY_MILES = 40

from .time_of_use_rates import TimeOfUseRates
from .hour import Hour

from typing import Dict

class ElectricVehicle:
    def __init__(self):
        self.efficiency = EFFICIENCY  # kWh per mile
        self.daily_miles = DAILY_MILES  # Daily miles driven

    def daily_energy_consumption(self):
        # The daily energy consumption of EV in kWh.
        return self.efficiency * self.daily_miles
    
    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        evenly_spread_charging = self.daily_energy_consumption() * min(tou_rates.rates.values()) / 6 # TODO make this dynamically calculated from min rate
        cost = {}

        for h in range(24):
            if h < 6:
                cost[h] = evenly_spread_charging
            else:
                cost[h] = 0
            
        return cost