---
title: Overlap
version: 1.4.6
category: ["GLOSSARY"]
tags: ["PARTIALLY EXECUTE", "FULLY EXECUTE"]
desc: While a ship executes a maneuver or otherwise moves, it overlaps an object if the ship's final position would physically be on top of an object.
---

While a ship executes a [maneuver](/rules/Maneuver) or otherwise [moves](/rules/Move), it **OVERlAPS** an object if the ship's final position would physically be on top of an object. A ship **FULLY** executes a maneuver if it does not overlap a ship. If a ship executes a maneuver and overlaps a ship, it must **PARTIALLY** execute that maneuver by performing the following steps:

1. Move the ship backward along the template until it is no longer on top of any other ships. While doing so, adjust the position of the ship so that the hashmarks in the middle of both sets of guides remains centered over the line down the middle of the template.
2. Once the ship is no longer on top of any other ship, place it so that it is touching the last ship it backed over. (This may result in the ship not leaving its initial position.) Then, after the Check Difficulty step, it suffers an effect based on what ship it overlapped that initially forced it to partially execute the maneuver.

- If the overlapped ship was a friendly or allied ship, roll an attack die. On a :hit: or :critical-hit: result, the ship suffers one :hit: damage. Then the ship skips its Perform Action step.

- If the overlapped ship was an enemy ship, if it is not stressed, it may immediately perform a :focus: or :calculate: action from its action bar, treating the action as red. Then the ship skips its Perform Action step.
  + The ship cannot perform any additional actions during its activation.

- If there was a simultaneous overlap of friendly or allied and enemy ships, resolve the effect for overlapping a friendly or allied ship. Even if a ship partially executes a maneuver, it is still treated as having executed a maneuver of the indicated [speed](/rules/Speed), [bearing](/article), and [difficulty](/rules/Difficulty).

Additionally:

- After an object is placed, if it is placed underneath one or more ships, those ships resolve any effects of overlapping the object.