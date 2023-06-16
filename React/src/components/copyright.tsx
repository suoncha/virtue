import { Typography, Link, Stack } from "@mui/material";

export function Copyright(props: any) {
    return (
      <Stack spacing={-0.5}>
        <Typography fontWeight='600' variant="caption" color="white" align="center" fontSize={{xs: '2.5vw', md: '0.8vw'}}>
          {'Copyright © '}
          <Link color="#Aa292d" href="https://www.facebook.com/ph.kayn" underline="none">Phạm Hoàng Vũ</Link>
        </Typography>
        <Typography fontWeight='600' variant="caption" color="white" align="center" fontSize={{xs: '2.5vw', md: '0.8vw'}}>
          <Link color="#Aa292d" href="https://www.facebook.com/anhvu.maihoang.5" underline="none">Mai Hoàng Anh Vũ,</Link>
          {' '}{new Date().getFullYear()}{'.'}
        </Typography>
      </Stack>    
    );
}