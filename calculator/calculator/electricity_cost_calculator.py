from .revenue_requirement import RevenueRequirement
from .rates.time_of_use_rates import TimeOfUseRates
from .loads.general_load import GeneralLoad
from .loads.solar_panel import SolarPanel
from .loads.heat_pump import HeatPump
from .loads.electric_vehicle import ElectricVehicle
from .hour import Hour

from typing import Protocol, Dict

class LoadType(Protocol):
    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        ...

class ElectricityCostCalculator:
    def __init__(self, revenue_requirement, tou_rates, general_load: LoadType | None, solar_panel: LoadType | None = None, heat_pump: LoadType | None = None, ev: LoadType | None = None):
        self.revenue_requirement = revenue_requirement
        self.tou_rates = tou_rates
        self.general_load = general_load
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump
        self.ev = ev

        self.all_load_types: list[LoadType] = [t for t in [solar_panel, heat_pump, ev, general_load] if t is not None]

    def daily_electricity_cost(self):
        all_hourly_costs = [t.calculate_cost(self.tou_rates) for t in self.all_load_types]
        
        total_hourly_costs = self.aggregate_costs(costs=all_hourly_costs)
    
        return sum(total_hourly_costs.values())
    
    def aggregate_costs(self, costs: list[Dict[Hour, float]]) -> Dict[int, float]:
        aggregated_costs = {}
        for cost_dict in costs:
            for hour, cost in cost_dict.items():
                if hour in aggregated_costs:
                    aggregated_costs[hour] += cost
                else:
                    aggregated_costs[hour] = cost
        return aggregated_costs

revenue_requirement = RevenueRequirement() # $
tou_rates = TimeOfUseRates() # $
general_load = GeneralLoad() # Hours : kWh
solar_panel = SolarPanel(True)
heat_pump = HeatPump()
electric_vehicle = ElectricVehicle()  # 0.3 kWh/mile efficiency, 40 miles daily

calculator = ElectricityCostCalculator(
    revenue_requirement, 
    tou_rates,
    general_load,
    solar_panel,
    heat_pump,
    electric_vehicle
)
daily_cost = calculator.daily_electricity_cost()

print("--------------- Annual ----------------")
print(f"Daily Electricity Cost: ${daily_cost:,.2f}")