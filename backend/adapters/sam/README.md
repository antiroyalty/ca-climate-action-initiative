## Research question
What type of household would benefit the most from adopting solar + storage in California?

## Scenario definitions
### Household Types and Energy Use Scenarios

This section describes different household types and their corresponding energy configurations, load profiles, and datasets.

| **Type of Household**                                                  | **Electricity**                                          | **Gas**                                  | **Cris Research**                          | **Load Profile Dataset**              |
|------------------------------------------------------------------------|----------------------------------------------------------|------------------------------------------|--------------------------------------------|---------------------------------------|
| **1. No major electrification upgrades**                               | 1) baseline                                               | Stove, heat, water heat                  | N/A                                        | NREL Upgrade 0                       |
| **2. Adopted a heat pump**                                             | 1) baseline<br>2) heat pump                               | Gas stove, water heat                    | Cris SC1<br>Heat Electrification           | NREL Upgrade 6                       |
| **3. Adopted a heat pump and induction stove**                         | 1) baseline<br>2) induction stove<br>3) heat pump         | Water heat                               | Cris SC2<br>Full Electrification           | NREL Upgrade 9                       |
| **4. Adopted a heat pump used for heating and cooling, and an induction stove** | 1) induction stove<br>2) heat pump<br>3) cooling          | Gas stove + gas heating                  | Cris SC3<br>Full Electrification and Cooling | NREL Upgrade 9 + cooling             |
| **5. No major electrification upgrades, but sell solar + storage back to grid** | 1) baseline<br>2) selling back to grid                    | 1) stove<br>2) heat<br>3) water heat     | N/A                                        | NREL Upgrade 0<br>Different SAM configuration |
| **6. Adopted an EV**                                                   | EV                                                       | Gas Car                                  | N/A                                        | TBD                                  |


## Data sources
NREL data lake: https://data.openei.org/s3_viewer?bucket=oedi-data-lake&prefix=nrel-pds-building-stock%2Fend-use-load-profiles-for-us-building-stock%2F2024%2Fresstock_tmy3_release_2%2Ftimeseries_individual_buildings%2Fby_state%2Fupgrade%3D0%2Fstate%3DCA%2F
Units for NREL EULP outputs are defined here in a section called "data dictionary": https://resstock.nrel.gov/datasets

