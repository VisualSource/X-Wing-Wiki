---
title: Huge Ships
version: 1.4.6
links: [
  { title: "Attacks", id: "attacks" },
			{ title: "Damage Cards", id: "damage-cards" },
			{ title: "Docking With Huge Ships", id: "docking-with-huge-ships" },
			{ title: "Energy", id: "energy" },
			{ title: "Engagement Value", id: "engagement-value" },
			{ title: "Ion", id: "ion" },
			{ title: "Movement", id: "movement" },
			{ title: "Move And Rotate Effects", id: "move-and-rotate-effects" },
			{ title: "Overlapping Objects", id: "overlapping-objects" },
			{ title: "Obstruction By Huge Ships", id: "obstruction-by-huge-ships" },
			{ title: "Red Maneuvers", id: "red-maneuvers" },
			{ title: "Resource Trackers", id: "resource-trackers" },
			{ title: "Setup", id: "setup" },
			{ title: "Stress", id: "stress" },
			{ title: "Tractor", id: "tractor" },
			{ title: "Turrect Arc Indicators", id: "turrect-arc-indicators" }
]
---

**The rules for Huge Ships have not been updated alongside the core rules. They will be updated in the future**

Huge ships function similarly to standard ships, and obey the rules in the glossary except as noted in this appendix. There are also several example diagrams for huge ship movement and turret arc placement at the end of this section.

## ATTACKS

During the Engagement Phase, each huge ship may perform multiple attacks.

##### **Standard Attack**

During its engagement, a huge ship may perform one standard attack which is either a primary attack or special attack with an “**attack:**” header. This is resolved in the same manner as a standard ship (see [Attack](/rules/Attack)).

##### **Bonus Attacks**

When an attack granted by a special weapon has the “**Bonus Attack:**” header, a huge ship equipped with that upgrade may perform the listed bonus attack while it engages, before or after its standard attack. Additionally:

- A huge ship may perform any number of bonus attacks each round.
- A huge ship can use each “**Bonus Attack:**” header only once per round.
- If an effect grants a huge ship a bonus attack that is a primary attack or a special attack with an “**Attack:**” header, it can perform only one bonus attack using that primary attack or “**Attack:**” header per round.

##### **Firing Arcs**

Huge ships have standard firing arcs as denoted on their ship cards. By default, their primary attacks can be made at range 1-3.

##### **Attack Range 4-5**

Unlike standard ships, huge ships can sometimes perform attacks at range 4-5. Some special weapons and abilities can extend a huge ship's firing arcs to range 4 or 5 while a weapon with that range requirement occupies that arc or that ability is active. If a ship's front arc [:front-arc:] or full front arc [:full-front-arc:] extends to range 4 or 5, its bullseye arc [:bulls-eye-arc:] also extends to range 4 or 5.

##### **Defending at Range 4-5**

While a ship defends, if the attack is range 4-5, and the attack does not have the ordnance icon, the defender rolls two additional defense dice. Reinforce tokens can be used by defenders at attack range 4-5, even if a ship's :full-front-arc: or :full-rear-arc: normally does not extend to range 4-5.

## DAMAGE CARDS

Huge ships use the huge ship damage deck instead of the standard damage deck. Each side should use its own huge ship damage deck. The rules for the huge ship damage deck are described below.

##### **Facedown Damage Cards**

If a huge ship has suffered more than four facedown damage cards, it is suggested that players arrange the ship's damage cards in groups of five. This makes it easier to count and track damage during a game.

###### **Faceup Damage Cards**

Each card in the huge ship damage deck has two effects: a primary effect (on the bottom), which functions like the effect of any other faceup damage card, and a **Percision shot** effect (on the top), which is an additional effect that attackers can apply when firing from certain angles.

![Precision Shot Effect on Huge Ship Damage Card](HUGE_SHIPS_DAMAGE_CARDS.webp)

While a huge ship defends, if it is dealt a faceup damage card, resolve the precision shot effect only if the attacker is in the specified arc of the defending huge ship: side arc, full front arc, full rear arc, or bullseye arc. Note that precision shot effects trigger only if a huge ship is defending.

After resolving the precision shot effect (if applicable), apply the primary effect of the faceup damage card. Slide the card underneath the ship card or its other faceup damage cards such that only the primary effect is visible.

## DOCKING WITH HUGE SHIPS

Some upgrades allow standard ships to dock with huge ships. While a docked ship deploys, it may execute its maneuver from the front or rear guides, or by aligning the center of its maneuver template to the huge ship's center line.

During the System Phase, any number of ships docked to a huge ship may deploy from it. If a ship cannot be placed while being deployed, it is destroyed.

During the System Phase, one or more standard ships may dock with a huge ship carrier at range 0-1.

### Deploying from a Huge Ship

A player can deploy docked ships from the sides of a huge ship in addition to the front and rear guides. Simply align the line that runs down the center of the template with the center line of the huge ship's token, and then execute the maneuver as normal.

![Huge Ship Deploying a Ship](HUGE_SHIPS_DEPLOY_SHIP.webp)

## ENERGY (:energy:)

