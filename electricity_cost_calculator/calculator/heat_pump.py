class HeatPump:
    def __init__(self, cop, insulation_factor, heating_need):
        self.cop = cop
        self.insulation_factor = insulation_factor
        self.heating_need = heating_need

    def efficiency_adjustment(self):
        return self.cop * self.insulation_factor

    def energy_consumption(self):
        return self.heating_need / self.efficiency_adjustment()