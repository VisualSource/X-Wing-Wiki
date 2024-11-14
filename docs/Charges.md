---
title: Charges
version: 1.4.4
icons: ["charge", "force", "shield", "energy"]
links: [
        {
					title: "Charge Types",
					id: "charge-types",
				},
				{
					title: "Recurring Charges",
					id: "recurring-chargesc",
				},
				{
					title: "Negative Recurring Charges",
					id: "negative-recurring-charges",
				},
				{
					title: "Standard Charge",
					id: "standard-charge",
					icons: ["charge"]
				},
				{
					title: "Force Charge",
					id: "force-charge",
					icons: ["forcecharge"]
				},
				{
					title: "Shield",
					id: "shield",
					icons: ["shield"]
				},
				{
					title: "Energy",
					id: "energy",
					icons: ["energy"]
				},
]
---

**CHARGES** are two-side punchboard components that track certain limited
resources. Some ship and upgrade cards have charges to denote their use.
All charges obey the following rules:

- When an effect instructs a ship to **RECOVER** a charge, an inactive charge on that ship (ship or upgrade card) is flipped to its active side. A card cannot recover a charge if all of its charges are on their active side.
- When an effect instructs a ship to **LOSE** a charge, a charge assigned to the relevant card is flipped to the inactive side.
- When a ship **SPENDS** a charge, that charge is lost. A ship cannot spend a charge for an effect if all of its charges that are available for that effect are already inactive.
- Each card with a **CHARGE LIMIT** (the number) starts the game with a number
  of charges equal to the charge limit. Each charge starts on its active side.
- Charges associated with charge limits that have the recurring charge symbol are called **RECURRING CHARGES**. Alternatively, charges associated with charge limits that do not have the recurring charge symbol are called **NON-RECURRING CHARGES**. Charges that are instead lost over time are called **NEGATIVE RECURRING CHARGES**.

### CHARGE TYPES

There are four types of charges:

- **STANDARD CHARGES** (:charge:), which represent limited resources like munitions and a pilot's stamina. These have a golden number.
- **FORCE CHARGES** (:force:), which represent the ebbing and flowing power of the Force: These have a purple number.
- **SHIELDS** (:shield:), which represent a ship's defensive shielding. These have a blue number.
- **ENERGY** (:energy:), which represents a huge ship's draw of power from its engines (see [Appendix: Huge Ships](/rules/Huge_Ships)). These have a magenta number.

### Recurring Charges

> Recurring Charge Symbol

![Recurring Charge Symbol](Recurring_Chage_Symbol.webp)

Some charge limits, shield capacities, and all Force capacities have a **RECURRING CHARGE SYMBOL**. During the [End Phase](/rules/End_Phase), each card with a recurring charge symbol recovers one charge per recurring charge symbol.

### Negative Recurring Charges

![Negative Recurring Charge Symbol](Neg_R_Charge_Symbol.webp)
> Negative Recurring Charge Symbol

Some charge limits have a **NEGATIVE RECURRING CHARGE SYMBOL**. During the End Phase, each card with a negative recurring charge symbol loses one charge per negative recurring charge symbol.

### Standard Charge (:charge:)

Standard charges (:charge:) can represent anything from limited munitions to exhaustible abilities that can only be performed infrequently.

- **SHIP CHARGES** are charges on ship cards and **UPGRADE CHARGES** are charges on upgrade cards.
- If an upgrade card has a charge limit, the :charge: are placed above that upgrade card (not the ship card it is attached to). 
  + If an upgrade card instructs the ship to spend :charge:, those :charge: are spent from that upgrade card.

### Force Charge (:force:)

Force charges (:force:) represent how some pilots or crew members can exert their influence over the Force.

While it performs an attack, a ship can spend any number of :force: during the Attack Dice step to change that number of its :focus: results to :hit: results. While it defends, a ship can spend any number of :force: during the Defense Dice step to change that number of its :focus: results to :evade: results.

- If an upgrade card has a Force capacity, this increases the Force capacity of the ship. The :force: are placed above the ship card it is attached to (not the upgrade card). 
+ A ship card that does not have a Force capacity on its ship card has a Force capacity of “0,” but that capacity can be increased by upgrade cards that have a Force capacity. 
+ If a ship has multiple sources of recurring :force:, the recurring charge symbols do not stack. During the End Phase, each ship with a Force capacity recovers a number of :force: equal the highest number of recurring :force: symbols among the cards that grant it a Force capacity. For example, if a ship with a Force capacity of "0" has two :crew: cards that each grant it a Force capacity of "+1" and have one recurring :force: symbol each, that ship has a Force capacity of "2," but recovers only one :force: during the End Phase. 
+ If an upgrade card instructs the ship to spend :force:, those :force: are spent from the ship card.

### Shield (:shield:)

Shields (:shield:) represent defensive energy barriers. A ship is shielded while it has at least one active shield. While a ship defends, shields provide it protection against damage. See [Damage](/rules/Damage). Additionally:

- If an upgrade card has a shield capacity, this increases the shield capacity
  of the ship. The :shield: are placed above the ship card it is attached to (not
  the upgrade card).

    + A ship card that does not have a shield capacity on its ship card has a shield capacity of “0,” but that capacity can be increased by upgrade cards that have a shield capacity.
    + During the End Phase, each ship with a shield capacity recovers a number of :shield: equal the number of recurring :shield: symbols on its ship card (only huge ships have recurring :shield: symbols, see [Appendix: Huge Ships](/rules/Huge_Ships)).
    + If an upgrade card instructs the ship to spend :shield:, those :shield: are spent from the ship card.

### Energy (:energy:)

Energy (:energy:) are charges used only by huge ships (see [Appendix: Huge Ships](/rules/Huge_Ships)).
