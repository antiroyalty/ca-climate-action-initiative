# tests/test_electricity_cost_calculator.py
import pytest

from calculator.electricity_cost_calculator import ElectricityCostCalculator
from calculator.utility_costs import UtilityCosts
from calculator.infrastructure_costs import InfrastructureCosts
from calculator.time_of_use_rates import TimeOfUseRates
from calculator.load_profile import LoadProfile
from calculator.solar_panel import SolarPanel
from calculator.heat_pump import HeatPump
from calculator.electric_vehicle import ElectricVehicle

@pytest.fixture
def mock_utility_costs(mocker):
    return mocker.Mock(spec=UtilityCosts, calculate_annual_cost=mocker.Mock(return_value=10000))

@pytest.fixture
def mock_infrastructure_costs(mocker):
    return mocker.Mock(spec=InfrastructureCosts, calculate_return=mocker.Mock(return_value=500))

@pytest.fixture
def mock_tou_rates(mocker):
    mock = mocker.Mock(spec=TimeOfUseRates)
    mock.get_rate = mocker.Mock(side_effect=lambda hour: 0.15 if 0 <= hour < 6 else 0.2)
    mock.average_rate = mocker.Mock(return_value=0.175)
    return mock

@pytest.fixture
def mock_load_profile(mocker):
    return mocker.Mock(spec=LoadProfile, total_annual_consumption=mocker.Mock(return_value=3650), hourly_usage={0: 2, 1: 2, 2: 2})

@pytest.fixture
def mock_solar_panel(mocker):
    return mocker.Mock(spec=SolarPanel, daily_generation=mocker.Mock(return_value=5))

@pytest.fixture
def mock_heat_pump(mocker):
    return mocker.Mock(spec=HeatPump, energy_consumption=mocker.Mock(return_value=10))

@pytest.fixture
def mock_electric_vehicle(mocker):
    return mocker.Mock(spec=ElectricVehicle, daily_energy_consumption=mocker.Mock(return_value=12))

def test_calculate_electricity_cost_without_optional_components(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile):
    calculator = ElectricityCostCalculator(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile, num_residents=100)
    total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.calculate_electricity_cost()
    # Expected outcomes based on mocked values; adjust according to your calculation logic

def test_calculate_electricity_cost_with_ev(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile, mock_solar_panel, mock_heat_pump, mock_electric_vehicle):
    calculator = ElectricityCostCalculator(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile, 100, mock_solar_panel, mock_heat_pump, mock_electric_vehicle)
    total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.calculate_electricity_cost()
    # Assert expected outcomes

def test_calculate_electricity_cost_zero_residents(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile):
    calculator = ElectricityCostCalculator(mock_utility_costs, mock_infrastructure_costs, mock_tou_rates, mock_load_profile, 0)
    total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.calculate_electricity_cost()
    # Validate handling of zero residents

def test_integration_with_real_components():
    # Setup with real instances
    utility_costs = UtilityCosts(10000)
    infrastructure_costs = InfrastructureCosts(5000, 0.05)
    tou_rates = TimeOfUseRates()
    load_profile = LoadProfile()
    solar_panel = SolarPanel()
    heat_pump = HeatPump()
    electric_vehicle = ElectricVehicle()

    calculator = ElectricityCostCalculator(utility_costs, infrastructure_costs, tou_rates, load_profile, 100, solar_panel, heat_pump, electric_vehicle)
    total_cost, per_person_cost, net_consumption, net_consumption_per_person = calculator.calculate_electricity_cost()
