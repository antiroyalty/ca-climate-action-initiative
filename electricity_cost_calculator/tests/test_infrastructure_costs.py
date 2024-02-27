import pytest
from calculator.infrastructure_costs import InfrastructureCosts  # Adjust the import path as needed

def test_calculate_return():
    # Typical case
    infrastructure_costs = InfrastructureCosts(capital_cost=5000, rate_of_return=0.05)
    expected_return = 5000 * 0.05  # Capital Cost * Rate of Return
    assert infrastructure_costs.calculate_return() == expected_return, "Return calculation is incorrect for typical case"

def test_calculate_return_zero_rate_of_return():
    # Boundary case where rate of return is zero
    infrastructure_costs = InfrastructureCosts(capital_cost=5000, rate_of_return=0)
    expected_return = 0  # Should be zero when rate of return is zero
    assert infrastructure_costs.calculate_return() == expected_return, "Return calculation should be zero when rate of return is zero"

def test_calculate_return_negative_capital_cost():
    # Testing with a negative capital cost
    infrastructure_costs = InfrastructureCosts(capital_cost=-5000, rate_of_return=0.05)
    expected_return = -5000 * 0.05  # Negative capital cost should still calculate correctly
    assert infrastructure_costs.calculate_return() == expected_return, "Return calculation with negative capital cost is incorrect"

def test_calculate_return_negative_rate_of_return():
    # Testing with a negative rate of return
    infrastructure_costs = InfrastructureCosts(capital_cost=5000, rate_of_return=-0.05)
    expected_return = 5000 * -0.05  # Negative rate of return should still calculate correctly
    assert infrastructure_costs.calculate_return() == expected_return, "Return calculation with negative rate of return is incorrect"
