from utility_costs import UtilityCosts
from infrastructure_costs import InfrastructureCosts
from time_of_use_rates import TimeOfUseRates
from heat_pump import HeatPump

utility_costs = UtilityCosts(revenue_requirement=100000, total_kwh_used=500000)
infrastructure_costs = InfrastructureCosts(capital_cost=50000, rate_of_return=0.07)
tou_rates = TimeOfUseRates({
    (0, 6): 0.10, 
    (6, 12): 0.15, 
    (12, 18): 0.20, 
    (18, 24): 0.25
})
heat_pump = HeatPump(cop=3.5, insulation_factor=1.2, heating_need=10000)

# Calculate utility cost
annual_utility_cost = utility_costs.calculate_annual_cost()
print(f"Annual Utility Cost: ${annual_utility_cost}")

# Calculate infrastructure return
infrastructure_return = infrastructure_costs.calculate_return()
print(f"Infrastructure Return: ${infrastructure_return}")

# Get rate for a specific hour using Time of Use Rates
rate_at_10am = tou_rates.get_rate(10)
print(f"Rate at 10 AM: ${rate_at_10am} per kWh")

# Calculate heat pump energy consumption
heat_pump_energy_consumption = heat_pump.energy_consumption()
print(f"Heat Pump Energy Consumption: {heat_pump_energy_consumption} kWh")
