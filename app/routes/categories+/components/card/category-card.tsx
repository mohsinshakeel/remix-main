import React from 'react';
import {formatRelative} from 'date-fns';
import {useTranslation} from 'react-i18next';

import {Card, CardContent, Typography, Box, Button} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';

import {AppButton} from '~/global/components/app-button';

import {ApiCategory} from '~/api-client/types';

interface CategoryCardProps {
  category: ApiCategory;
  onDelete: (item: ApiCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({category, onDelete}) => {
  const {t} = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {category.title.en || category.title.ar}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="textSecondary">
            ID:
          </Typography>
          <Typography variant="body2">{category.categoryId}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="textSecondary">
            Created:
          </Typography>
          <Typography variant="body2">
            {formatRelative(new Date(category.createdAt), new Date()) || '---'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={category.isActive ? 'success' : 'error'}
          >
            {category.isActive ? t('common:active') : t('common:inactive')}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <AppButton to={`/categories/${category.categoryId}`} variant="contained">
            {t('common:edit')}
          </AppButton>
          <Button variant="text" onClick={() => onDelete(category)}>
            <DeleteOutline />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
