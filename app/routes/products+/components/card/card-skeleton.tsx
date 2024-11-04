import React from 'react';

import {Card, CardContent, Skeleton, Box, Stack} from '@mui/material';

export const ProductCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton variant="rectangular" width="100%" height={160} />
    <CardContent>
      <Skeleton variant="text" width="60%" height={24} />
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="30%" height={20} />
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="20%" height={20} />
      </Box>
      <Skeleton variant="text" width="50%" height={16} />
      <Skeleton variant="text" width="50%" height={16} />
    </CardContent>
    <Stack direction="row" justifyContent="space-between" p={2}>
      <Skeleton variant="rectangular" width="40%" height={36} />
      <Skeleton variant="rectangular" width="20%" height={36} />
    </Stack>
  </Card>
);
