class InfrastructureCosts:
    def __init__(self, capital_cost, rate_of_return):
        self.capital_cost = capital_cost
        self.rate_of_return = rate_of_return

    def calculate_return(self):
        return self.capital_cost * self.rate_of_return