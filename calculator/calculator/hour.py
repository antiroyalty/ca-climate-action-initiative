from typing import Union, Literal, List, cast, TypeGuard

Hour = Union[Literal[0], Literal[1], Literal[2], Literal[3], Literal[4], Literal[5], Literal[6], Literal[7],
             Literal[8], Literal[9], Literal[10], Literal[11], Literal[12], Literal[13], Literal[14], Literal[15],
             Literal[16], Literal[17], Literal[18], Literal[19], Literal[20], Literal[21], Literal[22], Literal[23]]


def hours() -> List[Hour]:
    return cast(List[Hour], range(24))

# def sendhour(hour : int) -> TypeGuard[Hour]:
#     return 0 <= hour < 24

def to_h(hour : int) -> Hour:
    return cast(Hour, hour)