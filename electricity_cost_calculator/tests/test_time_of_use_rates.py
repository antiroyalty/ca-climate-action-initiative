import pytest
from calculator.time_of_use_rates import TimeOfUseRates, TOU_RATES

@pytest.fixture
def tou_rates():
    return TimeOfUseRates()

def test_get_rate(tou_rates):
    assert tou_rates.get_rate(5) == 0.10
    assert tou_rates.get_rate(7) == 0.15
    assert tou_rates.get_rate(13) == 0.14
    assert tou_rates.get_rate(20) == 0.20
    with pytest.raises(ValueError):  # Adjusted to ValueError for consistency
        tou_rates.get_rate(24)  # Testing for an hour not covered by the rates

def test_average_rate(tou_rates):
    expected_average = sum(TOU_RATES.values()) / len(TOU_RATES)
    assert tou_rates.average_rate() == expected_average
