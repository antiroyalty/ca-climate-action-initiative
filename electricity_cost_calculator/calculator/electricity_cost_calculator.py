from .utility_costs import UtilityCosts
from .infrastructure_costs import InfrastructureCosts
from .time_of_use_rates import TimeOfUseRates
from .load_profile import LoadProfile
from .solar_panel import SolarPanel
from .heat_pump import HeatPump

class ElectricityCostCalculator:
    def __init__(self, utility_costs, infrastructure_costs, tou_rates, load_profile, solar_panel=None, heat_pump=None):
        self.utility_costs = utility_costs
        self.infrastructure_costs = infrastructure_costs
        self.tou_rates = tou_rates
        self.load_profile = load_profile
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump

    def calculate_electricity_cost(self):
        # Calculate the utility and infrastructure annual costs
        utility_annual_cost = self.utility_costs.calculate_annual_cost()
        infra_return = self.infrastructure_costs.calculate_return()

        # Total annual consumption and solar generation
        total_consumption = self.load_profile.total_annual_consumption()  # Assuming this method calculates annual consumption
        solar_generation = self.solar_panel.daily_generation() * 365

        # Heat pump consumption adjusted for its efficiency
        heat_pump_consumption = self.heat_pump.energy_consumption() * 365

        # Initial cost calculation based on TOU rates
        total_cost = 0
        for hour, usage in self.load_profile.hourly_usage.items():
            rate = self.tou_rates.get_rate(hour)
            total_cost += rate * usage * 365

        # Adjust for solar savings
        solar_savings = solar_generation * self.tou_rates.average_rate()  # Assuming an average rate for simplicity
        total_cost -= solar_savings

        # Adjust for heat pump efficiency
        total_cost += heat_pump_consumption * self.tou_rates.average_rate()  # Assuming the same average rate

        # Add utility and infrastructure costs
        total_cost += utility_annual_cost + infra_return

        net_consumption = total_consumption - solar_generation + heat_pump_consumption
        return total_cost, net_consumption

# Sample constants and inputs
utility_costs = UtilityCosts(10000)  # $10,000 annual revenue requirement
infrastructure_costs = InfrastructureCosts(5000, 0.05)  # $5,000 capital with 5% return
tou_rates = TimeOfUseRates({
    (0, 6): 0.10, 
    (6, 8): 0.15, 
    (8, 12): 0.12, 
    (12, 14): 0.14, 
    (14, 17): 0.13, 
    (17, 21): 0.20, 
    (21, 24): 0.18
})
load_profile = LoadProfile({
    0: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 
    6: 4, 7: 4, 
    8: 3, 9: 3, 10: 3, 11: 3,
    12: 5, 13: 5,
    14: 4, 15: 4, 16: 4,
    17: 7, 18: 7, 19: 7, 20: 7,
    21: 5, 22: 5, 23: 5
})
solar_panel = SolarPanel(5, 0.15, {hour: 1 for hour in range(6, 18)})  # 5 kW capacity, 15% efficiency
heat_pump = HeatPump(3, 1.2, 10)  # COP of 3, insulation factor of 1.2, 10 kWh heating need

calculator = ElectricityCostCalculator(utility_costs, infrastructure_costs, tou_rates, load_profile, solar_panel, heat_pump)

total_cost, net_consumption = calculator.calculate_electricity_cost()