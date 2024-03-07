COP = 3
INSULATION_FACTOR = 1.2
HEATING_NEED = 10

class HeatPump:
    def __init__(self):
        self.cop = COP
        self.insulation_factor = INSULATION_FACTOR
        self.heating_need = HEATING_NEED

    def efficiency_adjustment(self):
        return self.cop * self.insulation_factor

    def energy_consumption(self):
        return self.heating_need / self.efficiency_adjustment()