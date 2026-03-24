const fs = require('fs');

// 1. Update SimulatedMap.tsx projectPositions
let mapContent = fs.readFileSync('src/components/SimulatedMap.tsx', 'utf-8');
const newPositions = `const projectPositions: Record<string, { top: number, left: number }> = {
  'p1': { top: 35, left: 40 },
  'p2': { top: 50, left: 50 },
  'p3': { top: 40, left: 55 },
  'p4': { top: 60, left: 35 },
  'p5': { top: 25, left: 60 },
  'p6': { top: 65, left: 45 },
  'p7': { top: 45, left: 25 },
  'p8': { top: 30, left: 65 },
  'p9': { top: 60, left: 60 },
  'p10': { top: 25, left: 25 }
};`;

mapContent = mapContent.replace(/const projectPositions: Record<string, \{ top: number, left: number \}> = \{[\s\S]*?\};/, newPositions);
fs.writeFileSync('src/components/SimulatedMap.tsx', mapContent);

// 2. Update gisData.ts old_locations
let gisContent = fs.readFileSync('src/gisData.ts', 'utf-8');

const oldLocs = {
  'p1': [ {top: 20, left: 25}, {top: 50, left: 25}, {top: 20, left: 55} ],
  'p2': [ {top: 35, left: 35}, {top: 65, left: 35}, {top: 35, left: 65} ],
  'p3': [ {top: 25, left: 40}, {top: 55, left: 40}, {top: 25, left: 70} ],
  'p4': [ {top: 45, left: 20}, {top: 75, left: 20}, {top: 45, left: 50} ],
  'p5': [ {top: 15, left: 45}, {top: 40, left: 45}, {top: 15, left: 70} ],
  'p6': [ {top: 50, left: 30}, {top: 70, left: 25}, {top: 50, left: 60} ],
  'p7': [ {top: 30, left: 10}, {top: 60, left: 10}, {top: 30, left: 40} ],
  'p8': [ {top: 15, left: 50}, {top: 45, left: 50}, {top: 15, left: 70} ],
  'p9': [ {top: 45, left: 45}, {top: 70, left: 45}, {top: 45, left: 70} ],
  'p10': [ {top: 10, left: 10}, {top: 40, left: 10}, {top: 10, left: 40} ]
};

for (let i = 1; i <= 10; i++) {
  const pid = `p${i}`;
  const locs = oldLocs[pid];
  const regex = new RegExp(`(id:\\s*'${pid}',[\\s\\S]*?old_locations:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
  
  gisContent = gisContent.replace(regex, (match, p1, p2, p3) => {
    let items = p2.split('},').map(s => s.trim()).filter(s => s.length > 0);
    if (items.length >= 3) {
      for (let j = 0; j < 3; j++) {
        items[j] = items[j].replace(/top:\s*\d+/, `top: ${locs[j].top}`).replace(/left:\s*\d+/, `left: ${locs[j].left}`);
        if (!items[j].endsWith('}')) items[j] += ' }';
      }
      return p1 + '\n        ' + items.join(',\n        ') + '\n      ' + p3;
    }
    return match; // fallback
  });
}

fs.writeFileSync('src/gisData.ts', gisContent);
console.log('Successfully updated positions');
