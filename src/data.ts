export const overallMetrics = {
  spaceReleased: 15113.36,
  idleActivated: 5000,
  annualSavings: 2001.93,
  rentSavings: 1000,
  hrSavings: 50,
  expectedConstructionSavings: 6648.93,
  expectedAnnualSavings: 4570.4,
  progress: 70
};

export const visionMetrics = {
  targetSpace: 30000,
  targetSavings: 10000,
  smartFacilities: 150,
  coverage: 100
};

export const subDistricts = [
  {
    id: 'huangbei',
    name: '黄贝街道',
    tagline: '政企共享+阵地复合利用标杆',
    space: 700,
    savings: 22.1,
    expectedSavings: 50,
    coreAchievements: [
      { label: '政企共享', value: 3, unit: '处', isBenchmark: true },
      { label: '复合利用', value: 100, unit: '%' },
      { label: '企业沙龙', value: 5, unit: '场' },
      { label: '培训覆盖', value: 500, unit: '人次' }
    ],
    completed: [
      { label: '场地整合', value: 3, unit: '处' },
      { label: '空间腾挪', value: 1, unit: '处' }
    ],
    ongoing: [
      { label: '节省租金', value: 102.7, unit: '万' },
      { label: '分馆筹备', value: 1, unit: '处' }
    ],
    planned: [
      { label: '新增活动', value: 10, unit: '场' }
    ],
    facilities: [
      { id: 'hb1', name: '退役军人服务站', cx: 63, cy: 66, status: 'completed' },
      { id: 'hb2', name: '悠·图书馆黄贝岭分馆', cx: 67, cy: 69, status: 'ongoing' },
      { id: 'hb3', name: '政企共享场地', cx: 66, cy: 71, status: 'planned' }
    ]
  },
  {
    id: 'nanhu',
    name: '南湖街道',
    tagline: '全龄友好融合+户外空间拓展标杆',
    space: 2266.25,
    savings: 224.44,
    expectedSavings: 350,
    coreAchievements: [
      { label: '全龄友好', value: 100, unit: '%' },
      { label: '户外拓展', value: 2, unit: '处', isBenchmark: true },
      { label: '拓展空间', value: 1, unit: '万㎡' },
      { label: '新增托位', value: 38, unit: '个' }
    ],
    completed: [
      { label: '场地整合', value: 1, unit: '处' },
      { label: '一体化运营', value: 1, unit: '处' },
      { label: '合署办公', value: 1, unit: '处' }
    ],
    ongoing: [
      { label: '中心融合', value: 6, unit: '个' },
      { label: '新增空间', value: 3100, unit: '㎡' }
    ],
    planned: [
      { label: '空间腾挪', value: 149.7, unit: '㎡' }
    ],
    facilities: [
      { id: 'nh1', name: '综合文体中心', cx: 38, cy: 82, status: 'completed' },
      { id: 'nh2', name: '阳光城长者服务站', cx: 42, cy: 78, status: 'ongoing' },
      { id: 'nh3', name: '星光老年之家', cx: 41, cy: 83, status: 'planned' }
    ]
  },
  {
    id: 'guiyuan',
    name: '桂园街道',
    tagline: '旗舰型综合体+创业服务标杆',
    space: 1711,
    savings: 141.66,
    expectedSavings: 1216,
    coreAchievements: [
      { label: '旗舰综合体', value: 1, unit: '处', isBenchmark: true },
      { label: '创业服务', value: 500, unit: '人次' },
      { label: '招商企业', value: 2, unit: '家' },
      { label: '集约提升', value: 40, unit: '%' }
    ],
    completed: [
      { label: '空间摸排', value: 1, unit: '次' },
      { label: '招商企业', value: 2, unit: '家' }
    ],
    ongoing: [
      { label: '综合阵地', value: 4980, unit: '㎡' },
      { label: '节省装修', value: 120, unit: '万' }
    ],
    planned: [
      { label: '新增场所', value: 3, unit: '处' }
    ],
    facilities: [
      { id: 'gy1', name: '恒大天玺创享站', cx: 23, cy: 63, status: 'completed' },
      { id: 'gy2', name: '庆延里综合阵地', cx: 27, cy: 67, status: 'ongoing' },
      { id: 'gy3', name: '社区共享空间', cx: 24, cy: 68, status: 'planned' }
    ]
  },
  {
    id: 'dongmen',
    name: '东门街道',
    tagline: '商圈服务+儿童友好标杆',
    space: 1464.77,
    savings: 215.53,
    expectedSavings: 300,
    coreAchievements: [
      { label: '商圈服务', value: 10, unit: '万+' },
      { label: '儿童友好', value: 1, unit: '处', isBenchmark: true },
      { label: '开设课程', value: 20, unit: '节' },
      { label: '吸纳主体', value: 10, unit: '家' }
    ],
    completed: [
      { label: '物业压减', value: 1, unit: '项' },
      { label: '社会化运营', value: 1, unit: '项' },
      { label: '空间优化', value: 1, unit: '项' }
    ],
    ongoing: [
      { label: '友好中心', value: 1800, unit: '㎡' },
      { label: '便民中心', value: 1, unit: '处' },
      { label: '节省支出', value: 77, unit: '万' }
    ],
    planned: [
      { label: '共享空间', value: 1, unit: '处' },
      { label: '照料中心', value: 1, unit: '处' }
    ],
    facilities: [
      { id: 'dm1', name: '商圈党群中心', cx: 43, cy: 60, status: 'completed' },
      { id: 'dm2', name: '湖贝儿童友好中心', cx: 47, cy: 64, status: 'ongoing' },
      { id: 'dm3', name: '东门大厦共享空间', cx: 46, cy: 59, status: 'planned' }
    ]
  },
  {
    id: 'sungang',
    name: '笋岗街道',
    tagline: '物业运营+文体社会化标杆',
    space: 375,
    savings: 5.85,
    expectedSavings: 80,
    coreAchievements: [
      { label: '社会化运营', value: 4, unit: '处', isBenchmark: true },
      { label: '文体覆盖', value: 100, unit: '%' },
      { label: '功能整合', value: 3, unit: '项' },
      { label: '节省水电', value: 1.2, unit: '万' }
    ],
    completed: [
      { label: '模式转型', value: 4, unit: '处' },
      { label: '功能整合', value: 1, unit: '项' },
      { label: '社会化运营', value: 1, unit: '项' }
    ],
    ongoing: [
      { label: '托育点建设', value: 1, unit: '处' },
      { label: '驿站招商', value: 1, unit: '处' }
    ],
    planned: [
      { label: '利用率提升', value: 30, unit: '%' }
    ],
    facilities: [
      { id: 'sg1', name: '综合文体中心', cx: 33, cy: 43, status: 'completed' },
      { id: 'sg2', name: '普惠性托育点', cx: 37, cy: 47, status: 'ongoing' },
      { id: 'sg3', name: '悠·图书馆', cx: 34, cy: 48, status: 'planned' }
    ]
  },
  {
    id: 'qingshuihe',
    name: '清水河街道',
    tagline: '数字新城+公建民营标杆',
    space: 813.67,
    savings: 96.26,
    expectedSavings: 1142,
    coreAchievements: [
      { label: '数字服务', value: 1, unit: '中心', isBenchmark: true },
      { label: '公建民营', value: 2, unit: '处' },
      { label: '免租期限', value: 8, unit: '年' },
      { label: '社康优化', value: 6, unit: '家' }
    ],
    completed: [
      { label: '枢纽规划', value: 1, unit: '项' },
      { label: '中心迁移', value: 2, unit: '处' },
      { label: '前期筹备', value: 1, unit: '项' }
    ],
    ongoing: [
      { label: '节省建设', value: 1058, unit: '万' },
      { label: '节省运营', value: 1142, unit: '万' }
    ],
    planned: [
      { label: '公配物业', value: 7500, unit: '㎡' }
    ],
    facilities: [
      { id: 'qsh1', name: '数字新城服务中心', cx: 28, cy: 23, status: 'completed' },
      { id: 'qsh2', name: '全龄AI生活家', cx: 32, cy: 27, status: 'ongoing' },
      { id: 'qsh3', name: '公配物业集约中心', cx: 29, cy: 28, status: 'planned' }
    ]
  },
  {
    id: 'cuizhu',
    name: '翠竹街道',
    tagline: '黄金珠宝产业+乐活社区标杆',
    space: 340,
    savings: 15,
    expectedSavings: 737,
    coreAchievements: [
      { label: '产业赋能', value: 100, unit: '家+' },
      { label: '乐活社区', value: 1, unit: '个', isBenchmark: true },
      { label: '免费阵地', value: 5, unit: '个' },
      { label: '节省成本', value: 1959, unit: '万' }
    ],
    completed: [
      { label: '物业退租', value: 2, unit: '处' },
      { label: '空间优化', value: 1, unit: '处' },
      { label: '创收反哺', value: 1.55, unit: '万' }
    ],
    ongoing: [
      { label: '乐活阵地', value: 1010, unit: '㎡' },
      { label: '节省建设', value: 841, unit: '万' },
      { label: '节省运营', value: 988, unit: '万' }
    ],
    planned: [
      { label: 'OPC社区', value: 1, unit: '个' }
    ],
    facilities: [
      { id: 'cz1', name: '水贝党群中心', cx: 53, cy: 46, status: 'completed' },
      { id: 'cz2', name: '木头龙乐活社区', cx: 57, cy: 50, status: 'ongoing' },
      { id: 'cz3', name: '珠宝OPC社区', cx: 56, cy: 45, status: 'planned' }
    ]
  },
  {
    id: 'dongxiao',
    name: '东晓街道',
    tagline: '认知照护+人员集约标杆',
    space: 1196.9,
    savings: 445.78,
    expectedSavings: 500,
    coreAchievements: [
      { label: '认知照护', value: 1, unit: '中心', isBenchmark: true },
      { label: '人员集约', value: 30, unit: '%' },
      { label: '压减人员', value: 13, unit: '人' },
      { label: '服务人次', value: 100, unit: '万+' }
    ],
    completed: [
      { label: '场地整合', value: 1, unit: '处' },
      { label: '阵地共建', value: 3, unit: '处' },
      { label: '开放共享', value: 1, unit: '处' }
    ],
    ongoing: [
      { label: '节省运营', value: 30, unit: '万' },
      { label: '节省租金', value: 50, unit: '万' }
    ],
    planned: [
      { label: '压减人员', value: 8, unit: '人' }
    ],
    facilities: [
      { id: 'dx1', name: '便民服务中心', cx: 48, cy: 28, status: 'completed' },
      { id: 'dx2', name: '认知症照护中心', cx: 52, cy: 32, status: 'ongoing' },
      { id: 'dx3', name: '绿景新党群中心', cx: 51, cy: 27, status: 'planned' }
    ]
  },
  {
    id: 'donghu',
    name: '东湖街道',
    tagline: '文体社会化+一老一小一体化标杆',
    space: 2545,
    savings: 425.66,
    expectedSavings: 600,
    coreAchievements: [
      { label: '一老一小', value: 2, unit: '处', isBenchmark: true },
      { label: '文体社会化', value: 1, unit: '项' },
      { label: '一窗通办', value: 100, unit: '%' },
      { label: '服务满意度', value: 98, unit: '%' }
    ],
    completed: [
      { label: '项目招标', value: 1, unit: '项' },
      { label: '运营移交', value: 1, unit: '项' }
    ],
    ongoing: [
      { label: '节省建设', value: 912, unit: '万' },
      { label: '节省运营', value: 260, unit: '万' }
    ],
    planned: [
      { label: '社会化运营', value: 3, unit: '处' }
    ],
    facilities: [
      { id: 'dh1', name: '东湖文体中心', cx: 73, cy: 33, status: 'completed' },
      { id: 'dh2', name: '金鹏一体化项目', cx: 77, cy: 37, status: 'ongoing' },
      { id: 'dh3', name: '大望梧桐文旅样板', cx: 76, cy: 32, status: 'planned' }
    ]
  },
  {
    id: 'liantang',
    name: '莲塘街道',
    tagline: '物业清租+集约办公标杆',
    space: 3700.77,
    savings: 409.65,
    expectedSavings: 500,
    coreAchievements: [
      { label: '集约办公', value: 1, unit: '批', isBenchmark: true },
      { label: '物业清租', value: 2, unit: '处' },
      { label: '缩减面积', value: 30, unit: '%' },
      { label: '临时节省', value: 6.8, unit: '万' }
    ],
    completed: [
      { label: '部门搬迁', value: 1, unit: '批' },
      { label: '面积压减', value: 1, unit: '处' },
      { label: '场地退租', value: 2, unit: '处' }
    ],
    ongoing: [
      { label: '社会化运营', value: 1, unit: '项' },
      { label: '中心建设', value: 1, unit: '处' }
    ],
    planned: [
      { label: '不再续租率', value: 100, unit: '%' },
      { label: '节省租金', value: 100, unit: '万' }
    ],
    facilities: [
      { id: 'lt1', name: '翠苑家园公配', cx: 83, cy: 58, status: 'completed' },
      { id: 'lt2', name: '景福花园公配', cx: 87, cy: 62, status: 'ongoing' },
      { id: 'lt3', name: '05-20地块公配', cx: 86, cy: 57, status: 'planned' }
    ]
  }
];
