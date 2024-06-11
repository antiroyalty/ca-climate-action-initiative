from ..rates.time_of_use_rates import TimeOfUseRates
from ..hour import Hour, to_h
from typing import Dict

CHARGING_EFFICIENCY = 0.9  # Assuming 90% efficiency
DEFAULT_CHARGE_START = 22  # 10 PM
DEFAULT_CHARGE_END = 6  # 6 AM

class ElectricVehicle:
    def __init__(self, efficiency: float = 0.3, daily_miles: int = 40):
        self.efficiency = efficiency  # kWh needed to drive one mile
        self.daily_miles = daily_miles  # Number of miles driven daily
        self.charging_efficiency = CHARGING_EFFICIENCY  # Charging efficiency
        self.charge_start = DEFAULT_CHARGE_START
        self.charge_end = DEFAULT_CHARGE_END

    def daily_energy_consumption(self):
        """Calculate the total energy needed per day, adjusted for charging efficiency."""
        return (self.efficiency * self.daily_miles) / self.charging_efficiency

    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        """Calculate the cost of charging the vehicle within the charging window."""
        daily_consumption = self.daily_energy_consumption()
        cost_per_hour = daily_consumption * self.efficiency  # Energy consumed per hour

        cost : Dict[Hour, float]= {}
        for hour in range(self.charge_start, self.charge_start + 24):
            adjusted_hour = hour % 24  # Ensure hour wraps around correctly
            # cursed way
            # assert sendhour(adjusted_hour)

            # Only consider hours within the charging window
            if self.charge_start <= adjusted_hour < self.charge_end:
                rate = tou_rates.get_rate(adjusted_hour)  # Get the rate for the current hour
                cost[to_h(adjusted_hour)] = cost_per_hour * rate  # Calculate and store the cost for this hour

        return cost
