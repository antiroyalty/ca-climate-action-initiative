import pytest
from calculator.heat_pump import HeatPump, COP, INSULATION_FACTOR, HEAT_PUMP_PROFILE
from calculator.time_of_use_rates import TimeOfUseRates
from calculator.hour import Hour

@pytest.fixture
def sample_heat_pump():
    return HeatPump()

@pytest.fixture
def mock_time_of_use_rates(mocker):
    mock = mocker.Mock(spec=TimeOfUseRates)
    mock.rates = {
        (0, 6): 0.10, 
        (6, 18): 0.20, 
        (18, 24): 0.15
    }
    mock.get_rate = mocker.Mock(side_effect=lambda hour: 0.20 if 6 <= hour < 18 else (0.10 if hour < 6 else 0.15))
    return mock

def test_efficiency_adjustment(sample_heat_pump):
    expected_efficiency_adjustment = COP * INSULATION_FACTOR 
    assert sample_heat_pump.efficiency_adjustment() == expected_efficiency_adjustment, "Efficiency adjustment calculation is incorrect"

def test_daily_consumption(sample_heat_pump):
    total_consumption = sum(HEAT_PUMP_PROFILE.values())
    adjusted_consumption = total_consumption / sample_heat_pump.efficiency_adjustment()
    assert sample_heat_pump.daily_consumption() == adjusted_consumption

def test_calculate_cost(sample_heat_pump, mock_time_of_use_rates):
    cost = sample_heat_pump.calculate_cost(mock_time_of_use_rates)
    expected_cost = {}
    for hour, consumption in HEAT_PUMP_PROFILE.items():
        rate = mock_time_of_use_rates.get_rate(hour)
        expected_cost[hour] = consumption * rate
    
    assert cost == expected_cost, "Cost calculation is incorrect"

def test_calculate_load(sample_heat_pump):
    load = sample_heat_pump.calculate_load()
    expected_load = {hour: consumption / sample_heat_pump.efficiency_adjustment() for hour, consumption in HEAT_PUMP_PROFILE.items()}
    
    assert load == expected_load, "Load calculation is incorrect"
