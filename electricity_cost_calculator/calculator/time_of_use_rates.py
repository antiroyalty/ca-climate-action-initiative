from .hour import Hour

# https://www.pge.com/tariffs/en.html?vnt=tariffs
# https://www.pge.com/en/account/rate-plans/find-your-best-rate-plan/time-of-use-rate-plans.html#ResTOUplans-item-b206ca04d2

E_TOU_B = {
    "summer": {
        (0, 16) : 0.48064,
        (16, 21): 0.60370, # peak $ / kWh
        (21, 24): 0.48064 # off-peak
    },
    "winter": {
        (0, 16) : 0.42826,
        (16, 21): 0.46706, # peak $ / kWh
        (21, 24): 0.42826 # off-peak
    }
}

E_TOU_C = {
    "summer": {
        (0, 16) : 0.53605,
        (16, 21): 0.61949, # peak $ / kWh
        (21, 24): 0.53605  # off-peak
    },
    "winter":{
        (0, 16) : 0.53605,
        (16, 21): 0.61949, # peak $ / kWh
        (21, 24): 0.53605  # off-peak
    }
}

E_TOU_D = {
    "summer": {
        (0, 17) : 0.45377,
        (17, 20): 0.58873, # peak $ / kWh
        (20, 24): 0.45377   # off-peak
    },
    "winter":{
        (0, 16) : 0.46052,
        (16, 21): 0.49913, # peak $ / kWh
        (21, 24): 0.46052  # off-peak
    }
}

class TimeOfUseRates:
    def __init__(self):
        # rates should be a dictionary with time ranges as keys and rates as values
        self.rates = E_TOU_B["summer"]

    def get_rate(self, hour):
        for (start_hour, end_hour), rate in self.rates.items():
            if start_hour <= hour < end_hour:
                return rate
        raise ValueError(f"No rate found for hour {hour}")

    
    def average_rate(self):
        total_rate = sum(self.rates.values())
        num_rates = len(self.rates)
        return total_rate / num_rates if num_rates > 0 else 0