Energy (:energy:) is a type of charge that follows all the standard rules for charges (see [Charge](/rules/Charges)). Additionally:

- If an upgrade card has an energy capacity, this increases the energy capacity of the ship. The :energy: are placed above the ship card it is attached to (not the upgrade card).
  + During the End Phase, each ship with an energy capacity recovers only a number of :energy: equal to the recurring charge symbols on its ship card, regardless of the number of recurring charge symbols that appear on its upgrade cards.
  + If an upgrade card instructs the ship to spend :energy:, those :energy: are spent from the ship card.

## ENGAGEMENT VALUE

Each huge ship has an **Engagement Value**, a second orange number printed beneath its initiative value. During the Activation Phase, a huge ship activates according to its initiative value, like normal. However, a huge ship engages during the Engagement Phase at the initiative of its engagement value instead.

A huge ship's initiative cannot be altered, and it cannot be caused to engage at an initiative step other than its engagement value.

> Engagement Value
![Engagement Value](HUGE_SHIPS_ENGAGEMENT.webp)

## ION

A huge ship is **IONIZED** while it has six or more ion tokens. Otherwise, an ionized huge ship behaves in the same manner as an ionized standard ship (see [Ion](/rules/Ion)).

## MOVEMENT

Huge ships are limited to straight [:straight:], bank [:bank-left: or :bank-right:], and stop [:stationary:] maneuvers. To execute these maneuvers, huge ships use the huge ship maneuver tool.

##### **Straight [:straight:] Maneuvers**

The straight edge of the huge ship maneuver tool is used for executing straight maneuvers. This edge has six lines that players use to execute straight maneuvers at various speeds.

To execute a straight maneuver, a player follows these steps:

1. **Align Tool:** The player places the straight edge of the maneuver tool against one of the long edges of the huge ship's base. Then the player aligns the speed 0 line of the tool to the huge ship's center line.
2. **Move Ship:** The player moves the huge ship along the tool until the ship's center line is aligned with the speed that corresponds to the maneuver's speed. Then the player returns the tool to the supply and the maneuver is complete.

