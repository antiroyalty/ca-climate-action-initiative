# tests/test_utility_costs_pytest.py
from calculator.utility_costs import UtilityCosts

def test_calculate_annual_cost():
    revenue_requirement = 10000
    utility_costs = UtilityCosts(revenue_requirement)
    assert utility_costs.calculate_annual_cost() == revenue_requirement