---
title: Maneuver
version: 1.4.6
category: ["GLOSSARY"]
desc: A maneuver is a type of move that a ship can execute.
---

A maneuver is a type of [move](/rules/Move) that a ship can execute. Each maneuver has three components: [speed](/rules/Speed) (a number 0-5), [difficulty](/rules/Difficulty) (red, white, or blue), and [bearing](/rules/Bearing) (an arrow or other symbol). Each bearing is further defined with a direction. A ship can execUte a maneuver by resolving the following steps in order:

1. **Maneuver Ship:** During this step, the ship moves using the matching template. 1. Take the template that matches the maneuver from the [supply](/rules/Supply). 1. Set the template between the ship's front guides (so that it is flush against the base). 1. Pick up and place the ship at the opposite end of the template and slide the rear guides of the ship into the template. 1. Return the template to the supply.

2. **Check Difficulty:** During this step, if the maneuver is red, the ship gains one [stress token](/rules/Stress); if the maneuver is blue, the ship removes one stress token and one [strain token](/rules/Strain) and one [deplete token](/rules/Deplete).

Additionally:

- While executing a maneuver, if a ship would be placed at the end of the template on top of another [object](/rules/Objects), it has [overlapped](/rules/Overlap) that object.
- While executing a maneuver, if only the template was placed on top of another object, the ship has [moved through](/rules/Move) the object.
- While executing a maneuver, the ship is picked up from its starting position and placed in its final position. The full width of the ship's base is ignored except in its starting and final positions.
- If a [stressed](/rules/Stress) ship attempts to execute a maneuver with a red difficulty, the ship performs a white [2 :straight:] maneuver instead.
- A card effect can cause a ship to execute a maneuver that does not appear on its dial.
- Some abilities reference a ship's **Revealed MANEUVER** outside of that ship's activation. A ship's revealed maneuver is the maneuver selected on its dial, which remains faceup next to that ship's ship card until the next Planning Phase.   
  + If a ship's dial is not revealed, or it was not assigned a dial that round, that ship does not have a revealed maneuver.