When executing a straight maneuver, the base of the huge ship might overlap another ship or obstacle (see [Overlapping Objects](#overlapping-objects)).

##### **Bank Maneuvers [:bank-left: and :bank-right:]**

The hook and jagged edge of the maneuver tool are used for executing bank maneuvers. This edge has four lines, which players use to execute bank maneuvers at various speeds. See [Example of a [2 :bank-right:] Maneuver](/rules/Huge_Ships_EX) for a full visual.

To execute a bank [:bank-left: or :bank-right:] maneuver, a player follows these steps:

1. **Position Tool:** The player positions the maneuver tool by sliding the tool's hook underneath the opening of the huge ship's base so it fits into the base's left groove (for a :bank-left:) or right groove (for a :bank-right:). Both the hook and the hook's edge should be flush against the huge ship's base.

2. **Place Huge Ship:** The player places the huge ship so the front right corner of its base (for a :bank-right:) or front left corner of its base (for a :bank-left:) is pressed into the corner of the maneuver tool that corresponds to the speed of the bank maneuver (shown below).

![Final Postion for a right bank](HUGE_SHIP_MANEUVER_1.webp)

> Final position for a [2 :bank-right:] maneuver.

When executing a speed 0 bank, the player aligns the front edge of the ship's base with the speed 0 line on the tool (shown below).

![Final Postion for a 0 maneuver](HUGE_SHIP_MANEUVER_2.webp)
> Final position for a [0 :bank-right:] maneuver.

When executing a bank maneuver, the base of the huge ship might overlap another ship or obstacle (see [Overlapping Objects](#overlapping-objects "external")).

##### **Stationary Maneuver [:stationary:]**

A huge ship executes a stationary maneuver [0 :stationary:] following the stationary maneuver rules for standard ships.

## “MOVE” AND “ROTATE” EFFECTS

If another card's effect instructs a huge ship to move or rotate its base a number of degrees, it does not move or rotate its base. Such effects include:

- Barrel Roll
- Boost
- Cloak/Decloak
- SLAM
- Any effect that calls for a base rotation (e.g. “rotate your base 90 ̊” or “rotate your base 180 ̊”) to occur.

## OVERLAPPING OBJECTS

Huge ships have additional rules for overlapping objects that they use in place
of the rules used by standard ships.

##### **Overlapping Obstacles**

After a huge ship overlaps an obstacle, the obstacle is removed from the play area. Then the huge ship suffers an effect according to the type of obstacle it overlapped, as follows:

- **Asteroid or Debris Field:** The huge ship suffers one :critical-hit: damage and gains one stress token.
- **Gas Cloud:** The huge ship gains one jam token.

Then the huge ship continues to resolve its activation. It does not skip its
Perform Action step

##### **Overlapping Huge Ships**

During the Activation Phase, if a huge ship overlaps another huge ship, it executes a maneuver that is one speed lower than what was revealed on its dial. The huge ship repeats this process until it does not overlap another huge ship (executing a stationary maneuver [:stationary:] if it was executing a speed 0 bank). See [Example of Overlapping a Huge Ship](/rules/Huge_Ships_EX).

Then the ship that executed the maneuver and each huge ship that it overlapped suffers :critical-hit: damage equal to the speed of the maneuver on the overlapping ship's dial.

If a standard ship (a small, medium, or large ship) overlaps a huge ship, it resolves the overlap using the same rules used for overlapping a standard ship.

##### **Overlapping Standard Ships**

After a huge ship overlaps a standard ship, the standard ship suffers :critical-hit: damage equal to the speed of the huge ship's revealed maneuver. Then, the standard ship is picked up and set aside until the huge ship completes its maneuver. See [Example of Overlapping a Standard Ship](/rules/Huge_Ships_EX).

After the huge ship completes its maneuver, each standard ship that was picked up is placed in the huge ship's full rear arc [:full-rear-arc:] at range 0-1. Starting with the first player, players take turns placing any of their standard ships that were picked up. Any standard ship that cannot be placed is destroyed. After
a player places their ship, they must choose an opponent, who may rotate the ship 90° to the left or right using the position marker from the core set.

After all ships are placed, the huge ship rolls one attack die for each small ship it overlapped, two for each medium ship, and three for each large ship; for each :hit: result, the huge ship gains one stress token, and for each :critical-hit: result the huge ship suffers one :critical-hit: damage.

## OBSTRUCTION BY HUGE SHIPS

While a huge ship obstructs an attack, the defender rolls one additional defense die.

## PRECISION SHOT

See [Damage Cards](#damage-cards)

## RED MANEUVERS

While a huge ship executes a red maneuver:

- If it has one or more active energy (:energy:), it loses one :energy: instead of gaining one stress during the Check Difficulty step.
- If it has zero :energy: and is not stressed, it gains one stress token during the Check Difficulty step.
- If it has zero :energy: and is stressed, it executes a white [2 :straight:] maneuver instead of the maneuver on its dial.

## RESOURCE TRACKERS

Huge ships use resource trackers to note their current active energy (:shield:) and
active shields (:energy:). To use a resource tracker:

- When a huge ship loses :energy: or :shield:, reduce the relevant tracker by that amount.
- When a huge ship recovers :energy: or :shield:, increase the relevant tracker by that amount, to a maximum of its energy or shield value, respectively.

> Resource Tracker
![Resource Tracker](resource_tracker.webp)

## SETUP

Players set up a game with huge ships using the same steps used for a standard game of **X-Wing**, with the following additions:

**Gather Forces:** Set each huge ship's resource tracker so its shield and energy values match those shown at the bottom of its ship card. Place any turret arc indicators and their associated markers (see [Turret Arc Indicators](#turret-arc-indicators)).

**Place Forces:** Place huge ships before all other ships. If there are multiple huge ships, they are placed in descending order according to their initiative value.

Like a large ship, a huge ship's base may extend outside of its side's setup area as long as it fills the length of that area. It cannot be placed with any portion of its base outside the play area.

**Prepare Other Components:** Players shuffle the huge ship damage deck and place it facedown outside the play area. If the players have more than one huge ship damage deck, each player uses their own deck. Additionally, players place the huge ship maneuver tool outside the play area.

## STRESS

After a huge ship gains a stress token, it must spend one :energy: to remove a stress token, if able. After a huge ship recovers :energy:, it must spend one :energy: for each stress token it has. Then it removes one stress token for each :energy: it spent this way.

Otherwise, a huge ship interacts with stress tokens in the same manner as a standard ship (see [Stress](/rules/Stress)).

## TRACTOR

A huge ship is **TRACTORED** while it has six or more tractor tokens. After a huge ship becomes tractored, it is not moved as a standard ship would be. Otherwise, a huge ship interacts with tractor tokens in the same manner as a standard ship (see [Tractor](/rules/Tractor)).

## TURRET ARC INDICATORS

A huge ship can have up to two turret arc indicators if it equips two upgrades that grant it a :single-turret-arc: or :double-turret-arc: arc indicator.

![Turret Arc Indicators](Turret_Arc_Indicatiors_HS.webp)

If a huge ship has two upgrades that grant it a turret arc, place one turret arc indicator on one mount and a different colored turret arc indicator on the other mount. Then place the position marker that matches the color and type of indicator on the upgrade card that grants the :single-turret-arc: or :double-turret-arc:. [See Example of Tracking :single-turret-arc: on a Huge Ship](/rules/Huge_Ships_EX).

Each indicator is associated with the upgrade that has the matching position marker. Since the indicators correspond to different weapons, each indicator can be pointed at different arcs or at the same arc. Regardless of whether a turret arc indicator is on the front or rear mount, its firing arcs are always measured from the center of the ship, not from the mount. Additionally, regardless of which mount they are on, both indicators behave similarly and occupy the arc they are pointing toward: :front-arc:, :left-arc:, :right-arc:, or :rear-arc. See Example of a Huge Ship with Multiple :single-turret-arc:.

When a huge ship is instructed to rotate its turret arc indicator—such as via the rotate :rotate-arc: action—it can rotate either or both of its turret arc indicators.