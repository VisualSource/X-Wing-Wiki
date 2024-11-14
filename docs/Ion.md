---
title: Ion
version: 1.4.6
links: []
---

A ship is **IONIZED** while it has a number of ion tokens relative to its [size](/rules/Size): one or more for a small ship, two or more for a medium ship, and three or more for a large ship. Ion tokens are red [tokens](/rules/Tokens).

> Ion Token
![Ion Token](Ion_Token.webp)

A ship that is ionized cannot acquire or maintain locks. When a ship becomes ionized, it breaks all locks it is maintaining. During the [Activation Phase](/rules/Activation_Phase), an ionized ship activates as follows:

1. The ionized ship reveals its dial as normal.
2. During the Execute Maneuver step, the ionized ship executes an **ION MANEUVER** with the same direction shown on its dial. An ion maneuver  is a blue speed 1 bank or straight [:bank-left:, :straight:, :bank-right:] [maneuver](/rules/Maneuver).

- If an ionized ship's dial shows a stop [:stationary:] maneuver, they perform their ion maneuver as a [1 :straight:] maneuver.
- The [bearing](/rules/Bearing), [difficulty](/rules/Difficulty), and [speed](/rules/Speed) of this maneuver cannot be changed unless an ability explicitly affects the ion maneuver.

3. During the Perform Action step, the ship can perform only the :focus: action.
4. At the end of a ship's activation, if it executed an ion maneuver, it removes all of its ion tokens.

Additionally:

- An ionized ship cannot perform any action except the :focus: action.
- Ships cannot use abilities that trigger from an ionized ship revealing its ddial.
- If a ship that was ionized during the Planning Phase is no longer ionized at the beginning of its activation, it activates as normal.
