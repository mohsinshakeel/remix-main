import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {Grid} from '@mui/material';

import {useMutationCategoriesDelete} from '~/services/categories';

import {TableRowEmpty} from '~/global/components/table-row-empty';

import {ApiCategory} from '~/api-client/types';

import {CategoryCard} from './category-card';
import {CategoryCardSkeleton} from './category-card-skeleton';

export const CategoriesCardView = ({
  data,
  isLoading,
}: {
  data?: ApiCategory[];
  isLoading: boolean;
}) => {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const deleteItem = useMutationCategoriesDelete();

  const doDeleteItem = (item: ApiCategory) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.categoryId},
      {
        onSuccess: async result => {
          result?.meta?.message && enqueueSnackbar(result?.meta?.message, {variant: 'success'});
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error', {variant: 'error'});
        },
      },
    );
  };

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        Array.from({length: 6}).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CategoryCardSkeleton />
          </Grid>
        ))
      ) : !data?.length ? (
        <TableRowEmpty actionURL="/create-category" colSpan={4} />
      ) : (
        data.map(category => (
          <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
            <CategoryCard category={category} onDelete={doDeleteItem} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
