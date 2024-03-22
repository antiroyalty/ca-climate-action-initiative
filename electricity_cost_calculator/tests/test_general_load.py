import pytest
from calculator.loads.general_load import GeneralLoad, HOURLY_USAGE
from calculator.rates.time_of_use_rates import TimeOfUseRates

@pytest.fixture
def mock_time_of_use_rates(mocker):
    mock = mocker.Mock(spec=TimeOfUseRates)
    # Setup a simplified rate for testing purposes
    mock.get_rate = mocker.Mock(side_effect=lambda hour: 0.20 if 6 <= hour <= 17 else 0.10)
    return mock

def test_hourly_usage_initialization():
    load_profile = GeneralLoad()
    assert load_profile.hourly_usage == HOURLY_USAGE, "hourly_usage not initialized correctly"

def test_total_annual_consumption():
    load_profile = GeneralLoad()
    expected_daily_consumption = sum(HOURLY_USAGE.values())
    expected_annual_consumption = expected_daily_consumption * 365
    assert load_profile.total_annual_consumption() == expected_annual_consumption, "Annual consumption calculated incorrectly"

def test_calculate_cost(mock_time_of_use_rates):
    load_profile = GeneralLoad()
    cost = load_profile.calculate_cost(mock_time_of_use_rates)
    expected_cost = {}
    for hour, usage in HOURLY_USAGE.items():
        rate = mock_time_of_use_rates.get_rate(hour)
        expected_cost[hour] = usage * rate
    
    assert cost == expected_cost, "Cost calculated incorrectly"
