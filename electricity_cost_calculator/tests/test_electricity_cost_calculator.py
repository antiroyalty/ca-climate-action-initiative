# tests/test_electricity_cost_calculator.py
import pytest

from calculator.electricity_cost_calculator import ElectricityCostCalculator
from calculator.revenue_requirement import RevenueRequirement
from calculator.time_of_use_rates import TimeOfUseRates
from calculator.load_profile import LoadProfile
from calculator.solar_panel import SolarPanel
from calculator.heat_pump import HeatPump
from calculator.electric_vehicle import ElectricVehicle

@pytest.fixture
def mock_revenue_requirement(mocker):
    return mocker.Mock(spec=RevenueRequirement, calculate_annual_cost=mocker.Mock(return_value=10000))

@pytest.fixture
def mock_tou_rates(mocker):
    mock = mocker.Mock(spec=TimeOfUseRates)
    mock.get_rate = mocker.Mock(side_effect=lambda hour: 0.15 if 0 <= hour < 6 else 0.2)
    mock.average_rate = mocker.Mock(return_value=0.175)
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
def mock_load_profile(mocker):
    return mocker.Mock(spec=LoadProfile, total_annual_consumption=mocker.Mock(return_value=3650), hourly_usage={0: 2, 1: 2, 2: 2})

@pytest.fixture
def mock_solar_panel(mocker):
    return mocker.Mock(spec=SolarPanel, daily_generation=mocker.Mock(return_value=5), sunlight_hours={
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 12: 7, 13: 7, 14: 6, 15: 5, 16: 4, 17: 3, 18: 2, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0})

@pytest.fixture
def mock_heat_pump(mocker):
    return mocker.Mock(spec=HeatPump, energy_consumption=mocker.Mock(return_value=10), daily_profile={
            0: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 
            6: 4, 7: 4, 
            8: 3, 9: 3, 10: 3, 11: 3,
            12: 5, 13: 5,
            14: 4, 15: 4, 16: 4,
            17: 7, 18: 7, 19: 7, 20: 7,
            21: 5, 22: 5, 23: 5
        })

@pytest.fixture
def mock_electric_vehicle(mocker):
    return mocker.Mock(spec=ElectricVehicle, daily_energy_consumption=mocker.Mock(return_value=12), )

def test_calculate_electricity_cost_without_optional_components(mock_revenue_requirement, mock_tou_rates, mock_load_profile):
    calculator = ElectricityCostCalculator(mock_revenue_requirement, mock_tou_rates, mock_load_profile)
    total_cost = calculator.daily_electricity_cost()
    expected_cost = 0.90
    assert pytest.approx(total_cost) == expected_cost

def test_calculate_electricity_cost_with_ev(mock_revenue_requirement, mock_tou_rates, mock_load_profile, mock_solar_panel, mock_heat_pump, mock_electric_vehicle):
    calculator = ElectricityCostCalculator(mock_revenue_requirement, mock_tou_rates, mock_load_profile, mock_solar_panel, mock_heat_pump, mock_electric_vehicle)
    total_cost = calculator.daily_electricity_cost()
    expected_cost = 17.20
    assert pytest.approx(total_cost) == expected_cost

def test_integration_with_real_components():
    revenue_requirement = RevenueRequirement()
    tou_rates = TimeOfUseRates()
    load_profile = LoadProfile()
    solar_panel = SolarPanel()
    heat_pump = HeatPump()
    electric_vehicle = ElectricVehicle()

    calculator = ElectricityCostCalculator(revenue_requirement, tou_rates, load_profile, solar_panel, heat_pump, electric_vehicle)
    total_cost = calculator.daily_electricity_cost()
    expected_cost = 31.4
    assert pytest.approx(total_cost) == expected_cost
