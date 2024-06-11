OPERATING_COST_GENERATION = 10_000
OPERATING_COST_TRANSMISSION = 10_000
OPERATING_COST_DISTRIBUTION = 10_000

RATE_OF_RETURN = 0.03

CAPITAL_COST_GENERATION = 100_000
CAPITAL_COST_TRANSMISSION = 100_000
CAPITAL_COST_DISTRIBUTION = 100_000

TAXES = 10_000

class RevenueRequirement:
    def __init__(self):
        self.operating_cost_generation = OPERATING_COST_GENERATION
        self.operating_cost_transmission = OPERATING_COST_TRANSMISSION
        self.operating_cost_distribution = OPERATING_COST_DISTRIBUTION
        self.rate_of_return = RATE_OF_RETURN
        self.capital_cost_generation = CAPITAL_COST_GENERATION
        self.capital_cost_transmission = CAPITAL_COST_TRANSMISSION
        self.capital_cost_distribution = CAPITAL_COST_DISTRIBUTION
        self.taxes = TAXES
        
    def capital_costs(self):
        return self.capital_cost_generation + self.capital_cost_transmission + self.capital_cost_distribution

    def operating_costs(self):
        return self.operating_cost_generation + self.operating_cost_transmission + self.operating_cost_distribution

    def calculate_annual_cost(self): # Revenue Requirement
        # RR = OC_G + OC_T + OC_D + r(K_G + K_T + K_D) + Taxes
        return self.operating_costs() + self.rate_of_return * self.capital_costs() + self.taxes
