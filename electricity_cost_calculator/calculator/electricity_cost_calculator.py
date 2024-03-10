from .revenue_requirement import RevenueRequirement
from .time_of_use_rates import TimeOfUseRates
from .load_profile import LoadProfile
from .solar_panel import SolarPanel
from .heat_pump import HeatPump
from .electric_vehicle import ElectricVehicle

class ElectricityCostCalculator:
    def __init__(self, revenue_requirement, tou_rates, load_profile, solar_panel=None, heat_pump=None, ev=None):
        self.revenue_requirement = revenue_requirement
        self.tou_rates = tou_rates
        self.load_profile = load_profile
        self.solar_panel = solar_panel
        self.heat_pump = heat_pump
        self.ev = ev

    def daily_electricity_cost(self):
        total_cost = 0
        total_cost += self.load_cost_daily()
        total_cost += self.solar_panel_cost_daily()
        total_cost += self.heat_pump_cost_daily()
        total_cost += self.ev_cost_daily()

        # Todo, add amortized utility revenue requirement... or assume it gets captured in TOU rates
        
        return total_cost
   
    def load_cost_daily(self):
        cost = 0

        for hour, usage in self.load_profile.hourly_usage.items():
            rate = self.tou_rates.get_rate(hour)
            cost += rate * usage
        
        return cost
    
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
    
    def ev_cost_daily(self):
        return self.ev.daily_energy_consumption() * min(self.tou_rates.rates.values()) if self.ev else 0

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
    solar_panel,
    heat_pump,
    electric_vehicle
)

daily_cost = calculator.daily_electricity_cost()

print("--------------- Annual ----------------")
print(f"Daily Electricity Cost: ${daily_cost:,.2f}")