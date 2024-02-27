class LoadProfile:
    def __init__(self, hourly_usage):
        self.hourly_usage = hourly_usage

    def total_annual_consumption(self):
        # Sum up all the hourly consumptions and assume it represents a daily pattern repeated over a year
        daily_consumption = sum(self.hourly_usage.values())
        return daily_consumption * 365  # Assuming a non-leap year for simplicity