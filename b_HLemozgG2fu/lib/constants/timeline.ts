/**
 * 时间线里程碑数据
 */
export type Milestone = {
  year: string
  title: string
  org: string
  desc: string
  tags: string[]
  highlights: (string | { main: string; sub: string[] })[]
}

export const milestones: Milestone[] = [
  {
    year: "2026",
    title: "支线探索",
    org: "",
    desc: "",
    tags: ["生活", "学习", "运动"],
    highlights: [
      "小红书宠物用品店铺开设，业绩惨淡……",
      "python基础+vibe coding+video生成实践研习",
      "每天做饭厨艺大涨",
      "弓箭业余2级+羽毛球中羽3级+健身初见成效",
    ],
  },
  {
    year: "2025.9-2026",
    title: "项目运营经理",
    org: "小红书",
    desc: "搭建模型\"点点\"RM数据生产线。",
    tags: ["AI", "项目管理"],
    highlights: [
      "自0-1搭建内部线上数据标注平台，业务线提效32%",
      "业务自chat扩充至image生成、redlink等4条线路",
    ],
  },
  {
    year: "2025.7-8月",
    title: "跨境电商",
    org: "",
    desc: "搭建 Shopify 独立站自动化工作流，落地三十余站点，完成选品、建站、投流、成交激活。",
    tags: ["Shopify", "跨境电商", "自动化"],
    highlights: [
      "落地三十余站点",
      "完成选品、建站、投流、成交激活全流程",
    ],
  },
  {
    year: "2023.9-2025.6",
    title: "AI资源项目经理",
    org: "科大讯飞",
    desc: "从0参与AI资源部在武汉基地搭建，完成LLM在预训练、RM、SFT等方向的团队搭建及数据交付，语音识别、文本生成、智慧法律等agent落地。",
    tags: ["AI", "项目管理", "团队搭建"],
    highlights: [
      "团队体量扩充至100+",
      "交付5+项目线、3+版本迭代",
      "协同搭建中台-区域成本审核及运营体系",
      {
        main: "提案并推动合作落地",
        sub: ["校企：华中科技大学、武汉理工大学等4所", "供应商：谱蓝、传神等5家"]
      },
    ],
  },
  {
    year: "2023-before",
    title: "汉语言文学 学士 <span class=\"text-sm text-muted-foreground\">(辅修日语)</span>",
    org: "长江大学",
    desc: "毕业论文方向：以美学视角探究文艺作品中反面角色的魅力来源。",
    tags: ["文学学位", "日语辅修"],
    highlights: [
      "毕业论文获得优秀",
      "校辩队成员，校辩论赛冠军四辩",
      "协同发起公众号\"与星河邂逅\"",
    ],
  },
]