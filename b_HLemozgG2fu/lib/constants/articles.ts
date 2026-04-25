/**
 * 文章数据类型
 */
export type Article = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
  href?: string
}

/**
 * 文章分类常量
 */
export const articleCategories = ["全部", "学术历程", "个人随笔", "独立创作"] as const

/**
 * 文章列表数据
 */
export const articles: Article[] = [
  {
    id: "1",
    title: "美学视角——反面角色的魅力来源",
    excerpt: "从古典美学出发，探究后现代审丑趣味的历史脉络、以及我们到底在其中沉醉于什么？",
    category: "学术历程",
    date: "2023",
    readTime: "30 min",
    featured: true,
  },
  {
    id: "2",
    title: "从身边遇见自己-读《看见》",
    excerpt: "作者或许有争议，但被创作的内容应当是独立的个体，理性与感性交融的纪实书籍。",
    category: "个人随笔",
    date: "2021.04.22",
    readTime: "20 min",
    href: "https://zhuanlan.zhihu.com/p/94637688",
  },
  {
    id: "4",
    title: "我敞开自己，终于融进你的胸怀",
    excerpt: "《忠犬八公》观后感",
    category: "个人随笔",
    date: "2022.09.15",
    readTime: "6 min",
    href: "/melt_into_your_heart.pdf",
  },
  {
    id: "6",
    title: "边城读后感",
    excerpt: "战火时代的安宁创作",
    category: "个人随笔",
    date: "2022.03.05",
    readTime: "10 min",
    href: "/Border_City.pdf",
  },
  {
    id: "7",
    title: "Eva",
    excerpt: "高中自习课手搓，宏大幻想与菜鸡文笔的碰撞。",
    category: "独立创作",
    date: "2023.01.13",
    readTime: "5 min",
    href: "/Eve.pdf",
  },
  {
    id: "9",
    title: "名著人物穿越-拉斯蒂涅和于连到了秦末",
    excerpt: "幻视胡歌《神话》",
    category: "独立创作",
    date: "2017.05.09",
    readTime: "12 min",
    href: "/chuhan.pdf",
  },
  {
    id: "10",
    title: "浅论韩信的悲剧",
    excerpt: "《史记·淮阴侯列传》读后感",
    category: "学术历程",
    date: "2020.11.26",
    readTime: "11 min",
    href: "/hanxin.pdf",
  },
  {
    id: "12",
    title: "莎士比亚对曹禺戏剧的影响",
    excerpt: "现当代文学课堂分享",
    category: "学术历程",
    date: "2024.03.28",
    readTime: "15 min",
    href: "/shashibiya.pdf",
  },
  {
    id: "13",
    title: "假如刘备是市长，关公像结局会如何",
    excerpt: "全球最大关公像与导致地质塌陷的违章建筑，地市短期政绩与长期民生的抉择。",
    category: "独立创作",
    date: "2019.12.02",
    readTime: "12 min",
    href: "/Advice in a dream.pdf",
  },
  {
    id: "14",
    title: "回记忆深处，邂逅银河～",
    excerpt: "回忆深处的银河，与星河邂逅的美好时光。",
    category: "个人随笔",
    date: "2020.03.10",
    readTime: "8 min",
    href: "https://mp.weixin.qq.com/s/nELbnoqV-nnQt9YF77eX0w",
  },
  {
    id: "15",
    title: "人面去，桃花依旧",
    excerpt: "春日乡野的爱情故事，人面桃花相映红的诗意与哀愁。",
    category: "个人随笔",
    date: "2020.03.10",
    readTime: "10 min",
    href: "https://mp.weixin.qq.com/s/orZh2HV4x7iGEVYtEz6gMg",
  },
  {
    id: "16",
    title: "一个关于诗词的爱情小故事~",
    excerpt: "陆游与唐婉的钗头凤故事，赵士程的深情守护。",
    category: "个人随笔",
    date: "2020.03.10",
    readTime: "12 min",
    href: "https://mp.weixin.qq.com/s/IDB4XlWVs-pjgaq3T28G4A",
  },
]