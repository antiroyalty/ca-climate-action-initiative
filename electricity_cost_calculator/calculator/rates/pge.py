# https://www.pge.com/tariffs/en.html?vnt=tariffs
# https://www.pge.com/en/account/rate-plans/find-your-best-rate-plan/time-of-use-rate-plans.html#ResTOUplans-item-b206ca04d2
# Establish TOU plan for solar customers, and incorporate NEM 3.0

class PGE:
    E_TOU_B = {
        "summer": {
            (0, 16) : 0.48064, # off-peak
            (16, 21): 0.60370, # peak $ / kWh
            (21, 24): 0.48064 # off-peak
        },
        "winter": {
            (0, 16) : 0.42826, # off-peak
            (16, 21): 0.46706, # peak $ / kWh
            (21, 24): 0.42826 # off-peak
        }
    }

    E_TOU_C = {
        "summer": {
            (0, 16) : 0.53605, # off-peak
            (16, 21): 0.61949, # peak $ / kWh
            (21, 24): 0.53605  # off-peak
        },
        "winter":{
            (0, 16) : 0.53605, # off-peak
            (16, 21): 0.61949, # peak $ / kWh
            (21, 24): 0.53605  # off-peak
        }
    }

    E_TOU_D = {
        "summer": {
            (0, 17) : 0.45377, # off-peak
            (17, 20): 0.58873, # peak $ / kWh
            (20, 24): 0.45377   # off-peak
        },
        "winter":{
            (0, 16) : 0.46052, # off-peak
            (16, 21): 0.49913, # peak $ / kWh
            (21, 24): 0.46052  # off-peak
        }
    }

    # https://www.pge.com/tariffs/assets/pdf/tariffbook/ELEC_SCHEDS_EV%20(Sch).pdf
    EV = {
        "summer": {
            (0, 7): 0.36874, # off-peak 11pm - 7am M-F
            (7, 14): 0.48129, # part-peak 7a - 2p M - F
            (14, 21): 0.72540, # peak M-F. different from Sat, Sun, Holidays
            (21, 23): 0.48129, # part-peak 9p - 11p M - F
            (23, 24): 0.36874, # off-peak
        },
        "winter": {
            (0, 7): 0.33906, # off-peak
            (7, 14): 0.41079, # part-peak
            (14, 21): 0.54280, # peak,
            (21, 24): 0.33906, # off-peak
        }
    }
    # https://www.pge.com/tariffs/assets/pdf/tariffbook/ELEC_SCHEDS_EV2%20(Sch).pdf
    EV2 = {
        "summer": {
            (0, 15): 0.34578, # off-peak 11pm - 7am M-F
            (15, 16): 0.54779, # part-peak 7a - 2p M - F
            (16, 21): 0.65828, # peak every day
            (21, 24): 0.54779, # part-peak 9p - 11p M - F
        },
        "winter": {
            (0, 15): 0.34578, # off-peak 0 - 3pm
            (15, 16): 0.51447, # part-peak 3-4pm
            (16, 21): 0.53117, # peak 4-9pm everyday
            (21, 24): 0.51447, # part-peak 9pm - 12a
        }
    }

    # NEM
    # Solar Billing Plan effective Jan 1, 2024
    # https://www.pge.com/tariffs/assets/pdf/tariffbook/ELEC_SCHEDS_NEM.pdf

    # If the eligible customer-generator is a net consumer during any discrete TOU
    # period, the net kWh consumed shall be billed in accordance with that same TOU
    # period in the eligible customer-generator’s OAS.
    # >> For hours where solar < consumption, charge consumption thru TOU plan

    # If the eligible customer-generator is a net generator during any discrete TOU
    # period, the net kWh produced shall be valued at the same price per kWh at the
    # same TOU period in the eligible customer generator’s OAS. For NEM Paired
    # Storage, net generation will be calculated as described in Special Condition 11,
    # Section g. as applicable.
    # >> For hours where solar > consumption, profit from excess is same as cost of consuming thru TOU plan
