const fs = require('fs');

let content = fs.readFileSync('src/gisData.ts', 'utf-8');

// We will replace the old_locations array for p2 to p10 with 3 items each.
for (let i = 2; i <= 10; i++) {
  const regex = new RegExp(`(id:\\s*'p${i}',[\\s\\S]*?old_locations:\\s*\\[)([\\s\\S]*?)(\\])`);
  content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + `
        { id: 'p${i}_old1', top: ${15 + i * 2}, left: ${20 + i * 3}, label: '原租赁物业A', rent: '${10 + i}万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p${i}old1/400/300' },
        { id: 'p${i}_old2', top: ${45 + i * 2}, left: ${15 + i * 3}, label: '原老旧设施B', rent: '${5 + i}万/年', area: '800㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p${i}old2/400/300' },
        { id: 'p${i}_old3', top: ${75 + i * 2}, left: ${25 + i * 3}, label: '原分散办公点C', rent: '${15 + i}万/年', area: '1200㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p${i}old3/400/300' }
      ` + p3;
  });
}

fs.writeFileSync('src/gisData.ts', content);
console.log('Done');
