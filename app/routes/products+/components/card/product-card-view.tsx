import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {Grid2, Container, Typography} from '@mui/material';

import {useMutationProductsDelete} from '~/services/products';

import {ApiProduct} from '~/api-client/types';

import {ProductCard} from './product-card';
import {ProductCardSkeleton} from './card-skeleton';

export const ProductsCardView = ({data, isLoading}: {data?: ApiProduct[]; isLoading: boolean}) => {
  const {t} = useTranslation(['common']);
  const {enqueueSnackbar} = useSnackbar();
  const deleteItem = useMutationProductsDelete();

  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.productId},
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
    <Container>
      <Grid2 container justifyContent="center" spacing={3}>
        {isLoading ? (
          Array.from({length: 6}).map((_, index) => (
            <Grid2 size={{xs: 12, md: 4, sm: 6}} key={index}>
              <ProductCardSkeleton />
            </Grid2>
          ))
        ) : !data?.length ? (
          <Typography variant="body2" marginTop={2} fontSize="0.9rem">
            No products available
          </Typography>
        ) : (
          data.map(product => (
            <Grid2 size={{xs: 12, md: 4, sm: 6}} key={product.productId}>
              <ProductCard product={product} doDeleteItem={doDeleteItem} />
            </Grid2>
          ))
        )}
      </Grid2>
    </Container>
  );
};
