/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export type Page = 'home' | 'about' | 'services' | 'projects' | 'blog' | 'contact' | 'portal';

export interface Project {
  id: string;
  titleEN: string;
  titleAR: string;
  category: 'aluminium' | 'glass' | 'iron' | 'all';
  categoryEN: string;
  categoryAR: string;
  locationEN: string;
  locationAR: string;
  year: string;
  sectorEN?: string;
  sectorAR?: string;
  complexityEN?: string;
  complexityAR?: string;
  scaleEN?: string;
  scaleAR?: string;
  materialEN?: string;
  materialAR?: string;
  statusEN?: string;
  statusAR?: string;
  focusEN?: string;
  focusAR?: string;
  unitsEN?: string;
  unitsAR?: string;
  descriptionEN: string;
  descriptionAR: string;
  image: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  titleEN: string;
  titleAR: string;
  excerptEN: string;
  excerptAR: string;
  contentEN: string;
  contentAR: string;
  categoryEN: string;
  categoryAR: string;
  date: string;
  readTimeEN: string;
  readTimeAR: string;
  image: string;
  badgeEN?: string;
  badgeAR?: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  scope: string;
  blueprintsName?: string;
  blueprintsSize?: string;
  date: string;
  status: 'Received' | 'In Review' | 'Technical Review' | 'Proposal Issued';
}
