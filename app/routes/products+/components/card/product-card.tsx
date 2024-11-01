import React from 'react';
import {formatRelative} from 'date-fns';
import {useTranslation} from 'react-i18next';

import {Card, CardContent, CardMedia, Typography, Box, Button, Stack} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';

import {ApiProduct} from '~/api-client/types';

interface ProductCardProps {
  product: ApiProduct;
  doDeleteItem: (item: ApiProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, doDeleteItem}) => {
  const {t} = useTranslation();
  console.log(formatRelative(new Date(product.createdAt), new Date()) || '---');

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{backgroundColor: 'gray'}}
        height="160"
        image={product.image || ''}
        alt={product.title.en || product.title.ar}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="div">
            {product.title.en || product.title.ar}
          </Typography>
          <Typography variant="h6">
            ${product.priceSale || product.price}
            {product.priceSale && (
              <Typography variant="body2" color="error" sx={{textDecoration: 'line-through'}}>
                ${product.price}
              </Typography>
            )}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="textSecondary">
            Created at:
          </Typography>
          <Typography variant="body2">
            {formatRelative(new Date(product.createdAt), new Date()) || '---'}
          </Typography>
        </Box>
        {product.updatedAt && (
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="textSecondary">
              Updated at:
            </Typography>
            <Typography variant="body2">
              {formatRelative(new Date(product.updatedAt), new Date()) || '---'}
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="textSecondary">
            Status:
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={product.isActive ? 'success' : 'error'}
          >
            {product.isActive ? t('common:active') : t('common:inactive')}
          </Typography>
        </Box>
      </CardContent>
      <Stack direction="row" justifyContent="space-between" p={2} pt={1}>
        <Button variant="contained" href={`/products/${product.productId}`}>
          Edit
        </Button>
        <Button variant="text" onClick={() => doDeleteItem(product)}>
          <DeleteOutline />
        </Button>
      </Stack>
    </Card>
  );
};
