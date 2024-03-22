import pytest
from calculator.rates.time_of_use_rates import TimeOfUseRates
from calculator.rates.pge import E_TOU_B

@pytest.fixture
def tou_rates():
    return TimeOfUseRates()

def test_get_rate(tou_rates):
    assert tou_rates.get_rate(5) == 0.48064
    with pytest.raises(ValueError):
        tou_rates.get_rate(24)  # Testing for an hour not covered by the rates

def test_average_rate(tou_rates):
    expected_average = sum(E_TOU_B["summer"].values()) / len(E_TOU_B["summer"])
    assert tou_rates.average_rate() == expected_average
