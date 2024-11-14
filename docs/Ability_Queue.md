---
title: Ability Queue
version: 1.4.6
links: []
---

The **ABILITY QUEUE** is used to resolve the timing of multiple [abilities](/rules/Abilities) that trigger during the same timing window. Abilities are resolved from the front of the queue to the back of the queue. These abilities are added to the back of the ability queue using the following rules:

1. If both players have abilities that triggered from the same event, the abilities are added to the ability queue in player order.

1. If a player has multiple abilities that triggered from the same event, that player chooses the order that those abilities are added to the ability queue.

1. If resolving an effect from the ability queue triggers additional effects, they are added to the front of the ability queue using the above rules.

See [Appendix](/rules/Ability_Queue_Examples) for 2 examples of the ability queue.

- If there are game effects that share the same timing window as a player’s ability, the game effect is resolved first.
   * For example, if a ship performs a red barrel roll and the ship has an ability that triggers after it performs a barrel roll, the ship gains a stress token before the other ability is resolved.

- If an ability's requirements are not met, it cannot be added to the ability queue. For example, at the start of the Engagement Phase, if a ship has an ability that requires it to be tractored, but that ship is not tractored, that ability cannot be added to the queue. The ship cannot add the ability to the queue even if another ability also added to the queue at the start of the Engagement Phase would cause that ship to become tractored upon its resolution.

- If a ship would be removed while there are one or more abilities in the queue, do not remove that ship until there are no abilities in the queue.