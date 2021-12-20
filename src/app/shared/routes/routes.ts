import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'widgets',
    loadChildren: () => import('../../components/widgets/widgets.module').then(m => m.WidgetsModule)
  },
  {
    path: 'ui-kits',
    loadChildren: () => import('../../components/ui-kits/ui-kits.module').then(m => m.UiKitsModule)
  },
  {
    path: 'base',
    loadChildren: () => import('../../components/bonus-ui/base/base.module').then(m => m.BaseModule)
  },
  {
    path: 'advance',
    loadChildren: () => import('../../components/bonus-ui/advance/advance.module').then(m => m.AdvanceModule)
  },
  {
    path: 'buttons',
    loadChildren: () => import('../../components/buttons/buttons.module').then(m => m.ButtonsModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('../../components/editors/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('../../components/charts/charts.module').then(m => m.ChartModule),
  },
  {
    path: 'icons',
    loadChildren: () => import('../../components/icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'project',
    loadChildren: () => import('../../components/apps/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'project',
    loadChildren: () => import('../../components/apps/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'form',
    loadChildren: () => import('../../components/forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'table',
    loadChildren: () => import('../../components/table/table.module').then(m => m.TableModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('../../components/cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'search-pages',
    loadChildren: () => import('../../components/others/search-result/search-result.module').then(m => m.SearchResultModule)
  },
  {
    path: 'sample-page',
    loadChildren: () => import('../../components/others/sample/sample.module').then(m => m.SampleModule)
  }
];
