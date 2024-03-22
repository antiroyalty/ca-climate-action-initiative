# Intro
The Electricity Cost Calculator is a tool for estimating the cost of electricity consumption for residential use. It considers utility costs, infrastructure costs, time-of-use rates, solar panel generation, and the efficiency of heating systems like heat pumps.



# Setup

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
    $ python3 -m calculator.electricity_cost_calculator

    --------------- Annual ----------------
    Total Electricity Cost: $16,854.76
    Net Consumption: 37,513.89 kWh
    Cost per Person: $168.55
    Net Consumption per Person: 375.14 kWh
    ```


### Running Tests
To run the tests with `pytest`, use the following command:

```bash
$ pytest tests/.
```

# Documentation
### File Structure Overview
```bash
ccai/
│
├── calculator/                         #  Main package directory
│   ├── electricity_cost_calculator.py  # Core calculator functionality
│   ├── loads                           # Load types defined (Heat Pump, EV, Solar, General Load)
│   ├── rates                           # Time-of-use rates management for each utility (PG&E, SCE, SDGE)
│   ├── hour.py
│   ├── revenue_requirement.py          # User's electricity load profile
│
├── tests/                              # Directory for test files
│
├── requirements.txt                    # Project dependencies
└── README.md                           # Project overview and setup instructions
```

### Class Descriptions
**ElectricityCostCalculator:** Central class for calculating the overall electricity cost based on various inputs like time-of-use rates, general load profile, other major loads like EV and heat pumps, and contributions from residential solar panels.

**TimeOfUseRates:** Manages time-of-use electricity rates, allowing for different rates at different times of the day.

**LoadProfile:** Represents the user's electricity consumption profile, detailing usage over different hours of the day.

**SolarPanel:** Calculates the energy output of solar panels based on capacity and efficiency.

**HeatPump:** Calculates the energy consumption of heat pumps, considering factors like the coefficient of performance (COP) and insulation.

**ElectricVehicle:** Captures energy consumed by an EV based on vehicle miles travelled and efficiency.