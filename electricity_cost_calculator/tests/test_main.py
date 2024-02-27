import pytest
from calculator.utility_costs import UtilityCosts
from calculator.infrastructure_costs import InfrastructureCosts
from calculator.time_of_use_rates import TimeOfUseRates
from calculator.heat_pump import HeatPump

def test_annual_utility_cost():
    utility_costs = UtilityCosts(revenue_requirement=100000)
    assert utility_costs.calculate_annual_cost() == 100000

def test_infrastructure_return():
    infrastructure_costs = InfrastructureCosts(capital_cost=50000, rate_of_return=0.07)
    assert round(infrastructure_costs.calculate_return(), 2) == 3500

def test_rate_at_specific_hour():
    tou_rates = TimeOfUseRates({
        (0, 6): 0.10, 
        (6, 12): 0.15, 
        (12, 18): 0.20, 
        (18, 24): 0.25
    })
    assert tou_rates.get_rate(10) == 0.15

def test_heat_pump_energy_consumption():
    heat_pump = HeatPump(cop=3.5, insulation_factor=1.2, heating_need=10000)
    assert round(heat_pump.energy_consumption(), 2) == 2380.95

