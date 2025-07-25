---
title: Attack
version: 1.4.6
category: ["GLOSSARY"]
tags: ["DEFEND"]
desc: Ships can perform attacks which thematically represents the ship firing its blaster cannons, ordnance, or other weapons.
---

Ships can perform attacks which thematically represents the ship firing its blaster cannons, ordnance, or other weapons.

If a ship performs an attack, it becomes the attacker then follows these steps:

1.  **Declare Target:** During this step, the attacking player identifies and
    1.  **Measure Range:** The attacking player measures [range](/rules/Range) from the attacker to any number of enemy ships and determines which enemy ships are in which of its [arcs](/rules/Arc) 
    1.  **Choose Weapon:** The attacking player chooses one of the attacker's [primary](/rules/Primary_Weapon) or [special](/rules/Special_Weapon) weapons.
    1.  **Declare Defender:** The attacking player chooses an enemy ship to be the defender. The defender must meet the requirements defined by the weapon. 
    1.  **Pay Costs:** The attacker must pay any costs for performing the attack.
    - During the Declare Target step, the [attack arc](/rules/Attack_Arc) is the arc that corresponds to the chosen weapon. The [attack range](/rules/Attack_Range) is determined by measuring range from the closest point of the attacker to the closest point of the defender that is **in** the attack arc 
    - A primary weapon requires the attack range to be range 0-3. A primary weapon has no cost by default.
    - Special weapons have different requirements specified by the source of the attack. 
    - If there is no valid target for the chosen weapon, or if the attacker cannot pay the costs required for the attack, the attacking player either chooses a different weapon or chooses not to attack.

1.  **Attack Dice:** During this step, the attacking player rolls attack dice and the players can modify the dice.
    1. **Roll Attack Dice:** The attacking player determines the number of attack dice to roll. Starting with the attack value, modifiers that increase or decrease the number of attack dice (such as range bonus and other effects) are applied. Next, if any minimum or maximum number of dice has been set, that limit is applied. There is always a minimum of 0 and a maximum of 6. Then they roll that many dice.
    * While performing a primary attack at attack range 0, attack dice cannot be added.
        1. **Modify Attack Dice:** The players resolve abilities that modify the attack dice. The defending player resolves their abilities first, then the attacking player resolves their abilities.
    * While performing a primary attack at attack range 0,the attacker's dice cannot be modified, except by the defender.
    * The most common ways the attacker modifies attack dice are by spending a [focus](/rules/Focus) [token](/rules/Token) or spending a [lock](/rules/Lock) it has on the defender.
    * Each defense die cannot be rerolled more than once during an attack.

1.  **Defense Dice:** During this step, the defending player rolls a number of defense dice equal to the ship's [agility](/rules/Agility) value and the players can modify the dice.
    1. **Roll Defense Dice:** The defending player determines a number of defense dice to roll. Starting with the defender's agility value, modifiers that increase or decrease the number of defense dice (such as range bonus, whether the attack is being obstructed by an obstacle, and other effects) are applied. Next, if any minimum or maximum number of dice has been set, that limit is applied. There is always a minimum of 0 and a maximum of 6. Then they roll that many dice.
    1. **Modify Defense Dice:** The players resolve abilities that modify the defense dice. The attacking player resolves their abilities first, then the defending player resolves their abilities.
    * While defending at range 0, enemy ships cannot reduce the number of defense dice you roll, cancel your results, or modify your results.
    * The most common ways the defender modifies defense dice are by spending a focus or [evade](/rules/Evade) token.
    * Each defense die cannot be rerolled more than once during an attack.

1.  **Neutralize Results:** During this step, pairs of attack and defense dice neutralize each other. Dice are **NEUTRALIZED** in the following order:

    1. Pairs of :evade: and :hit: results are canceled.
    1. Pairs of :evade: and :critical-hit: results are canceled.
     
    The attack [hits](/rules/Hit) if at least one :hit: or :critical-hit: result remains uncanceled; otherwise, the attack [misses](/rules/Miss).

1.  **Deal Damage:** If the attack hits, the [defender suffers](/rules/Defender) damage for each uncanceled :hit: and :critical-hit: result in the following order:

    1. The defender suffers 1 :hit: damage for each uncanceled :hit: result. Then cancel all :hit: results.
    1. The defender suffers 1 :critical-hit: damage for each uncanceled :critical-hit: result. Then cancel all :critical-hit: results.
         
1.  **Aftermath:** Abilities that trigger after an attack are resolved in the following order.
    1. Resolve any of the defending player's abilities that trigger after a ship defends or is destroyed, excluding abilities that grant a bonus attack.
    1. Resolve any of the attacking player's abilities that trigger after a ship performs an attack or is destroyed, excluding abilities that grant a bonus attack.
    1. Resolve any of the defending player's abilities that trigger after a ship defends or is destroyed that grant a bonus attack.
    1. Resolve any of the attacking player's abilities that trigger after a ship performs an attack or is destroyed that grant a bonus attack.
        
- Each ship may perform one standard attack when it engages during the Engagement Phase

- If a ship is [destroyed](/rules/Destroyed_Ship) at an initiative step during the [Engagement Phase](/rules/Engagement_Phase), the ship is not removed until all ships of the attacker's [initiative](/rules/Initiative) have engaged.

- During an attack, a ship cannot choose to roll fewer dice than it is supposed to roll.

- If a player would roll more dice than they have available, keep track of the rolled results and reroll the dice necessary to equal the total number of dice the player would have rolled all at once. Note that these dice are not considered rerolled for the purposes of modifying dice.
