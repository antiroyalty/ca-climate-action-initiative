from .utility_costs import UtilityCosts
from .infrastructure_costs import InfrastructureCosts
from .time_of_use_rates import TimeOfUseRates
from .load_profile import LoadProfile
from .solar_panel import SolarPanel
from .heat_pump import HeatPump
from .electric_vehicle import ElectricVehicle

class ElectricityCostCalculator:
    def __init__(self, utility_costs, infrastructure_costs, tou_rates, load_profile, num_residents, solar_panel=None, heat_pump=None, ev=None):
        self.utility_costs = utility_costs
        self.infrastructure_costs = infrastructure_costs
        self.tou_rates = tou_rates
        self.load_profile = load_profile
        self.num_residents = num_residents
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump
        self.ev = ev

    def calculate_electricity_cost(self):
        # Calculate the utility and infrastructure annual costs
        utility_annual_cost = self.utility_costs.calculate_annual_cost()
        infra_return = self.infrastructure_costs.calculate_return()

        # Initial cost calculation based on TOU rates
        total_cost = 0

        for hour, usage in self.load_profile.hourly_usage.items():
            rate = self.tou_rates.get_rate(hour)
            total_cost += rate * usage * 365

        if self.solar_panel:
            solar_generation = self.solar_panel.daily_generation() * 365
            solar_savings = solar_generation * self.tou_rates.average_rate()
            total_cost -= solar_savings

        if self.heat_pump:
            heat_pump_consumption = self.heat_pump.energy_consumption() * 365
            total_cost += heat_pump_consumption * self.tou_rates.average_rate()
            total_cost += heat_pump_consumption * self.tou_rates.average_rate()  # Assuming the same average rate
        
        if self.ev:
            ev_annual_consumption = self.ev.daily_energy_consumption() * 365
            total_cost += ev_annual_consumption * self.tou_rates.average_rate()
            total_cost += ev_annual_consumption * self.tou_rates.average_rate()  # Adjusting for EV consumption

        # Total annual consumption and solar generation
        total_consumption = self.load_profile.total_annual_consumption()  # Assuming this method calculates annual consumption

        # Consumption (kWh per year)
        net_consumption = total_consumption - solar_generation + heat_pump_consumption + ev_annual_consumption
        net_consumption_per_person = net_consumption / self.num_residents if self.num_residents else 0
        
        # Costs
        total_cost += utility_annual_cost + infra_return
        per_person_cost = total_cost / self.num_residents if self.num_residents else 0

        return total_cost, per_person_cost, net_consumption, net_consumption_per_person

utility_costs = UtilityCosts(10000)  # $10,000 annual revenue requirement
infrastructure_costs = InfrastructureCosts(5000, 0.05)  # $5,000 capital with 5% return
tou_rates = TimeOfUseRates() # in $
load_profile = LoadProfile() # Hours : kWh

num_residents = 100 # # of people
solar_panel = SolarPanel()
heat_pump = HeatPump()
electric_vehicle = ElectricVehicle()  # 0.3 kWh/mile efficiency, 40 miles daily

calculator = ElectricityCostCalculator(
    utility_costs, 
    infrastructure_costs,
    tou_rates,
    load_profile,
    num_residents,
    solar_panel,
    heat_pump,
    electric_vehicle
)

total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.calculate_electricity_cost()

print("--------------- Annual ----------------")
print(f"Total Electricity Cost: ${total_cost:,.2f}")
print(f"Net Consumption: {net_consumption:,.2f} kWh")
print(f"Cost per Person: ${per_person_cost:,.2f}")
print(f"Net Consumption per Person: {net_consumption_per_person:,.2f} kWh")