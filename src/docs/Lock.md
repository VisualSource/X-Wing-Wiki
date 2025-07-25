---
title: Lock
version: 1.4.6
category: ["GLOSSARY"]
icons: ["lock"]
tags: ["BREAK"]
desc: Ships can lock to use their computer to acquire targeting data on environmental hazards or other ships.
---

Ships can lock to use their computer to acquire targeting data on environmental hazards or other ships. When a ship performs a :lock: action, it acquires a lock. A **LOCKING** ship is a ship that is attempting to acquire a lock by performing the following steps:

1. Measure range from the locking ship to any number of [objects](/rules/Objects).
2. Choose another object at [range](/rules/Range) 0-3.
3. Assign a lock token to it with the number matching the [ID marker](/rules/Id_Marker) of the locking ship.

An object is **LOCKED** while it has at least one lock token assigned to it. Lock tokens are red tokens. While a ship has another ship locked, it follows this rule:

- During the Modify Attack Dice step of a ship's [attack](/rules/Attack), it can spend a lock token that it has on the defender to reroll one or more of its attack dice. Additionally:
- When a ship is instructed to **BREAK** a lock it has, the lock token corresponding to its ID token is removed.
- While acquiring a lock, it [fails](/rules/Fail) only if there is no valid object to choose.
- A ship cannot acquire or have a lock on itself.
- An object can be locked by more than one ship.
- A ship can maintain only one lock. If a locking ship already has a lock, before the chosen object would be assigned a lock token, the ship's former lock token is removed.
- If an ability instructs a ship to acquire a lock, this is different than performing a :lock: action. A ship that acquires a lock without performing the action can still perform the :lock: action this round. 
  + If a ship is instructed to acquire a lock, the object it locks must be at range 0-3 unless otherwise specified.
