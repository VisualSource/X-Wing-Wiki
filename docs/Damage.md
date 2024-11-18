---
title: Damage
version: 1.4.6
category: ["GLOSSARY"]
tags: ["SUFFER DAMAGE", "DEFEND"]
desc: Damage represents the amount of structural damage a ship can take.
---

Damage represents the amount of structural damage a ship can take. Damage is tracked by damage cards. A ship is destroyed when the number of damage cards it has is equal to or greater than its [hull](/rules/Hull) value.

There are two types of damage: :hit: (regular) damage and :critical-hit:> (critical) damage. When a ship suffers damage, that damage is suffered one at a time. For each damage a ship suffers, it loses an :shield: (active shield). If it does not have an :shield: remaining, it is dealt a damage card instead. For :hit: damage, the card is dealt **facedown**; for :critical-hit:> damage, the card is dealt **faceup** and its text is resolved. All :hit: damage is suffered **before** :critical-hit:> damage.

A ship is **DAMAGED** while it has at least one damage card. A ship is
**CRITICALLY DAMAGED** while it has at least one faceup damage card.

- If an effect instructs a player to deal a damage card to a ship, this is different from the ship suffering damage. The card is dealt to the ship
  regardless of whether the ship has any :shield: (active shields).
- When a ship suffers damage or otherwise is dealt damage cards that would cause it to exceed its [hull](/rules/Hull) value, the excess damage cards are still dealt.
