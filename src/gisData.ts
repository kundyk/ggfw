export const gisData = {
  district_overview: {
    total_space_freed_sqm: 125000,
    total_rent_saved_w: 4500,
    total_construction_saved_w: 12000
  },
  gis_projects: [
    {
      id: 'p1',
      project_name: '清水河街道综合服务中心',
      street: '清水河街道',
      status: '建设中',
      coordinates: [114.1123, 22.5678],
      highlight_tags: ['多功能合署', '智慧政务', '空间释放'],
      old_locations: [
        { id: 'p1_old1', top: 20, left: 25, label: '原办公点A (租赁)', rent: '30万/年', area: '400㎡', status: '已终止租赁合同，完成退租', photo: 'https://picsum.photos/seed/oldA/400/300' },
        { id: 'p1_old2', top: 50, left: 25, label: '原办公点B (租赁)', rent: '25万/年', area: '350㎡', status: '已终止租赁合同，完成退租', photo: 'https://picsum.photos/seed/oldB/400/300' },
        { id: 'p1_old3', top: 20, left: 55, label: '原办公点C (自有)', rent: '0万/年 (自有物业)', area: '450㎡', status: '已腾退，移交区国资局盘活', photo: 'https://picsum.photos/seed/oldC/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年 (政府统筹物业)',
        area: '2500㎡',
        status: '多功能合署办公，全面启用',
        photo: 'https://picsum.photos/seed/newP1/400/300'
      },
      transition_progress: {
        current_phase: '空间腾退',
        overall_progress: 65,
        tasks: [
          { status: 'completed', task: '原址清退', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'in_progress', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'pending', task: '系统调试', detail: '智慧政务终端与后台系统联调' }
        ]
      },
      migration_stats: {
        outflow: [
          { label: '原分散办公点', value: 3, unit: '处' },
          { label: '冗余面积', value: 1200, unit: '㎡' }
        ],
        inflow: [
          { label: '新增便民设施', value: 5, unit: '项' },
          { label: '服务窗口', value: 12, unit: '个' }
        ]
      },
      financials: {
        construction_saved: 350,
        operation_saved_yearly: 85
      },
      building_floors: [
        { floor: 1, function: '24小时自助政务区 / 综合服务大厅' },
        { floor: 2, function: '社区党群服务中心 / 图书阅览室' },
        { floor: 3, function: '长者服务中心 / 康复理疗室' }
      ],
      description: '通过整合原有的三个分散办公点，打造集政务服务、党群活动、养老服务于一体的综合性枢纽，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/qsh1/800/400', title: '原貌记录', description: '改造前的老旧办公区域' },
        { year: 2025, url: 'https://picsum.photos/seed/qsh2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/qsh3/800/400', title: '全新启用', description: '现代化综合服务大厅正式对外开放' }
      ]
    },
    {
      id: 'p2',
      project_name: '东晓街道文体活动中心',
      street: '东晓街道',
      status: '已完成',
      coordinates: [114.1256, 22.5789],
      highlight_tags: ['文体融合', '社会化运营', '全龄友好'],
      old_locations: [
        { id: 'p2_old1', top: 35, left: 30, label: '原废弃工业厂房', rent: '0万/年 (闲置)', area: '2500㎡', status: '结构老化，长期空置', photo: 'https://picsum.photos/seed/oldP2/400/300' },
        { id: 'p2_old2', top: 65, left: 30, label: '原临时活动室', rent: '15万/年', area: '600㎡', status: '已腾退', photo: 'https://picsum.photos/seed/oldP2_2/400/300' },
        { id: 'p2_old3', top: 35, left: 55, label: '原老旧球场', rent: '5万/年', area: '800㎡', status: '已拆除整合', photo: 'https://picsum.photos/seed/oldP2_3/400/300' }
      ],
      new_location_detail: {
        rent: '社会化运营 (0财政补贴)',
        area: '3500㎡ (含加建)',
        status: '文体综合体，已向市民开放',
        photo: 'https://picsum.photos/seed/newP2/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场馆建设', detail: '主体结构与内部设施建设完成' },
          { status: 'completed', task: '运营招标', detail: '引入专业第三方运营机构' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [
          { label: '闲置厂房', value: 1, unit: '处' },
          { label: '低效空间', value: 2500, unit: '㎡' }
        ],
        inflow: [
          { label: '标准篮球场', value: 2, unit: '个' },
          { label: '多功能活动室', value: 6, unit: '间' }
        ]
      },
      financials: {
        construction_saved: 520,
        operation_saved_yearly: 120
      },
      building_floors: [
        { floor: 1, function: '室内篮球场 / 羽毛球场 / 乒乓球区' },
        { floor: 2, function: '舞蹈排练室 / 瑜伽室 / 健身房' },
        { floor: 3, function: '四点半课堂 / 青年创客空间' }
      ],
      description: '盘活辖区闲置工业厂房，通过社会化运营模式，打造高标准、全龄段覆盖的社区文体活动综合体，有效弥补了片区文体设施短板。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/dx1/800/400', title: '厂房改造', description: '旧工业厂房内部拆除' },
        { year: 2025, url: 'https://picsum.photos/seed/dx2/800/400', title: '设施完善', description: '运动木地板与灯光系统安装' },
        { year: 2026, url: 'https://picsum.photos/seed/dx3/800/400', title: '活力绽放', description: '居民在崭新的场馆内开展体育活动' }
      ]
    },
    {
      id: 'p3',
      project_name: '黄贝街道政企共享阵地',
      street: '黄贝街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['政企共享', '复合利用'],
      old_locations: [
        { id: 'p3_old1', top: 25, left: 30, label: '原租赁物业', rent: '20万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p3old/400/300' },
        { id: 'p3_old2', top: 55, left: 30, label: '原分散办公点A', rent: '15万/年', area: '500㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p3old2/400/300' },
        { id: 'p3_old3', top: 25, left: 55, label: '原分散办公点B', rent: '10万/年', area: '400㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p3old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p3new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '黄贝街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p3_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p3_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p3_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p4',
      project_name: '南湖街道户外拓展空间',
      street: '南湖街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['全龄友好', '户外拓展'],
      old_locations: [
        { id: 'p4_old1', top: 45, left: 20, label: '原闲置空地', rent: '0万/年', area: '1000㎡', status: '已改造', photo: 'https://picsum.photos/seed/p4old/400/300' },
        { id: 'p4_old2', top: 75, left: 20, label: '原废弃仓库', rent: '0万/年', area: '800㎡', status: '已拆除', photo: 'https://picsum.photos/seed/p4old2/400/300' },
        { id: 'p4_old3', top: 45, left: 50, label: '原老旧公园', rent: '5万/年', area: '1200㎡', status: '已整合', photo: 'https://picsum.photos/seed/p4old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p4new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '南湖街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p4_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p4_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p4_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p5',
      project_name: '桂园街道旗舰综合体',
      street: '桂园街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['旗舰综合体', '创业服务'],
      old_locations: [
        { id: 'p5_old1', top: 15, left: 35, label: '原老旧办公楼', rent: '50万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p5old/400/300' },
        { id: 'p5_old2', top: 40, left: 35, label: '原租赁服务大厅', rent: '30万/年', area: '800㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p5old2/400/300' },
        { id: 'p5_old3', top: 15, left: 55, label: '原分散业务点', rent: '20万/年', area: '600㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p5old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p5new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '桂园街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p5_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p5_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p5_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p6',
      project_name: '东门街道儿童友好中心',
      street: '东门街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['儿童友好', '商圈服务'],
      old_locations: [
        { id: 'p6_old1', top: 50, left: 30, label: '原分散活动室', rent: '10万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p6old/400/300' },
        { id: 'p6_old2', top: 70, left: 25, label: '原老旧阅览室', rent: '5万/年', area: '300㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p6old2/400/300' },
        { id: 'p6_old3', top: 50, left: 60, label: '原社区小广场', rent: '0万/年', area: '500㎡', status: '已整合', photo: 'https://picsum.photos/seed/p6old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p6new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '东门街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p6_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p6_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p6_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p7',
      project_name: '笋岗街道社会化运营中心',
      street: '笋岗街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['社会化运营', '文体覆盖'],
      old_locations: [
        { id: 'p7_old1', top: 30, left: 10, label: '原低效物业', rent: '15万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p7old/400/300' },
        { id: 'p7_old2', top: 60, left: 10, label: '原闲置厂房', rent: '0万/年', area: '1500㎡', status: '已改造', photo: 'https://picsum.photos/seed/p7old2/400/300' },
        { id: 'p7_old3', top: 30, left: 40, label: '原老旧仓库', rent: '5万/年', area: '800㎡', status: '已拆除', photo: 'https://picsum.photos/seed/p7old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p7new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '笋岗街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p7_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p7_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p7_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p8',
      project_name: '翠竹街道乐活社区阵地',
      street: '翠竹街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['乐活社区', '产业赋能'],
      old_locations: [
        { id: 'p8_old1', top: 15, left: 40, label: '原分散服务点', rent: '20万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p8old/400/300' },
        { id: 'p8_old2', top: 45, left: 40, label: '原老旧社区中心', rent: '10万/年', area: '600㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p8old2/400/300' },
        { id: 'p8_old3', top: 15, left: 55, label: '原租赁办公区', rent: '15万/年', area: '800㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p8old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p8new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '翠竹街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p8_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p8_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p8_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p9',
      project_name: '东湖街道一老一小中心',
      street: '东湖街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['一老一小', '文体社会化'],
      old_locations: [
        { id: 'p9_old1', top: 40, left: 35, label: '原老旧设施', rent: '10万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p9old/400/300' },
        { id: 'p9_old2', top: 65, left: 35, label: '原分散养老点', rent: '15万/年', area: '500㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p9old2/400/300' },
        { id: 'p9_old3', top: 40, left: 55, label: '原分散托幼点', rent: '12万/年', area: '400㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p9old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p9new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '东湖街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p9_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p9_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p9_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    },
    {
      id: 'p10',
      project_name: '莲塘街道集约办公枢纽',
      street: '莲塘街道',
      status: '已完成',
      coordinates: [114.1, 22.5],
      highlight_tags: ['集约办公', '物业清租'],
      old_locations: [
        { id: 'p10_old1', top: 15, left: 15, label: '原租赁办公点', rent: '40万/年', area: '1000㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p10old/400/300' },
        { id: 'p10_old2', top: 40, left: 15, label: '原分散业务窗口', rent: '20万/年', area: '600㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p10old2/400/300' },
        { id: 'p10_old3', top: 15, left: 40, label: '原老旧档案室', rent: '10万/年', area: '400㎡', status: '已腾退', photo: 'https://picsum.photos/seed/p10old3/400/300' }
      ],
      new_location_detail: {
        rent: '0万/年',
        area: '2000㎡',
        status: '全面启用',
        photo: 'https://picsum.photos/seed/p10new/400/300'
      },
      transition_progress: {
        current_phase: '正式运营',
        overall_progress: 100,
        tasks: [
          { status: 'completed', task: '场地整合', detail: '完成原办公区域的搬迁与清退工作' },
          { status: 'completed', task: '新址装修', detail: '新综合服务大厅内部装修与设备进场' },
          { status: 'completed', task: '全面开放', detail: '面向辖区居民提供全天候服务' }
        ]
      },
      migration_stats: {
        outflow: [{ label: '原分散点', value: 1, unit: '处' }],
        inflow: [{ label: '新增设施', value: 3, unit: '项' }]
      },
      financials: { construction_saved: 200, operation_saved_yearly: 50 },
      description: '莲塘街道标杆项目，通过整合原有的分散办公点，大幅提升空间利用率与群众办事便利度。',
      achievements: [
        { year: 2024, url: 'https://picsum.photos/seed/p10_1/800/400', title: '原貌记录', description: '改造前的老旧区域' },
        { year: 2025, url: 'https://picsum.photos/seed/p10_2/800/400', title: '施工推进', description: '内部空间打通与结构加固' },
        { year: 2026, url: 'https://picsum.photos/seed/p10_3/800/400', title: '全新启用', description: '现代化大厅正式对外开放' }
      ]
    }
  ]
};
