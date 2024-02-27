# Intro
The Electricity Cost Calculator is a comprehensive tool designed to estimate the cost of electricity consumption for residential or commercial properties. It takes into account various factors such as utility costs, infrastructure costs, time-of-use rates, solar panel generation, and the efficiency of heating systems like heat pumps.

# Project Setup

### Prerequisites

- Python 3.8 or newer
- pip (Python package installer)

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone git@github.com:antiroyalty/ca-climate-action-initiative.git
    ```

2. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Run the electricity calculation**:\
    ```python
    python3 calculations/electricity_cost_calculator.py
    ```


### Running Tests
To run the tests with `pytest`, use the following command:

```bash
pytest
```

# Documentation
### File Structure Overview
```bash
project-name/
│
├── calculator/                  # Main package directory
│   ├── __init__.py              # Initializes the Python package
│   ├── electricity_cost_calculator.py  # Core calculator functionality
│   ├── utility_costs.py         # Utility cost calculations
│   ├── infrastructure_costs.py  # Infrastructure cost calculations
│   ├── time_of_use_rates.py     # Time-of-use rates management
│   ├── load_profile.py          # User's electricity load profile
│   ├── solar_panel.py           # Solar panel output calculations
│   └── heat_pump.py             # Heat pump energy consumption
│
├── tests/                       # Directory for test files
│   ├── __init__.py
│   ├── test_electricity_cost_calculator.py  # Tests for the calculator functionality
│   └── ...                      # Other test files
│
├── requirements.txt             # Project dependencies
└── README.md                    # Project overview and setup instructions
```

### Class Descriptions
**ElectricityCostCalculator:** Central class for calculating the overall electricity cost based on various inputs like utility costs, infrastructure costs, time-of-use rates, load profile, and contributions from solar panels and heat pumps.

**UtilityCosts:** Represents utility-related costs, such as annual revenue requirements.

**InfrastructureCosts:** Handles calculations related to infrastructure investment and its return, considering the capital and return rate.

**TimeOfUseRates:** Manages time-of-use electricity rates, allowing for different rates at different times of the day.

**LoadProfile:** Represents the user's electricity consumption profile, detailing usage over different hours of the day.

**SolarPanel:** Calculates the energy output of solar panels based on capacity and efficiency.

**HeatPump:** Calculates the energy consumption of heat pumps, considering factors like the coefficient of performance (COP) and insulation.