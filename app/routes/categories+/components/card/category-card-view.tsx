import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {Grid2, Typography} from '@mui/material';

import {useMutationCategoriesDelete} from '~/services/categories';

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
    <Grid2 container spacing={3}>
      {isLoading ? (
        Array.from({length: 6}).map((_, index) => (
          <Grid2 size={{xs: 12, md: 4, sm: 6}} key={index}>
            <CategoryCardSkeleton />
          </Grid2>
        ))
      ) : !data?.length ? (
        <Typography variant="body2" marginTop={2} fontSize="0.9rem">
          No Categories available
        </Typography>
      ) : (
        data.map(category => (
          <Grid2 size={{xs: 12, md: 4, sm: 6}} key={category.categoryId}>
            <CategoryCard category={category} onDelete={doDeleteItem} />
          </Grid2>
        ))
      )}
    </Grid2>
  );
};
