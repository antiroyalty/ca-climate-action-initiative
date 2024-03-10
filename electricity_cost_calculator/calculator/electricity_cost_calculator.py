from .revenue_requirement import RevenueRequirement
from .time_of_use_rates import TimeOfUseRates
from .load_profile import LoadProfile
from .solar_panel import SolarPanel
from .heat_pump import HeatPump
from .electric_vehicle import ElectricVehicle

class ElectricityCostCalculator:
    def __init__(self, revenue_requirement, tou_rates, load_profile, num_residents, solar_panel=None, heat_pump=None, ev=None):
        self.revenue_requirement = revenue_requirement
        self.tou_rates = tou_rates
        self.load_profile = load_profile
        self.num_residents = num_residents
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump
        self.ev = ev

    def daily_electricity_cost(self):
        total_cost = 0

        for hour, usage in self.load_profile.hourly_usage.items():
            rate = self.tou_rates.get_rate(hour)
            total_cost += rate * usage * 365

        total_cost += self.solar_panel_cost_daily()

        total_cost += self.heat_pump_cost_daily()

        # if self.ev:
            # ev_annual_consumption = self.ev.daily_energy_consumption() * 365
            # total_cost += ev_annual_consumption * self.tou_rates.average_rate()
            # total_cost += ev_annual_consumption * self.tou_rates.average_rate()  # Adjusting for EV consumption

        # Total annual consumption and solar generation
        # total_consumption = self.load_profile.total_annual_consumption()  # Assuming this method calculates annual consumption

        # Consumption (kWh per year)
        # net_consumption = total_consumption - solar_generation + heat_pump_consumption + ev_annual_consumption
        # net_consumption_per_person = net_consumption / self.num_residents if self.num_residents else 0
        
        return total_cost, 0, 0, 0
   
    def solar_panel_cost_daily(self):
        cost = 0
        
        if self.solar_panel:
                for hour, gen in self.solar_panel.sunlight_hours.items():
                    for time_range, rate in self.tou_rates.rates.items():
                        if time_range[0] <= hour < time_range[1]:
                            cost += gen * rate
                        break
    
        return (-cost)

    def heat_pump_cost_daily(self):
        cost = 0

        if self.heat_pump:
            for hour, consumption in self.heat_pump.daily_profile.items():
                for time_range, rate in self.tou_rates.rates.items():
                    if time_range[0] <= hour < time_range[1]:
                        cost += consumption * rate
                        break
        return cost

num_residents = 100 # # of people
revenue_requirement = RevenueRequirement() # $
tou_rates = TimeOfUseRates() # $

load_profile = LoadProfile() # Hours : kWh
solar_panel = SolarPanel()
heat_pump = HeatPump()
electric_vehicle = ElectricVehicle()  # 0.3 kWh/mile efficiency, 40 miles daily

calculator = ElectricityCostCalculator(
    revenue_requirement, 
    tou_rates,
    load_profile,
    num_residents,
    solar_panel,
    heat_pump,
    electric_vehicle
)

total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.daily_electricity_cost()

print("--------------- Annual ----------------")
print(f"Total Electricity Cost: ${total_cost:,.2f}")
print(f"Net Consumption: {net_consumption:,.2f} kWh")
print(f"Cost per Person: ${per_person_cost:,.2f}")
print(f"Net Consumption per Person: {net_consumption_per_person:,.2f} kWh")