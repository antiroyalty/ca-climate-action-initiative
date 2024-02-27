import pytest
from calculator.heat_pump import HeatPump  # Adjust the import path as needed

@pytest.fixture
def sample_heat_pump():
    # Example HeatPump with arbitrary COP, insulation factor, and heating need
    return HeatPump(cop=3, insulation_factor=1.2, heating_need=10)

def test_efficiency_adjustment(sample_heat_pump):
    expected_efficiency_adjustment = 3 * 1.2  # COP * Insulation Factor
    assert sample_heat_pump.efficiency_adjustment() == expected_efficiency_adjustment, "Efficiency adjustment calculation is incorrect"

def test_energy_consumption(sample_heat_pump):
    # Energy consumption should equal heating need divided by efficiency adjustment
    efficiency_adjustment = sample_heat_pump.cop * sample_heat_pump.insulation_factor
    expected_energy_consumption = 10 / efficiency_adjustment  # Heating Need / Efficiency Adjustment
    assert sample_heat_pump.energy_consumption() == expected_energy_consumption, "Energy consumption calculation is incorrect"

# Additional tests could include edge cases, such as zero or negative values
def test_efficiency_adjustment_with_zero_cop():
    heat_pump = HeatPump(cop=0, insulation_factor=1.2, heating_need=10)
    assert heat_pump.efficiency_adjustment() == 0, "Efficiency adjustment should handle zero COP correctly"

def test_energy_consumption_with_zero_heating_need():
    heat_pump = HeatPump(cop=3, insulation_factor=1.2, heating_need=0)
    # Expecting zero energy consumption when there's no heating need
    assert heat_pump.energy_consumption() == 0, "Energy consumption should be zero when heating need is zero"
