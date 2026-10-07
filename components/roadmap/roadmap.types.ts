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

export type RoadmapStepProps = {
  title: string;
  icon: string;
  keyTopics: string;
  estimatedTime: number;
  isCompleted: boolean;
  topics: RoadmapTopicProps[];
};

export type RoadmapProps = {
  roadmap: RoadmapStepProps[];
};
