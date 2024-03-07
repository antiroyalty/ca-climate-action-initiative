TOU_RATES = {
    (0, 6): 0.10, 
    (6, 8): 0.15, 
    (8, 12): 0.12, 
    (12, 14): 0.14,
    (14, 17): 0.13, 
    (17, 21): 0.20, 
    (21, 24): 0.18
} # hours : $

class TimeOfUseRates:
    def __init__(self):
        # rates should be a dictionary with time ranges as keys and rates as values
        self.rates = TOU_RATES

    def get_rate(self, hour):
        # Iterate through the rate periods to find the correct rate for the given hour
        for (start_hour, end_hour), rate in self.rates.items():
            if start_hour <= hour < end_hour:
                return rate
        # If no rate is found for the hour, you might raise an exception or return a default rate
        raise ValueError(f"No rate found for hour {hour}")

    
    def average_rate(self):
        # Calculate the average rate by summing all rates and dividing by the number of rates
        total_rate = sum(self.rates.values())
        num_rates = len(self.rates)
        return total_rate / num_rates if num_rates > 0 else 0
