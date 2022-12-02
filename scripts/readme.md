# Scripts

### Script `cwebp.js`
Converts all images in `/public/images` into .webp files

### Scripts `parse_ships.js` and `parse_upgrades.js`

Scripts for parsing the ship points and upgrade points pdf files 
at https://www.atomicmassgames.com/xwing-documents

Note: The scripts where made to run on firefox's default pdf viewer, runing it in other browers most likly 
will not work. Also they need to be inserted via the devtools console due to firefox's default pdf viewer not 
allowing extentions to be loaded in that context.


### Script `fetch_loadouts.ts`

Builds files for loadout cards. Uses Deno.