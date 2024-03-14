EFFICIENCY = 0.3
DAILY_MILES = 40

from .time_of_use_rates import TimeOfUseRates
from typing import Union, Literal, Dict
Hour = Union[Literal[0], Literal[1], Literal[2], Literal[3], Literal[4], Literal[5], Literal[6], Literal[7],
             Literal[8], Literal[9], Literal[10], Literal[11], Literal[12], Literal[13], Literal[14], Literal[15],
             Literal[16], Literal[17], Literal[18], Literal[19], Literal[20], Literal[21], Literal[22], Literal[23]]

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

        for h in hours:
            if h < 6:
                cost[h] = evenly_spread_charging
            else:
                cost[h] = 0
            
        return cost