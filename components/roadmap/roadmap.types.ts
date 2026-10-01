export type RoadmapResourceProps = {
  title: string;
  type: string;
  url: string;
  description: string;
};

export type RoadmapTopicProps = {
  name: string;
  resources: RoadmapResourceProps[];
};

export type RoadmapTechnologyProps = {
  technology: string;
  keyTopics: string;
  icon: string;
  estimatedWeeks: number;
  topics: RoadmapTopicProps[];
};

export type RoadmapProps = {
  roadmap: RoadmapTechnologyProps[];
};
