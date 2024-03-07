EFFICIENCY = 0.3
DAILY_MILES = 40

class ElectricVehicle:
    def __init__(self):
        self.efficiency = EFFICIENCY  # kWh per mile
        self.daily_miles = DAILY_MILES  # Daily miles driven

    def daily_energy_consumption(self):
        # The daily energy consumption of EV in kWh.
        return self.efficiency * self.daily_miles