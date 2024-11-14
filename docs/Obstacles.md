---
title: Obstacles
version: 1.4.4
links: [
    { title: "Asteroids", id: "Asteroids" },
	{ title: "Debris Clouds", id: "Debris-Clouds" },
	{ title: "Loose Cargo", id: "Loose-Cargo" },
	{ title: "Cargo Drift", id: "Cargo-Drift" },
	{ title: "Gas Clouds", id: "Gas-Clouds" },
	{ title: "Spare Parts", id: "Spare-Parts" },
	{ title: "Electro-Chaff Cloud", id: "Electro-Chaff-Cloud" },
	{ title: "Range 0", id: "Range-0" },
	{ title: "Additionally", id: "Additionally" }
]
---

Obstacles act as hazards that can disrupt and damage ships. A ship can suffer effects by [moving through](/rules/Move), [overlapping](/rules/Overlap), or while being at [range 0](/rules/Range) of obstacles.

If a ship moves through or overlaps an obstacle, it suffers an effect based on the type of obstacle after resolving its move:

### **Asteroid**

The ship suffers one :hit: damage. Roll one attack die. On a

:hit: or :critical-hit: result, the ship suffers an additional :hit: damage.

> These are three examples of asteroids.
![Asteroids](Asteroids.webp)


#### Cargo drift

Cargo drift is an asteroid.

![Cargo Drift](Cargo_Drift.webp)

### **Blaze**

Roll one attack die. On a :hit: or :critical-hit: result, the ship suffers one

:hit: damage; on a :focus: result, it gains one stress token. Then the ship skips its Perform Action step this round.

### **Debris Cloud**

The ship is assigned one stress token. Roll one attack die. On a :hit: result, the ship suffers one :hit: damage. On a :critical-hit: result, the ship suffers one :critical-hit: damage.

![Debris Clouds](Debris_Clouds.webp)
> These are three examples of debris clouds.

### **Electro-Chaff Cloud**

The ship breaks all its locks and all locks on it and then is assigned one jam token. Roll one attack die. On a :hit: or :critical-hit: result, the ship is assigned one stress token.

During the End Phase, remove each electro-chaff cloud with no fuse markers, then remove one fuse marker from each electro-chaff cloud. An electro-chaff cloud can never have more than one fuse token.

An electro-chaff cloud is a device and an obstacle.

![Electro_Chaff_Cloud](Electro_Chaff_Cloud.webp)

### **Gas Cloud**

The ship breaks all its locks and all locks on it and then is assigned one strain token. Roll one attack die. On a :hit: result, the ship is assigned one ion token. On a :critical-hit: result, the ship is assigned three ion tokens.

Gas clouds are new obstacles, and players may select them instead of asteroids or debris clouds.

![Gas Clouds](Gas_Clouds.webp)

> These are three examples of gas clouds.

### **Loose Cargo**

The ship is assigned one strain token. Roll one attack die. On a :hit: or :critical-hit: result, the ship is assigned one stress token.

Loose cargo is a [Debris cloud](#debris-cloud) (obstacle).

![Loose Cargo](Loose_Cargo.webp)

### **Spare Parts**

The ship is assigned one strain token. Roll one attack die. On a :hit: or :critical-hit: result, the ship is assigned one stress token.

- If a ship ends a maneuver overlapping an obstacle, it skips its Perform Action step.

Spare Parts is a [Debris cloud](#debris-cloud) (obstacle).

![Spare Parts](Spare_Parts.webp)

## Range 0

While a ship is at range 0 of an obstacle it may suffer different effects.

- **Asteroid:** The ship cannot perform attacks.
- **Debris Cloud:** The ship cannot perform attacks.
- **Electro-Chaff Cloud:** The ship cannot acquire locks and cannot be locked.
- **Gas Cloud:** The ship cannot acquire locks and cannot be locked. The ship cannot perform attacks.

While a ship performs an attack, if the attack is [obstructed](/rules/Obstructed) by an obstacle, the defender rolls one additional defense die.

## Additionally

- Obstacles are placed during the Place Obstacles step of setup.

- Some cards can also place obstacles during the game in the same manner as devices (see [Device](/rules/Device)).
- If an obstacle is placed such that one or more ships overlap it, those ship resolve any effects of overlapping it.
- A ship that is overlapping an obstacle can still perform actions granted from other game effects.
- For the purpose of overlapping obstacles, if a ship partially executes a maneuver, only the portion of the template that is between the starting and final positions of the ship is counted. Ignore the portion of the template that the ship moved backward along to resolve the overlap.
- If a ship moves through or overlaps more than one obstacle, it suffers the effects of each obstacle, starting with the obstacle that was closest to the ship in its starting position and proceeding along the template.
- Before a ship moves, if it is at range 0 of an obstacle, it does not suffer the effects of that obstacle unless it overlaps that obstacle again.
- Before a ship moves, if it is overlapping an obstacle, it does not suffer the effects of moving through that obstacle.
- Huge ships have separate rules related to obstacles (see [Appendix: Huge Ships](/rules/Huge_Ships)).