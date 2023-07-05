import { useState } from "react";

import { Container } from "@mui/material";
import { Typography, Tabs, Tab, Box } from "@mui/material";
import AdminOrder from "../../components/Admin/AdminOrderList";
import AdminOrderComplete from "../../components/Admin/AdminOrderComplete";
import AdminOrderCancel from "../../components/Admin/AdminOrderCancel";
import AdminOrderChange from "../../components/Admin/AdminOrderChange";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminOrderList = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "800px" }}>
        <Box sx={{ width: "100%", marginY: "90px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="주문내역" {...a11yProps(0)} />
              <Tab label="완료내역" {...a11yProps(1)} />
              <Tab label="교환내역" {...a11yProps(2)} />
              <Tab label="취소내역" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AdminOrder />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminOrderComplete />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdminOrderChange />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AdminOrderCancel />
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default AdminOrderList;
