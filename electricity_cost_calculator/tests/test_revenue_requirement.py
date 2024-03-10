import pytest
from calculator.revenue_requirement import RevenueRequirement, OPERATING_COST_GENERATION, OPERATING_COST_TRANSMISSION, OPERATING_COST_DISTRIBUTION, RATE_OF_RETURN, CAPITAL_COST_GENERATION, CAPITAL_COST_TRANSMISSION, CAPITAL_COST_DISTRIBUTION, TAXES

class TestRevenueRequirement:
    @pytest.fixture
    def rr(self):
        return RevenueRequirement()

    def test_operating_costs(self, rr):
        expected_operating_costs = OPERATING_COST_GENERATION + OPERATING_COST_TRANSMISSION + OPERATING_COST_DISTRIBUTION
        assert rr.operating_costs() == expected_operating_costs

    def test_capital_costs(self, rr):
        expected_capital_costs = CAPITAL_COST_GENERATION + CAPITAL_COST_TRANSMISSION + CAPITAL_COST_DISTRIBUTION
        assert rr.capital_costs() == expected_capital_costs

    def test_calculate_annual_cost(self, rr):
        expected_annual_cost = (OPERATING_COST_GENERATION + OPERATING_COST_TRANSMISSION + OPERATING_COST_DISTRIBUTION) + RATE_OF_RETURN * (CAPITAL_COST_GENERATION + CAPITAL_COST_TRANSMISSION + CAPITAL_COST_DISTRIBUTION) + TAXES
        assert rr.calculate_annual_cost() == pytest.approx(expected_annual_cost)
