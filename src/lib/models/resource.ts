import { ObjectId } from 'mongodb';

export type ResourceCategory = 'Stress & Anxiety' | 'Mindfulness' | 'Self-Care' | 'Personal Stories';

export type Resource = {
  _id?: ObjectId;
  category: ResourceCategory;
  subcategory: string;
  title: string;
  url: string;
  source: string;
};
