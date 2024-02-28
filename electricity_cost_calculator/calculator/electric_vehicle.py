class ElectricVehicle:
    def __init__(self, efficiency, daily_miles):
        self.efficiency = efficiency  # kWh per mile
        self.daily_miles = daily_miles  # Daily miles driven

    def daily_energy_consumption(self):
        # The daily energy consumption of EV in kWh.
        return self.efficiency * self.daily_miles