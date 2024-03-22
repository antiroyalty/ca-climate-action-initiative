import pytest
from calculator.loads.electric_vehicle import ElectricVehicle
from calculator.rates.time_of_use_rates import TimeOfUseRates

@pytest.fixture
def mock_time_of_use_rates(mocker):
    """Fixture to mock TimeOfUseRates and its get_rate method."""
    mock = mocker.Mock(spec=TimeOfUseRates)
    # Set up mock rates for a simplified 24-hour period
    mock.get_rate = mocker.Mock(side_effect=lambda hour: 0.20 if 22 <= hour < 6 else 0.15)
    return mock

@pytest.fixture
def electric_vehicle():
    """Fixture to create an ElectricVehicle instance with default values."""
    return ElectricVehicle()

def test_daily_energy_consumption(electric_vehicle):
    """Test that daily energy consumption is calculated correctly."""
    # Given a vehicle with efficiency of 0.3 kWh per mile and driving 40 miles daily
    expected_consumption = (0.3 * 40) / 0.9  # Adjusted for 90% charging efficiency
    assert electric_vehicle.daily_energy_consumption() == pytest.approx(expected_consumption)

def test_calculate_cost(electric_vehicle, mock_time_of_use_rates):
    """Test that the cost of charging the vehicle is calculated correctly within the charging window."""
    cost = electric_vehicle.calculate_cost(mock_time_of_use_rates)
    daily_consumption = electric_vehicle.daily_energy_consumption()

    # Since the charging window is from 10 PM (22) to 6 AM (6) with a rate of 0.20
    # and the rest of the hours have a rate of 0.15 (which are not used for charging),
    # we expect the cost to be calculated based on the 0.20 rate.
    expected_cost_per_hour = daily_consumption * electric_vehicle.efficiency * 0.20
    # The test assumes charging occurs at all hours within the window

    # Verify the cost is correctly calculated for each hour in the charging window
    for hour in range(22, 30):  # Adjusted for 24-hour wrap
        adjusted_hour = hour % 24
        if 22 <= adjusted_hour < 6:
            assert cost[adjusted_hour] == pytest.approx(expected_cost_per_hour)
        else:
            assert adjusted_hour not in cost  # Ensure no cost for hours outside the charging window
