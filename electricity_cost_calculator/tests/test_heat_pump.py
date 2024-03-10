import pytest
from calculator.heat_pump import HeatPump, COP, INSULATION_FACTOR, HEAT_PUMP_PROFILE

@pytest.fixture
def sample_heat_pump():
    return HeatPump()

def test_efficiency_adjustment(sample_heat_pump):
    expected_efficiency_adjustment = 3 * 1.2  # COP * Insulation Factor
    assert sample_heat_pump.efficiency_adjustment() == expected_efficiency_adjustment, "Efficiency adjustment calculation is incorrect"

def test_energy_consumption(sample_heat_pump):
    total_consumption = sum(HEAT_PUMP_PROFILE.values())
    adjusted_consumption = total_consumption / sample_heat_pump.efficiency_adjustment()
    assert sample_heat_pump.daily_consumption() == adjusted_consumption
