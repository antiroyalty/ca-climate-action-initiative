from .revenue_requirement import RevenueRequirement
from .time_of_use_rates import TimeOfUseRates
from .load_profile import LoadProfile
from .solar_panel import SolarPanel
from .heat_pump import HeatPump
from .electric_vehicle import ElectricVehicle
from .time_of_use_rates import TimeOfUseRates

from typing import Protocol
from typing import Union, Literal, Dict, List
Hour = Union[Literal[0], Literal[1], Literal[2], Literal[3], Literal[4], Literal[5], Literal[6], Literal[7],
             Literal[8], Literal[9], Literal[10], Literal[11], Literal[12], Literal[13], Literal[14], Literal[15],
             Literal[16], Literal[17], Literal[18], Literal[19], Literal[20], Literal[21], Literal[22], Literal[23]]

class LoadType(Protocol):
    def calculate_cost(self, tou_rates: TimeOfUseRates) -> Dict[Hour, float]:
        ...

class ElectricityCostCalculator:
    def __init__(self, revenue_requirement, tou_rates, load_profile: LoadType | None, solar_panel: LoadType | None = None, heat_pump: LoadType | None = None, ev: LoadType | None = None):
        self.revenue_requirement = revenue_requirement
        self.tou_rates = tou_rates
        self.load_profile = load_profile
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump
        self.ev = ev

        self.all_load_types: list[LoadType] = [t for t in [solar_panel, heat_pump, ev] if t is not None]

    def daily_electricity_cost(self):
        total_cost = 0

        total_cost = [t.calculate_cost(self.tou_rates) for t in self.all_load_types] # sum([])
        aggregated = self.aggregate_costs(costs=total_cost)
        print(aggregated)
    
        # Todo, add amortized utility revenue requirement... or assume it gets captured in TOU rates
        
        return sum(aggregated.values())
    
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
load_profile = LoadProfile() # Hours : kWh
solar_panel = SolarPanel()
heat_pump = HeatPump()
electric_vehicle = ElectricVehicle()  # 0.3 kWh/mile efficiency, 40 miles daily

calculator = ElectricityCostCalculator(
    revenue_requirement, 
    tou_rates,
    None, # load_profile,
    solar_panel,
    heat_pump,
    None, # electric_vehicle
)

daily_cost = calculator.daily_electricity_cost()

print("--------------- Annual ----------------")
print(f"Daily Electricity Cost: ${daily_cost:,.2f}")