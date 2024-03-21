from ..hour import Hour
from .pge import PGE

class TimeOfUseRates:
    def __init__(self):
        # rates should be a dictionary with time ranges as keys and rates as values
        self.rates = PGE.E_TOU_B["summer"]

    def get_rate(self, hour):
        for (start_hour, end_hour), rate in self.rates.items():
            if start_hour <= hour < end_hour:
                return rate
        raise ValueError(f"No rate found for hour {hour}")

    
    def average_rate(self):
        total_rate = sum(self.rates.values())
        num_rates = len(self.rates)
        return total_rate / num_rates if num_rates > 0 else 0
