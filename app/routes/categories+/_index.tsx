import type {MetaFunction} from '@remix-run/node';
import {redirect} from '@remix-run/react';
import {useTranslation} from 'react-i18next';

import {Stack, useMediaQuery, useTheme} from '@mui/material';

import {useQueryCategoriesList} from '~/services/categories';

import {SkeletonOnLoading} from '~/global/components/skeleton-on-loading';
import {AppButton} from '~/global/components/app-button';

import {CategoriesTable} from './components/table/table';
import {CategoriesCardView} from './components/card/category-card-view';

//
//

export const handle = {i18n: ['common', 'categories']};
export const meta: MetaFunction = () => [{title: 'Remix App - Categories'}];

export const clientLoader = async () => {
  if (!window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

//
//

export default function Categories() {
  const {t} = useTranslation(['common']);
  const {data, isLoading} = useQueryCategoriesList();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //
  //

  return (
    <>
      <Stack alignItems="flex-end" my={2}>
        <SkeletonOnLoading isLoading={isLoading}>
          <AppButton to="/create-category" variant="contained">
            {t('common:create')}
          </AppButton>
        </SkeletonOnLoading>
      </Stack>

      {isMobile ? (
        <CategoriesCardView data={data?.result} isLoading={isLoading} />
      ) : (
        <CategoriesTable data={data?.result} isLoading={isLoading} />
      )}
    </>
  );
}
