# tests/test_electricity_cost_calculator.py
import pytest

from calculator.electricity_cost_calculator import ElectricityCostCalculator
from calculator.revenue_requirement import RevenueRequirement
from calculator.rates.time_of_use_rates import TimeOfUseRates
from calculator.loads.general_load import GeneralLoad
from calculator.loads.solar_panel import SolarPanel
from calculator.loads.heat_pump import HeatPump
from calculator.loads.electric_vehicle import ElectricVehicle
from calculator.hour import Hour

@pytest.fixture
def mock_revenue_requirement(mocker):
    return mocker.Mock(spec=RevenueRequirement, calculate_annual_cost=mocker.Mock(return_value=10000))

@pytest.fixture
def mock_tou_rates(mocker):
    mock = mocker.Mock(spec=TimeOfUseRates)
    mock.rates = {
        (0, 6): 0.10, 
        (6, 8): 0.15, 
        (8, 12): 0.12, 
        (12, 14): 0.14,
        (14, 17): 0.13, 
        (17, 21): 0.20, 
        (21, 24): 0.18 
    }
    return mock

@pytest.fixture
def mock_general_load(mocker):
    return mocker.Mock(spec=GeneralLoad, calculate_cost=mocker.Mock(return_value={0: 0.2, 1: 0.2}))

@pytest.fixture
def mock_solar_panel(mocker):
    return mocker.Mock(spec=SolarPanel, calculate_cost=mocker.Mock(return_value={6: -0.1, 7: -0.2}))

@pytest.fixture
def mock_heat_pump(mocker):
    return mocker.Mock(spec=HeatPump, calculate_cost=mocker.Mock(return_value={14: 0.4, 15: 0.5}))

@pytest.fixture
def mock_electric_vehicle(mocker):
    return mocker.Mock(spec=ElectricVehicle, calculate_cost=mocker.Mock(return_value={17: 0.6, 18: 0.7}))

def test_daily_electricity_cost_with_mix_of_load_types(mock_revenue_requirement, mock_tou_rates, mock_general_load, mock_solar_panel, mock_heat_pump, mock_electric_vehicle):
    calculator = ElectricityCostCalculator(mock_revenue_requirement, mock_tou_rates, mock_general_load, mock_solar_panel, mock_heat_pump, mock_electric_vehicle)
    daily_cost = calculator.daily_electricity_cost()
    expected_cost = 2.3
    assert pytest.approx(daily_cost) == expected_cost

def test_aggregate_costs_method_handles_negative_values():
    calculator = ElectricityCostCalculator(None, None, None)  # No need for actual instances in this test
    costs = [
        {0: 0.2, 1: 0.3},
        {0: -0.1, 1: -0.2}
    ]
    aggregated_costs = calculator.aggregate_costs(costs)
    expected_aggregated_costs = {0: 0.1, 1: 0.1}
    assert aggregated_costs == pytest.approx(expected_aggregated_costs)

