import AccountBalance from "../components/Admin/AccountBalance";
import { Container, Grid } from "@mui/material";
import AccountSecurity from "../components/Admin/AccountSecurity";
import PageHeader from "../components/Admin/PageHeader";
import Wallets from "../components/Admin/Wallets";
import WatchList from "../components/Admin/WatchList";
import PageTitleWrapper from "../components/PageTitleWrapper";

function DashboardCrypto() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;
