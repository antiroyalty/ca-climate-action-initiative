import pytest
from calculator.time_of_use_rates import TimeOfUseRates

@pytest.fixture
def tou_rates():
    rates = {
        (0, 6): 0.10,
        (6, 8): 0.15,
        (8, 12): 0.12,
        (12, 14): 0.14,
        (14, 17): 0.13,
        (17, 21): 0.20,
        (21, 24): 0.18,
    }
    return TimeOfUseRates(rates)

def test_get_rate(tou_rates):
    assert tou_rates.get_rate(5) == 0.10
    assert tou_rates.get_rate(7) == 0.15
    assert tou_rates.get_rate(13) == 0.14
    assert tou_rates.get_rate(20) == 0.20
    with pytest.raises(ValueError):  # Adjusted to ValueError for consistency
        tou_rates.get_rate(24)  # Testing for an hour not covered by the rates

def test_average_rate(tou_rates):
    rates = {
        (0, 6): 0.10,
        (6, 8): 0.15,
        (8, 12): 0.12,
        (12, 14): 0.14,
        (14, 17): 0.13,
        (17, 21): 0.20,
        (21, 24): 0.18,
    }
    expected_average = sum(rates.values()) / len(rates)
    assert tou_rates.average_rate() == expected_average, "Failed to calculate correct average rate"

def test_average_rate_with_empty_rates():
    tou_rates_empty = TimeOfUseRates({})
    assert tou_rates_empty.average_rate() == 0, "Failed to handle empty rates correctly"
