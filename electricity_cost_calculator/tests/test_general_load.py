import pytest
from calculator.general_load import GeneralLoad, HOURLY_USAGE

def test_hourly_usage_initialization():
    load_profile = GeneralLoad()
    assert load_profile.hourly_usage == HOURLY_USAGE, "hourly_usage not initialized correctly"

def test_total_annual_consumption():
    load_profile = GeneralLoad()
    expected_daily_consumption = sum(HOURLY_USAGE.values())
    expected_annual_consumption = expected_daily_consumption * 365
    assert load_profile.total_annual_consumption() == expected_annual_consumption, "Annual consumption calculated incorrectly"
