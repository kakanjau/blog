import portal from './portal/ctrl';
import article from './article/ctrl';
import category from './category/ctrl';

export default app => {
  INCLUDE_ALL_MODULES([portal, article, category], app);
}