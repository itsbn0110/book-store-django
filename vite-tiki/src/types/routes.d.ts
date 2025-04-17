// ~/types/routes.ts
import { ComponentType } from 'react';
import { ProductResponse } from './types';

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  books?: boolean;
  layout?: ComponentType<any>;
}

// Component props interfaces
export interface WithBooksProps {
  books?: ProductResponse['data'];
}